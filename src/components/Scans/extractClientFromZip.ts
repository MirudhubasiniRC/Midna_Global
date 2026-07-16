import JSZip from 'jszip';

export type ExtractedClientData = {
  name: string;
  age: string;
  phone: string;
  gender: string;
};

export type ZipExtractResult = {
  data: ExtractedClientData;
  sourceFile: string | null;
  foundAny: boolean;
};

const emptyClient: ExtractedClientData = {
  name: '',
  age: '',
  phone: '',
  gender: '',
};

const DOC_EXTENSIONS = ['.txt', '.csv', '.json', '.xml', '.docx', '.doc'];
const PREFERRED_NAME_HINTS = ['client', 'patient', 'info', 'data', 'details', 'meta', 'profile', 'subject'];

const FIELD_ALIASES: Record<keyof ExtractedClientData, string[]> = {
  name: ['name', 'fullname', 'clientname', 'patientname', 'childname'],
  age: ['age', 'years', 'clientage'],
  phone: ['phone', 'phno', 'ph', 'mobile', 'mobileno', 'contact', 'phonenumber', 'contactno'],
  gender: ['gender', 'sex'],
};

function normalizeKey(raw: string): string {
  return raw.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function normalizeGender(raw: string): string {
  const value = raw.trim().toLowerCase();
  if (!value) return '';
  if (value.startsWith('m') || value === 'boy') return 'Male';
  if (value.startsWith('f') || value === 'girl') return 'Female';
  if (value.startsWith('o')) return 'Other';
  return raw.trim();
}

function setField(target: ExtractedClientData, key: string, value: string) {
  const normalized = normalizeKey(key);
  const cleaned = value.trim();
  if (!cleaned) return;

  (Object.keys(FIELD_ALIASES) as Array<keyof ExtractedClientData>).forEach((field) => {
    if (FIELD_ALIASES[field].includes(normalized) && !target[field]) {
      target[field] = field === 'gender' ? normalizeGender(cleaned) : cleaned;
    }
  });
}

function hasAnyField(data: ExtractedClientData): boolean {
  return Boolean(data.name || data.age || data.phone || data.gender);
}

function parseKeyValueText(text: string): ExtractedClientData {
  const result = { ...emptyClient };
  const lines = text.split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    const match = trimmed.match(/^([^:=\t|]+)[:=\t|]\s*(.+)$/);
    if (match) {
      setField(result, match[1], match[2]);
      continue;
    }

    // CSV-ish: Name,Age,Phone,Gender on one row is handled separately
  }

  return result;
}

function parseCsv(text: string): ExtractedClientData {
  const result = { ...emptyClient };
  const rows = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => line.split(',').map((cell) => cell.trim().replace(/^"|"$/g, '')));

  if (rows.length === 0) return result;

  if (rows.length >= 2) {
    const headers = rows[0];
    const values = rows[1];
    headers.forEach((header, index) => {
      setField(result, header, values[index] ?? '');
    });
    return result;
  }

  // Single row with labels embedded: Name:X,Age:Y
  return parseKeyValueText(rows[0].join('\n'));
}

function parseJson(text: string): ExtractedClientData {
  const result = { ...emptyClient };
  try {
    const parsed: unknown = JSON.parse(text);
    const objects: Record<string, unknown>[] = [];

    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      objects.push(parsed as Record<string, unknown>);
    } else if (Array.isArray(parsed) && parsed[0] && typeof parsed[0] === 'object') {
      objects.push(parsed[0] as Record<string, unknown>);
    }

    for (const obj of objects) {
      Object.entries(obj).forEach(([key, value]) => {
        if (value == null) return;
        setField(result, key, String(value));
      });
    }
  } catch {
    // ignore invalid json
  }
  return result;
}

function parseXml(text: string): ExtractedClientData {
  const result = { ...emptyClient };
  const tagRegex = /<([A-Za-z0-9:_-]+)[^>]*>([^<]+)<\/\1>/g;
  let match: RegExpExecArray | null;
  while ((match = tagRegex.exec(text)) !== null) {
    setField(result, match[1], match[2]);
  }

  if (!hasAnyField(result)) {
    return parseKeyValueText(text.replace(/<[^>]+>/g, '\n'));
  }
  return result;
}

async function parseDocx(bytes: ArrayBuffer): Promise<ExtractedClientData> {
  const nested = await JSZip.loadAsync(bytes);
  const documentXml = nested.file('word/document.xml');
  if (!documentXml) return { ...emptyClient };
  const xml = await documentXml.async('string');
  const text = xml
    .replace(/<w:tab\/>/g, '\t')
    .replace(/<\/w:p>/g, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
  return parseKeyValueText(text);
}

function scoreDocPath(path: string): number {
  const lower = path.toLowerCase();
  const base = lower.split('/').pop() ?? lower;
  let score = 0;

  for (const ext of DOC_EXTENSIONS) {
    if (base.endsWith(ext)) {
      score += 10;
      break;
    }
  }

  for (const hint of PREFERRED_NAME_HINTS) {
    if (base.includes(hint)) score += 5;
  }

  // Prefer shallow files
  score -= path.split('/').length;
  return score;
}

function parseFromFileName(fileName: string): ExtractedClientData {
  const result = { ...emptyClient };
  const base = fileName.replace(/\.zip$/i, '').replace(/[_-]+/g, ' ').trim();
  if (!base) return result;

  // Pattern: Name Age Gender Phone  OR  Name_Age_Gender_Phone
  const parts = base.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    const ageIdx = parts.findIndex((p) => /^\d{1,3}$/.test(p));
    const phoneIdx = parts.findIndex((p) => /^\d{8,15}$/.test(p));
    const genderIdx = parts.findIndex((p) => /^(male|female|other|m|f|o)$/i.test(p));

    if (ageIdx >= 0) result.age = parts[ageIdx];
    if (phoneIdx >= 0) result.phone = parts[phoneIdx];
    if (genderIdx >= 0) result.gender = normalizeGender(parts[genderIdx]);

    const nameParts = parts.filter((_, i) => i !== ageIdx && i !== phoneIdx && i !== genderIdx);
    if (nameParts.length > 0) result.name = nameParts.join(' ');
  }

  return result;
}

async function parseDocContent(path: string, bytes: ArrayBuffer): Promise<ExtractedClientData> {
  const lower = path.toLowerCase();
  const text = new TextDecoder().decode(bytes);

  if (lower.endsWith('.json')) return parseJson(text);
  if (lower.endsWith('.xml')) return parseXml(text);
  if (lower.endsWith('.csv')) return parseCsv(text);
  if (lower.endsWith('.docx')) return parseDocx(bytes);
  if (lower.endsWith('.doc')) {
    // Legacy .doc is binary; best-effort extract readable strings
    const readable = text.replace(/[^\x09\x0A\x0D\x20-\x7E]/g, '\n');
    return parseKeyValueText(readable);
  }

  return parseKeyValueText(text);
}

/**
 * Reads client fields from a scan ZIP package.
 * Looks for a client/patient info document (.txt/.json/.xml/.csv/.docx),
 * then falls back to the ZIP file name.
 */
export async function extractClientFromZip(file: File): Promise<ZipExtractResult> {
  const zip = await JSZip.loadAsync(file);
  const candidates = Object.keys(zip.files)
    .filter((path) => !zip.files[path].dir)
    .filter((path) => !path.startsWith('__MACOSX/'))
    .map((path) => ({ path, score: scoreDocPath(path) }))
    .filter((entry) => entry.score >= 9)
    .sort((a, b) => b.score - a.score);

  for (const candidate of candidates) {
    const entry = zip.file(candidate.path);
    if (!entry) continue;
    const bytes = await entry.async('arraybuffer');
    const data = await parseDocContent(candidate.path, bytes);
    if (hasAnyField(data)) {
      return {
        data,
        sourceFile: candidate.path.split('/').pop() ?? candidate.path,
        foundAny: true,
      };
    }
  }

  // Any remaining text-like file as a weaker fallback
  for (const path of Object.keys(zip.files)) {
    const entry = zip.files[path];
    if (entry.dir || path.startsWith('__MACOSX/')) continue;
    if (!/\.(txt|csv|json|xml)$/i.test(path)) continue;
    const bytes = await entry.async('arraybuffer');
    const data = await parseDocContent(path, bytes);
    if (hasAnyField(data)) {
      return {
        data,
        sourceFile: path.split('/').pop() ?? path,
        foundAny: true,
      };
    }
  }

  const fromName = parseFromFileName(file.name);
  return {
    data: fromName,
    sourceFile: hasAnyField(fromName) ? file.name : null,
    foundAny: hasAnyField(fromName),
  };
}

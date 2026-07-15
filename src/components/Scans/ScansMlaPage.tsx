import { useRef, useState } from 'react';
import { colors, radius, shadow, spacing, typography } from '../../styles/theme';
import { NotificationButton } from '../Layout/NotificationButton';
import { ProfileAvatarButton } from '../Layout/ProfileAvatarButton';
import { AddClientDataModal, type ClientData } from './AddClientDataModal';
import { DeclarationModal } from './DeclarationModal';

const theme = colors.light;

type UploadRecord = {
  id: string;
  name: string;
  size: string;
  uploadedAt: string;
  status: 'Uploaded' | 'Processing' | 'Failed';
};

type ClientRecord = ClientData & {
  id: string;
  addedAt: string;
};

const seedRecords: UploadRecord[] = [
  {
    id: 'u1',
    name: 'nest-south-batch-14.zip',
    size: '12.4 MB',
    uploadedAt: '14 Jul 2026 · 10:22 AM',
    status: 'Uploaded',
  },
  {
    id: 'u2',
    name: 'mla-scans-jul-week2.zip',
    size: '8.1 MB',
    uploadedAt: '12 Jul 2026 · 04:05 PM',
    status: 'Processing',
  },
];

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatStamp(date = new Date()) {
  return date
    .toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
    .replace(',', ' ·');
}

function statusStyles(status: UploadRecord['status']) {
  if (status === 'Uploaded') return { color: theme.success, background: theme['success-bg'] };
  if (status === 'Processing') return { color: theme.warning, background: theme['warning-bg'] };
  return { color: theme.error, background: theme['error-bg'] };
}

type ScansMlaPageProps = {
  onOpenMobileMenu?: () => void;
  onOpenProfile?: () => void;
};

export function ScansMlaPage({ onOpenMobileMenu, onOpenProfile }: ScansMlaPageProps) {
  const [file, setFile] = useState<File | null>(null);
  const [declared, setDeclared] = useState(false);
  const [records, setRecords] = useState<UploadRecord[]>(seedRecords);
  const [clients, setClients] = useState<ClientRecord[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [declarationOpen, setDeclarationOpen] = useState(false);
  const [clientModalOpen, setClientModalOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const canSubmit = Boolean(file) && declared;

  const pickFile = (next: File | null) => {
    setError(null);
    if (!next) {
      setFile(null);
      return;
    }
    const isZip =
      next.name.toLowerCase().endsWith('.zip') ||
      next.type === 'application/zip' ||
      next.type === 'application/x-zip-compressed';
    if (!isZip) {
      setFile(null);
      setError('Only .zip files are allowed.');
      return;
    }
    setFile(next);
  };

  const clearFile = () => {
    setFile(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleSubmit = () => {
    if (!file || !declared) return;
    setRecords((prev) => [
      {
        id: `u-${Date.now()}`,
        name: file.name,
        size: formatBytes(file.size),
        uploadedAt: formatStamp(),
        status: 'Uploaded',
      },
      ...prev,
    ]);
    clearFile();
    setDeclared(false);
  };

  const handleClientSubmit = (data: ClientData) => {
    setClients((prev) => [
      {
        id: `c-${Date.now()}`,
        ...data,
        addedAt: formatStamp(),
      },
      ...prev,
    ]);
  };

  return (
    <section className="page-section">
      <div className="page-header">
        <div className="page-title-block" style={{ minWidth: 0, flex: 1 }}>
          <h1
            className="page-title"
            style={{
              margin: 0,
              fontSize: typography.roles.pageTitle.fontSize,
              lineHeight: typography.roles.pageTitle.lineHeight,
              fontWeight: typography.roles.pageTitle.fontWeight,
              letterSpacing: typography.roles.pageTitle.letterSpacing,
              color: theme['text-primary'],
            }}
          >
            My Scans (MLA)
          </h1>
          <p className="page-subtitle" style={{ margin: '8px 0 0', fontSize: 14, color: theme['text-secondary'] }}>
            Upload scan packages and keep client records up to date.
          </p>
        </div>

        <div className="page-header-actions">
          <button type="button" className="btn-icon mobile-menu-btn" aria-label="Open menu" onClick={onOpenMobileMenu}>
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
          <NotificationButton />
          <ProfileAvatarButton onClick={onOpenProfile} />
        </div>
      </div>

      <div className="dash-card" style={{ marginBottom: spacing[5], width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing[4], gap: 12 }}>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 650, letterSpacing: '-0.01em', color: theme['text-primary'] }}>
            Clients
          </h2>
          <span style={{ fontSize: 12, color: theme['text-muted'] }}>{clients.length}</span>
        </div>

        {clients.length === 0 ? (
          <div
            className="scans-clients-empty"
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 16,
              flexWrap: 'wrap',
              padding: '16px 18px',
              borderRadius: radius.md,
              background: theme['bg-muted'],
            }}
          >
            <div style={{ minWidth: 0 }}>
              <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: theme['text-primary'] }}>No clients yet</p>
              <p style={{ margin: '4px 0 0', fontSize: 13, color: theme['text-muted'] }}>
                Capture name, age, phone, and gender for each client.
              </p>
            </div>
            <button
              type="button"
              className="btn-pill-primary"
              onClick={() => setClientModalOpen(true)}
              style={{ height: 36, padding: '0 16px', fontSize: 13, flexShrink: 0 }}
            >
              Add Client
            </button>
          </div>
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 12,
              overflowX: 'auto',
              paddingBottom: 4,
            }}
          >
            {clients.map((client) => (
              <div
                key={client.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '14px 16px',
                  borderRadius: radius.md,
                  background: theme['bg-muted'],
                  minWidth: 260,
                  flex: '1 1 260px',
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: theme['primary-soft'],
                    color: theme.primary,
                    display: 'grid',
                    placeItems: 'center',
                    flexShrink: 0,
                    fontWeight: 700,
                    fontSize: 13,
                    boxShadow: shadow.float,
                  }}
                >
                  {client.name.slice(0, 1).toUpperCase()}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: theme['text-primary'],
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {client.name}
                  </div>
                  <div style={{ fontSize: 12, color: theme['text-muted'], marginTop: 2 }}>
                    {client.age} yrs · {client.gender} · {client.phone}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="dash-card" style={{ marginBottom: spacing[5] }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: 12,
            marginBottom: spacing[5],
          }}
        >
          <div>
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 650, letterSpacing: '-0.01em', color: theme['text-primary'] }}>
              Upload scans
            </h2>
            <p style={{ margin: '4px 0 0', fontSize: 13, color: theme['text-secondary'] }}>
              Click the area below to choose a zip package.
            </p>
          </div>
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              color: theme.primary,
              background: theme['primary-soft'],
              borderRadius: radius.pill,
              padding: '6px 12px',
              flexShrink: 0,
            }}
          >
            Zip only
          </span>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept=".zip,application/zip,application/x-zip-compressed"
          style={{ display: 'none' }}
          onChange={(e) => pickFile(e.target.files?.[0] ?? null)}
        />

        <button
          type="button"
          className="scans-dropzone"
          onClick={() => inputRef.current?.click()}
          style={{
            width: '100%',
            border: `1.5px dashed ${file ? theme.primary : theme.border}`,
            borderRadius: radius.lg,
            padding: '36px 24px',
            background: file ? theme['primary-soft'] : theme['bg-muted'],
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
            fontFamily: 'inherit',
            transition: 'background 0.15s ease, border-color 0.15s ease',
          }}
        >
          <span
            style={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              background: theme['bg-surface'],
              color: theme.primary,
              display: 'grid',
              placeItems: 'center',
              boxShadow: shadow.float,
              marginBottom: 4,
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 16V4" />
              <path d="m6 10 6-6 6 6" />
              <path d="M4 20h16" />
            </svg>
          </span>
          <span style={{ fontSize: 15, fontWeight: 650, color: theme['text-primary'] }}>
            {file ? file.name : 'Click to upload zip file'}
          </span>
          <span style={{ fontSize: 13, color: theme['text-muted'] }}>
            {file ? formatBytes(file.size) : 'Fingerprint scan packages · .zip only'}
          </span>
          {file && (
            <span
              role="button"
              tabIndex={0}
              onClick={(e) => {
                e.stopPropagation();
                clearFile();
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  e.stopPropagation();
                  clearFile();
                }
              }}
              style={{
                marginTop: 6,
                fontSize: 12,
                fontWeight: 600,
                color: theme.error,
                textDecoration: 'underline',
              }}
            >
              Remove file
            </span>
          )}
        </button>

        {error && (
          <p style={{ margin: `${spacing[3]} 0 0`, fontSize: 13, color: theme.error, fontWeight: 500 }}>{error}</p>
        )}

        <div
          className="scans-upload-footer"
          style={{
            marginTop: spacing[5],
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: spacing[4],
            flexWrap: 'wrap',
            paddingTop: spacing[4],
            borderTop: `1px solid ${theme.divider}`,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, minWidth: 0, flex: 1 }}>
            <input
              id="scan-declaration"
              type="checkbox"
              checked={declared}
              onChange={(e) => setDeclared(e.target.checked)}
              style={{
                width: 18,
                height: 18,
                marginTop: 2,
                accentColor: theme.primary,
                flexShrink: 0,
                cursor: 'pointer',
              }}
            />
            <label htmlFor="scan-declaration" style={{ fontSize: 14, color: theme['text-secondary'], lineHeight: 1.45, cursor: 'pointer' }}>
              I agree to the{' '}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setDeclarationOpen(true);
                }}
                style={{
                  border: 'none',
                  background: 'none',
                  padding: 0,
                  margin: 0,
                  font: 'inherit',
                  fontWeight: 650,
                  color: theme.primary,
                  textDecoration: 'underline',
                  cursor: 'pointer',
                }}
              >
                Declaration
              </button>
            </label>
          </div>

          <button
            type="button"
            className="btn-pill-primary"
            disabled={!canSubmit}
            onClick={handleSubmit}
            style={{
              opacity: canSubmit ? 1 : 0.4,
              cursor: canSubmit ? 'pointer' : 'not-allowed',
              height: 42,
              padding: '0 22px',
              flexShrink: 0,
            }}
          >
            Submit upload
          </button>
        </div>
      </div>

      <div className="dash-card" style={{ width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing[4], gap: 12 }}>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 650, letterSpacing: '-0.01em', color: theme['text-primary'] }}>
            Uploaded documents
          </h2>
          <span style={{ fontSize: 12, color: theme['text-muted'] }}>{records.length}</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {records.map((row) => {
            const chip = statusStyles(row.status);
            return (
              <div
                key={row.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '12px 14px',
                  borderRadius: radius.md,
                  background: theme['bg-muted'],
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: theme['primary-soft'],
                    color: theme.primary,
                    display: 'grid',
                    placeItems: 'center',
                    flexShrink: 0,
                    boxShadow: shadow.float,
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
                    <path d="M14 2v6h6" />
                  </svg>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: theme['text-primary'],
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {row.name}
                  </div>
                  <div style={{ fontSize: 12, color: theme['text-muted'], marginTop: 2 }}>
                    {row.size} · {row.uploadedAt}
                  </div>
                </div>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    borderRadius: radius.pill,
                    padding: '5px 10px',
                    whiteSpace: 'nowrap',
                    ...chip,
                  }}
                >
                  {row.status}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <DeclarationModal
        open={declarationOpen}
        onClose={() => setDeclarationOpen(false)}
        onAccept={() => setDeclared(true)}
      />
      <AddClientDataModal
        open={clientModalOpen}
        onClose={() => setClientModalOpen(false)}
        onSubmit={handleClientSubmit}
      />
    </section>
  );
}

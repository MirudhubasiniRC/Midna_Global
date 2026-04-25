import { useMemo, useState } from 'react';
import { colors, spacing, radius, typography } from '../../styles/theme';
import TopBar from '../Layout/TopBar';
import Pagination from '../ui/Pagination';
import TablePaginationFooter from '../ui/TablePaginationFooter';

const theme = colors.light;

type ResourceCategoryId =
  | 'documents'
  | 'presentations'
  | 'audioBytes'
  | 'artwork'
  | 'compressed'
  | 'reference';

const FILTER_CHIPS: { id: 'all' | ResourceCategoryId; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'documents', label: 'Documents' },
  { id: 'presentations', label: 'Presentations' },
  { id: 'audioBytes', label: 'Audio bytes' },
  { id: 'artwork', label: 'Artwork' },
  { id: 'compressed', label: 'Compressed files' },
  { id: 'reference', label: 'Reference links' },
];

const CATEGORY_LABEL: Record<ResourceCategoryId, string> = {
  documents: 'Documents',
  presentations: 'Presentations',
  audioBytes: 'Audio bytes',
  artwork: 'Artwork',
  compressed: 'Compressed files',
  reference: 'Reference links',
};

const thStyle = {
  padding: `${spacing[1]} ${spacing[2]}`,
  height: '40px',
  background: theme['table-header-muted-secondary'],
  color: theme['text-primary'],
  fontSize: typography.sizes.xs.fontSize,
  fontWeight: 600,
  borderBottom: `1px solid ${theme['table-border']}`,
  fontFamily: typography.fonts.sans.family,
  whiteSpace: 'nowrap' as const,
} as const;

const tdStyle = {
  padding: `${spacing[1]} ${spacing[2]}`,
  color: theme['text-primary'],
  fontSize: typography.sizes.xs.fontSize,
  fontWeight: 400,
  borderBottom: `1px solid ${theme['table-border']}`,
  fontFamily: typography.fonts.sans.family,
} as const;

type ResourceRow = { sno: number; name: string; category: ResourceCategoryId };

const RESOURCES: ResourceRow[] = [
  { sno: 1, name: 'GBPB Plus - Sample Report', category: 'documents' },
  { sno: 2, name: 'Consent Form', category: 'documents' },
  { sno: 3, name: 'Fingerprint Scanning', category: 'documents' },
  { sno: 4, name: 'Data Privacy & Security', category: 'documents' },
  { sno: 5, name: 'Report Interpretation Guide', category: 'documents' },
  { sno: 6, name: 'Client Intake Checklist', category: 'documents' },
  { sno: 7, name: 'SRA Onboarding', category: 'documents' },
  { sno: 8, name: 'Scan Upload Instructions', category: 'documents' },
  { sno: 9, name: 'Midna platform overview (deck)', category: 'presentations' },
  { sno: 10, name: 'QBR summary slides', category: 'presentations' },
  { sno: 11, name: 'Welcome to GBP — audio intro', category: 'audioBytes' },
  { sno: 12, name: 'Process workflow diagram (PNG)', category: 'artwork' },
  { sno: 13, name: 'Branding & logo pack', category: 'artwork' },
  { sno: 14, name: 'Full installer package (.zip)', category: 'compressed' },
  { sno: 15, name: 'Legacy reader bundle', category: 'compressed' },
  { sno: 16, name: 'NCBI & external references', category: 'reference' },
  { sno: 17, name: 'Hardware vendor documentation', category: 'reference' },
  { sno: 18, name: 'SLA - Service Terms', category: 'documents' },
  { sno: 19, name: 'Refund Policy', category: 'documents' },
  { sno: 20, name: 'Partner Code of Conduct', category: 'documents' },
];

const actionPill = (label: string) => (
  <button
    className="resources-action-pill"
    type="button"
    style={{
      display: 'inline-block',
      padding: `${spacing[1]} ${spacing[3]}`,
      border: `1px solid ${theme.info}`,
      background: theme['info-bg'],
      color: theme.info,
      borderRadius: radius.pill,
      fontSize: typography.sizes.xs.fontSize,
      fontFamily: typography.fonts.sans.family,
      fontWeight: 500,
      cursor: 'pointer',
    }}
  >
    {label}
  </button>
);

export default function ResourcesPage() {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | ResourceCategoryId>('all');
  const [pageSize, setPageSize] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useMemo(() => {
    let list = RESOURCES;
    if (categoryFilter !== 'all') {
      list = list.filter((r) => r.category === categoryFilter);
    }
    const q = search.trim().toLowerCase();
    if (!q) return list;
    return list.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        CATEGORY_LABEL[r.category].toLowerCase().includes(q)
    );
  }, [search, categoryFilter]);

  const totalEntries = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalEntries / pageSize) || 1);
  const safePage = Math.min(currentPage, totalPages);
  const from = totalEntries === 0 ? 0 : (safePage - 1) * pageSize + 1;
  const to = Math.min(safePage * pageSize, totalEntries);
  const pageData = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: theme['bg-base'],
        fontFamily: typography.fonts.sans.family,
        fontSize: typography.sizes.base.fontSize,
        color: theme['text-primary'],
      }}
    >
      <TopBar />
      <main style={{ padding: spacing[6] }}>
        <div
          style={{
            background: theme['bg-surface'],
            borderRadius: radius.lg,
            border: `1px solid ${theme.border}`,
            padding: spacing[5],
            overflow: 'hidden',
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: typography.sizes.xl.fontSize,
              fontWeight: typography.fonts.heading.fontWeight,
              fontFamily: typography.fonts.heading.family,
              color: theme['text-primary'],
              marginBottom: spacing[2],
            }}
          >
            GBP resources
          </h1>
          <p
            style={{
              margin: `0 0 ${spacing[4]} 0`,
              fontSize: typography.sizes.sm.fontSize,
              color: theme['text-secondary'],
              lineHeight: 1.5,
            }}
          >
            Documents, guides, and reference materials
          </p>

          <div
            role="group"
            aria-label="Filter by type"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: spacing[2],
              marginBottom: spacing[4],
            }}
          >
            {FILTER_CHIPS.map((chip) => {
              const isOn = chip.id === 'all' ? categoryFilter === 'all' : categoryFilter === chip.id;
              return (
                <button
                  className="resources-filter-chip"
                  key={chip.id}
                  type="button"
                  onClick={() => {
                    setCategoryFilter(chip.id);
                    setCurrentPage(1);
                  }}
                  style={{
                    padding: `${spacing[2]} ${spacing[3]}`,
                    borderRadius: radius.pill,
                    fontSize: typography.sizes.sm.fontSize,
                    fontWeight: 500,
                    fontFamily: typography.fonts.sans.family,
                    letterSpacing: '0.01em',
                    border: `1px solid ${isOn ? theme.primary : theme.border}`,
                    background: isOn ? theme.primary : theme['bg-surface'],
                    color: isOn ? theme['text-inverse'] : theme['text-secondary'],
                    cursor: 'pointer',
                    lineHeight: 1.2,
                    transition: 'background 0.15s ease, color 0.15s ease, border-color 0.15s ease',
                  }}
                >
                  {chip.label}
                </button>
              );
            })}
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: spacing[4],
              marginBottom: spacing[4],
            }}
          >
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: spacing[2],
                fontSize: typography.sizes.sm.fontSize,
                fontFamily: typography.fonts.sans.family,
                color: theme['text-secondary'],
                flex: '1 1 200px',
                minWidth: 0,
              }}
            >
              Search:
              <input
                type="search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search..."
                style={{
                  flex: 1,
                  maxWidth: 360,
                  minWidth: 160,
                  padding: `${spacing[2]} ${spacing[3]}`,
                  borderRadius: radius.sm,
                  border: `1px solid ${theme.border}`,
                  fontSize: typography.sizes.sm.fontSize,
                  fontFamily: typography.fonts.sans.family,
                  color: theme['text-primary'],
                  background: theme['bg-surface'],
                  outlineColor: theme['focus-ring'],
                }}
              />
            </label>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: spacing[2],
                flexShrink: 0,
                marginLeft: 'auto',
              }}
            >
              <span
                style={{
                  fontSize: typography.sizes.sm.fontSize,
                  color: theme['text-secondary'],
                }}
              >
                Show
              </span>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }}
                style={{
                  padding: `${spacing[1]} ${spacing[2]}`,
                  borderRadius: radius.sm,
                  border: `1px solid ${theme.border}`,
                  fontSize: typography.sizes.sm.fontSize,
                  fontFamily: typography.fonts.sans.family,
                  color: theme['text-primary'],
                  background: theme['bg-surface'],
                  outlineColor: theme['focus-ring'],
                }}
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
              <span style={{ fontSize: typography.sizes.sm.fontSize, color: theme['text-secondary'] }}>
                records per page
              </span>
            </div>
          </div>

          <style>{`
            .resources-table-body tr:nth-child(even) { background: ${theme['table-zebra']}; }
            .resources-table-body tr:hover { background: ${theme['table-row-hover']}; }
            .resources-filter-chip:focus-visible,
            .resources-action-pill:focus-visible {
              outline: 2px solid ${theme['focus-ring']};
              outline-offset: 2px;
            }
          `}</style>
          <div style={{ overflowX: 'auto', borderRadius: radius.sm, border: `1px solid ${theme.border}` }}>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontFamily: typography.fonts.sans.family,
              }}
            >
              <thead>
                <tr>
                  <th style={{ ...thStyle, textAlign: 'center', width: 56 }}>Sno</th>
                  <th style={{ ...thStyle, textAlign: 'left' }}>Name</th>
                  <th style={{ ...thStyle, textAlign: 'left' }}>Category</th>
                  <th style={{ ...thStyle, textAlign: 'center' }}>File</th>
                </tr>
              </thead>
              <tbody className="resources-table-body">
                {pageData.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      style={{
                        ...tdStyle,
                        textAlign: 'center',
                        padding: spacing[8],
                        color: theme['text-muted'],
                      }}
                    >
                      No resources match your filters
                    </td>
                  </tr>
                ) : (
                  pageData.map((row) => (
                    <tr key={row.sno} style={{ height: 40 }}>
                      <td style={{ ...tdStyle, textAlign: 'center' }}>{row.sno}</td>
                      <td style={{ ...tdStyle, whiteSpace: 'normal', maxWidth: 420 }}>{row.name}</td>
                      <td style={tdStyle}>{CATEGORY_LABEL[row.category]}</td>
                      <td style={{ ...tdStyle, textAlign: 'center' }}>{actionPill('View')}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <TablePaginationFooter
            summary={
              totalEntries === 0
                ? 'Showing 0 to 0 of 0 entries'
                : `Showing ${from} to ${to} of ${totalEntries} entries`
            }
            pagination={
              <Pagination
                currentPage={safePage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            }
          />
        </div>
      </main>
    </div>
  );
}

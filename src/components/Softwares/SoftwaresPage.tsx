import { useMemo, useState } from 'react';
import { colors, spacing, radius, typography } from '../../styles/theme';
import TopBar from '../Layout/TopBar';
import Pagination from '../ui/Pagination';
import TablePaginationFooter from '../ui/TablePaginationFooter';

const theme = colors.light;

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

const SOFTWARE: { sno: number; name: string }[] = [
  { sno: 1, name: 'MiDNAcq' },
  { sno: 2, name: 'Remote Installation SW' },
  { sno: 3, name: 'FS80H Demo S/W' },
];

const downloadPill = (
  <button
    className="softwares-action-pill"
    type="button"
    style={{
      display: 'inline-block',
      padding: `${spacing[1]} ${spacing[3]}`,
      border: `1px solid ${theme.primary}`,
      background: theme['primary-soft'],
      color: theme.primary,
      borderRadius: radius.pill,
      fontSize: typography.sizes.xs.fontSize,
      fontFamily: typography.fonts.sans.family,
      fontWeight: 500,
      cursor: 'pointer',
    }}
  >
    Download
  </button>
);

export default function SoftwaresPage() {
  const [search, setSearch] = useState('');
  const [pageSize, setPageSize] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return SOFTWARE;
    return SOFTWARE.filter((r) => r.name.toLowerCase().includes(q));
  }, [search]);

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
              marginBottom: spacing[4],
            }}
          >
            GBP softwares
          </h1>
          <p
            style={{
              margin: `0 0 ${spacing[4]} 0`,
              fontSize: typography.sizes.sm.fontSize,
              color: theme['text-secondary'],
              lineHeight: 1.5,
            }}
          >
            Installers and utility downloads
          </p>

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
              <span style={{ fontSize: typography.sizes.sm.fontSize, color: theme['text-secondary'] }}>
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
            .softwares-table-body tr:nth-child(even) { background: ${theme['table-zebra']}; }
            .softwares-table-body tr:hover { background: ${theme['table-row-hover']}; }
            .softwares-action-pill:focus-visible {
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
                  <th style={{ ...thStyle, textAlign: 'center' }}>File</th>
                </tr>
              </thead>
              <tbody className="softwares-table-body">
                {pageData.length === 0 ? (
                  <tr>
                    <td
                      colSpan={3}
                      style={{
                        ...tdStyle,
                        textAlign: 'center',
                        padding: spacing[8],
                        color: theme['text-muted'],
                      }}
                    >
                      No software matches your search
                    </td>
                  </tr>
                ) : (
                  pageData.map((row) => (
                    <tr key={row.sno} style={{ height: 40 }}>
                      <td style={{ ...tdStyle, textAlign: 'center' }}>{row.sno}</td>
                      <td style={{ ...tdStyle, whiteSpace: 'normal', maxWidth: 480 }}>{row.name}</td>
                      <td style={{ ...tdStyle, textAlign: 'center' }}>{downloadPill}</td>
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

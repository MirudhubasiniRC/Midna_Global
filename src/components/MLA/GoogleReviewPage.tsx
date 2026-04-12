import { useEffect, useMemo, useState } from 'react';
import {
  colors,
  spacing,
  radius,
  typography,
  inputTokens,
  buttonTokens,
} from '../../styles/theme';
import Pagination from '../ui/Pagination';
import TablePaginationFooter from '../ui/TablePaginationFooter';

const theme = colors.light;

type GoogleReviewRow = {
  sno: number;
  mobileType: string;
  links: string;
  uploadDate: string;
};

const GOOGLE_REVIEWS: GoogleReviewRow[] = [];

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

export default function GoogleReviewPage() {
  const [pageSize, setPageSize] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return GOOGLE_REVIEWS;
    return GOOGLE_REVIEWS.filter(
      (r) =>
        String(r.sno).includes(q) ||
        r.mobileType.toLowerCase().includes(q) ||
        r.links.toLowerCase().includes(q) ||
        r.uploadDate.toLowerCase().includes(q)
    );
  }, [search]);

  const totalEntries = filtered.length;
  const totalPages =
    totalEntries === 0 ? 0 : Math.max(1, Math.ceil(totalEntries / pageSize));

  useEffect(() => {
    if (totalPages === 0) return;
    setCurrentPage((p) => Math.min(p, totalPages));
  }, [totalPages]);

  const safePage = totalPages === 0 ? 1 : Math.min(currentPage, totalPages);
  const from = totalEntries === 0 ? 0 : (safePage - 1) * pageSize + 1;
  const to = Math.min(safePage * pageSize, totalEntries);
  const pageRows = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

  const emptyBodyMessage =
    search.trim() && totalEntries === 0
      ? 'No records match your search.'
      : 'No data available in table';

  return (
    <div
      style={{
        background: theme['bg-surface'],
        borderRadius: radius.lg,
        overflow: 'hidden',
        border: `1px solid ${theme.border}`,
        padding: spacing[5],
      }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: spacing[4],
          marginBottom: spacing[4],
        }}
      >
        <div>
          <h2
            style={{
              margin: 0,
              fontSize: typography.sizes.xl.fontSize,
              fontWeight: typography.fonts.heading.fontWeight,
              fontFamily: typography.fonts.heading.family,
              color: theme['text-primary'],
            }}
          >
            My Google Review
          </h2>
          <p
            style={{
              margin: `${spacing[2]} 0 0`,
              fontSize: typography.sizes.sm.fontSize,
              color: theme['text-secondary'],
              fontFamily: typography.fonts.sans.family,
              lineHeight: 1.5,
            }}
          >
            Add and manage Google review links
          </p>
        </div>
        <button
          type="button"
          style={{
            height: buttonTokens.height.sm,
            padding: buttonTokens.padding.sm,
            borderRadius: radius.sm,
            border: 'none',
            background: theme.warning,
            color: theme['text-inverse'],
            fontSize: typography.sizes.sm.fontSize,
            fontWeight: 600,
            fontFamily: typography.fonts.sans.family,
            cursor: 'pointer',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
          }}
        >
          Add
        </button>
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
              padding: `${spacing[2]} ${spacing[3]}`,
              borderRadius: radius.sm,
              border: `1px solid ${theme.border}`,
              fontSize: typography.sizes.sm.fontSize,
              fontFamily: typography.fonts.sans.family,
              color: theme['text-primary'],
              minWidth: 160,
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
              fontFamily: typography.fonts.sans.family,
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
              height: inputTokens.height.sm,
            }}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
          <span
            style={{
              fontSize: typography.sizes.sm.fontSize,
              color: theme['text-secondary'],
              fontFamily: typography.fonts.sans.family,
            }}
          >
            records per page
          </span>
        </div>
      </div>

      <style>{`
        .ledger-table-body tr:nth-child(even) { background: ${theme['table-zebra']}; }
        .ledger-table-body tr:hover { background: ${theme['table-row-hover']}; }
      `}</style>
      <div
        style={{
          border: `1px solid ${theme.border}`,
          borderRadius: radius.sm,
          overflow: 'hidden',
        }}
      >
        <div style={{ overflowX: 'auto' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontFamily: typography.fonts.sans.family,
              minWidth: 640,
            }}
          >
            <thead>
              <tr>
                <th style={{ ...thStyle, textAlign: 'center', width: 72 }}>Sno</th>
                <th style={{ ...thStyle, textAlign: 'left', minWidth: 140 }}>
                  Mobile / Type
                </th>
                <th style={{ ...thStyle, textAlign: 'left', minWidth: 200 }}>Links</th>
                <th style={{ ...thStyle, textAlign: 'left', width: 120 }}>Upload Date</th>
                <th style={{ ...thStyle, textAlign: 'center', width: 140 }}>Options</th>
              </tr>
            </thead>
            <tbody className="ledger-table-body">
              {pageRows.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    style={{
                      ...tdStyle,
                      textAlign: 'center',
                      padding: spacing[8],
                      color: theme['text-secondary'],
                      fontSize: typography.sizes.sm.fontSize,
                    }}
                  >
                    {emptyBodyMessage}
                  </td>
                </tr>
              ) : (
                pageRows.map((row) => (
                  <tr key={row.sno} style={{ height: '40px' }}>
                    <td style={{ ...tdStyle, textAlign: 'center' }}>{row.sno}</td>
                    <td style={tdStyle}>{row.mobileType}</td>
                    <td
                      style={{
                        ...tdStyle,
                        whiteSpace: 'normal',
                        wordBreak: 'break-all',
                        maxWidth: 360,
                      }}
                    >
                      {row.links}
                    </td>
                    <td style={{ ...tdStyle, whiteSpace: 'nowrap' }}>{row.uploadDate}</td>
                    <td style={{ ...tdStyle, textAlign: 'center' }}>
                      <span
                        style={{
                          display: 'inline-flex',
                          gap: spacing[2],
                          justifyContent: 'center',
                          flexWrap: 'wrap',
                        }}
                      >
                        <button
                          type="button"
                          style={{
                            padding: `${spacing[1]} ${spacing[2]}`,
                            borderRadius: radius.sm,
                            border: `1px solid ${theme.primary}`,
                            background: theme['bg-surface'],
                            color: theme.primary,
                            fontSize: typography.sizes['2xs'].fontSize,
                            fontWeight: 600,
                            cursor: 'pointer',
                          }}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          style={{
                            padding: `${spacing[1]} ${spacing[2]}`,
                            borderRadius: radius.sm,
                            border: `1px solid ${theme.secondary}`,
                            background: theme.secondary,
                            color: theme['btn-secondary-text'],
                            fontSize: typography.sizes['2xs'].fontSize,
                            fontWeight: 600,
                            cursor: 'pointer',
                          }}
                        >
                          Delete
                        </button>
                      </span>
                    </td>
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
            totalEntries > 0 && totalPages > 0 ? (
              <Pagination
                currentPage={safePage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            ) : undefined
          }
        />
      </div>
    </div>
  );
}

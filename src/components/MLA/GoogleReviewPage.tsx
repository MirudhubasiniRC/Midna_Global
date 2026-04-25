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

const GOOGLE_REVIEW_ROWS: GoogleReviewRow[] = [
  {
    sno: 1,
    mobileType: '9845885305 - Google',
    links: 'https://share.google/vSHlznyiyWLXusRxr',
    uploadDate: '19-1-2026',
  },
  {
    sno: 2,
    mobileType: '9845885305 - Google',
    links: 'https://share.google/BXuwgySwTZwPQ5QZO',
    uploadDate: '19-1-2026',
  },
  {
    sno: 3,
    mobileType: '9845885305 - Google',
    links: 'https://share.google/AuEhyKQUOSX5iEnhx',
    uploadDate: '19-1-2026',
  },
  {
    sno: 4,
    mobileType: '9845885305 - Google',
    links: 'https://share.google/wjX1IClsPMsclTgYu',
    uploadDate: '13-1-2026',
  },
  {
    sno: 5,
    mobileType: '9600799889 - Google',
    links: 'https://share.google/gLyl96tvmRF1UZ5J6',
    uploadDate: '12-1-2026',
  },
];

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
  const [addOpen, setAddOpen] = useState(false);
  const [googleLink, setGoogleLink] = useState('');
  const [pendingDelete, setPendingDelete] = useState<GoogleReviewRow | null>(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return GOOGLE_REVIEW_ROWS;
    return GOOGLE_REVIEW_ROWS.filter(
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
      <div style={{ marginBottom: spacing[4] }}>
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
      {addOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="add-google-review-title"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: spacing[4],
            background: 'rgba(17, 24, 39, 0.45)',
          }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setAddOpen(false);
          }}
        >
          <div
            onMouseDown={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: 920,
              background: theme['bg-surface'],
              borderRadius: radius.lg,
              border: `1px solid ${theme.border}`,
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: spacing[4],
                borderBottom: `1px solid ${theme.border}`,
              }}
            >
              <h3
                id="add-google-review-title"
                style={{
                  margin: 0,
                  fontSize: typography.sizes.lg.fontSize,
                  fontWeight: typography.fonts.heading.fontWeight,
                  fontFamily: typography.fonts.heading.family,
                  color: theme['text-primary'],
                }}
              >
                Add Google Review Link
              </h3>
              <button
                type="button"
                onClick={() => setAddOpen(false)}
                aria-label="Close add review modal"
                style={{
                  border: 'none',
                  background: 'transparent',
                  color: theme['text-muted'],
                  fontSize: typography.sizes.lg.fontSize,
                  cursor: 'pointer',
                }}
              >
                X
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!googleLink.trim()) return;
                setAddOpen(false);
                setGoogleLink('');
              }}
              style={{ padding: spacing[5] }}
            >
              <label
                style={{
                  display: 'grid',
                  gap: spacing[2],
                  fontSize: typography.sizes.sm.fontSize,
                  color: theme['text-primary'],
                  fontFamily: typography.fonts.sans.family,
                }}
              >
                Google Link
                <input
                  type="url"
                  value={googleLink}
                  onChange={(e) => setGoogleLink(e.target.value)}
                  placeholder="https://..."
                  required
                  style={{
                    height: inputTokens.height.sm,
                    padding: `${spacing[1]} ${spacing[2]}`,
                    borderRadius: radius.sm,
                    border: `1px solid ${theme.border}`,
                    fontSize: typography.sizes.sm.fontSize,
                    fontFamily: typography.fonts.sans.family,
                    color: theme['text-primary'],
                    background: theme['bg-surface'],
                  }}
                />
              </label>
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: spacing[5] }}>
                <button
                  type="submit"
                  style={{
                    height: buttonTokens.height.sm,
                    padding: `${spacing[2]} ${spacing[4]}`,
                    borderRadius: radius.sm,
                    border: 'none',
                    background: theme['btn-primary-bg'],
                    color: theme['btn-primary-text'],
                    fontSize: typography.sizes.sm.fontSize,
                    fontWeight: 600,
                    fontFamily: typography.fonts.sans.family,
                    cursor: 'pointer',
                  }}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

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
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: spacing[3],
          }}
        >
          <button
            type="button"
            onClick={() => setAddOpen(true)}
            style={{
              height: buttonTokens.height.sm,
              padding: `${spacing[2]} ${spacing[4]}`,
              borderRadius: radius.pill,
              border: 'none',
              background: theme['primary-soft'],
              color: theme.primary,
              fontSize: typography.sizes.sm.fontSize,
              fontWeight: 600,
              fontFamily: typography.fonts.sans.family,
              cursor: 'pointer',
            }}
          >
            Add new
          </button>
          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: spacing[2],
              fontSize: typography.sizes.sm.fontSize,
              fontFamily: typography.fonts.sans.family,
              color: theme['text-secondary'],
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
                width: 260,
                maxWidth: '100%',
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
        </div>
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
                          onClick={() => setPendingDelete(row)}
                          style={{
                            padding: `${spacing[1]} ${spacing[3]}`,
                            borderRadius: radius.pill,
                            border: `1px solid ${theme.error}`,
                            background: theme['error-bg'],
                            color: theme.error,
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

      {pendingDelete ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-delete-google-review-title"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: spacing[4],
            background: 'rgba(17, 24, 39, 0.45)',
          }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setPendingDelete(null);
          }}
        >
          <div
            onMouseDown={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: 460,
              background: theme['bg-surface'],
              borderRadius: radius.lg,
              border: `1px solid ${theme.border}`,
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              padding: spacing[5],
            }}
          >
            <h3
              id="confirm-delete-google-review-title"
              style={{
                margin: 0,
                fontSize: typography.sizes.lg.fontSize,
                fontWeight: typography.fonts.heading.fontWeight,
                fontFamily: typography.fonts.heading.family,
                color: theme['text-primary'],
              }}
            >
              Delete Google review link
            </h3>
            <p
              style={{
                margin: `${spacing[3]} 0 0`,
                fontSize: typography.sizes.sm.fontSize,
                lineHeight: 1.6,
                fontFamily: typography.fonts.sans.family,
                color: theme['text-secondary'],
              }}
            >
              Are you sure you want to delete this Google review link for{' '}
              <strong style={{ color: theme['text-primary'] }}>{pendingDelete.mobileType}</strong>? This action cannot
              be undone.
            </p>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: spacing[3],
                marginTop: spacing[5],
              }}
            >
              <button
                type="button"
                onClick={() => setPendingDelete(null)}
                style={{
                  height: buttonTokens.height.sm,
                  padding: `${spacing[2]} ${spacing[4]}`,
                  borderRadius: radius.sm,
                  border: `1px solid ${theme.border}`,
                  background: theme['bg-surface'],
                  color: theme['text-primary'],
                  fontSize: typography.sizes.sm.fontSize,
                  fontWeight: 600,
                  fontFamily: typography.fonts.sans.family,
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setPendingDelete(null)}
                style={{
                  height: buttonTokens.height.sm,
                  padding: `${spacing[2]} ${spacing[4]}`,
                  borderRadius: radius.sm,
                  border: 'none',
                  background: theme.error,
                  color: theme['text-inverse'],
                  fontSize: typography.sizes.sm.fontSize,
                  fontWeight: 600,
                  fontFamily: typography.fonts.sans.family,
                  cursor: 'pointer',
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

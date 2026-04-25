import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import {
  colors,
  spacing,
  radius,
  typography,
  inputTokens,
} from '../../styles/theme';
import Pagination from '../ui/Pagination';
import TablePaginationFooter from '../ui/TablePaginationFooter';

const theme = colors.light;

type FeedbackRow = {
  sno: number;
  name: string;
  date: string;
  counselorMobile: string;
  feedback: string;
};

const FEEDBACK_DATA: FeedbackRow[] = [
  {
    sno: 1,
    name: 'Adolfin Gino G',
    date: '04/11/2022',
    counselorMobile: '9876543210',
    feedback:
      'Thank you for the guidance and support throughout the program. The team was professional and responsive at every step.',
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

/** Reports palette + clear button affordance (border, shadow, hover) */
const feedbackBtnPillBase: CSSProperties = {
  display: 'inline-block',
  padding: `${spacing[2]} ${spacing[4]}`,
  borderRadius: radius.pill,
  fontSize: typography.sizes.xs.fontSize,
  fontFamily: typography.fonts.sans.family,
  fontWeight: 600,
  cursor: 'pointer',
  textAlign: 'center',
  minWidth: 72,
  lineHeight: 1.25,
  transition: 'background 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease, transform 0.1s ease',
};

const feedbackPillHide: CSSProperties = {
  ...feedbackBtnPillBase,
  border: `1px solid ${theme.primary}`,
  background: theme['primary-soft'],
  color: theme.primary,
  boxShadow: '0 1px 2px rgba(15, 23, 42, 0.06)',
};

const feedbackPillShow: CSSProperties = {
  ...feedbackBtnPillBase,
  border: `1px solid ${theme.success}`,
  background: theme['success-bg'],
  color: theme.success,
  boxShadow: '0 1px 2px rgba(15, 23, 42, 0.06)',
};

const feedbackPillDelete: CSSProperties = {
  ...feedbackBtnPillBase,
  border: `1px solid ${theme.error}`,
  background: theme['error-bg'],
  color: theme.error,
  boxShadow: '0 1px 2px rgba(15, 23, 42, 0.06)',
};

export default function FeedbackPage() {
  const [feedbackRows, setFeedbackRows] = useState(
    FEEDBACK_DATA.map((row) => ({ ...row, hidden: false }))
  );
  const [pageSize, setPageSize] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [pendingAction, setPendingAction] = useState<{
    type: 'hide' | 'show' | 'delete';
    row: FeedbackRow & { hidden: boolean };
  } | null>(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return feedbackRows;
    return feedbackRows.filter(
      (r) =>
        String(r.sno).includes(q) ||
        r.name.toLowerCase().includes(q) ||
        r.date.toLowerCase().includes(q) ||
        r.counselorMobile.includes(q) ||
        r.feedback.toLowerCase().includes(q)
    );
  }, [feedbackRows, search]);

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
      <style>{`
        .feedback-status-btn--hide:hover {
          background: color-mix(in srgb, ${theme.primary} 18%, ${theme['bg-surface']});
          border-color: ${theme['primary-hover']};
          box-shadow: 0 2px 6px rgba(147, 32, 122, 0.18);
        }
        .feedback-status-btn--hide:active {
          transform: translateY(1px);
          box-shadow: 0 1px 2px rgba(147, 32, 122, 0.12);
        }
        .feedback-status-btn--hide:focus-visible {
          outline: 2px solid ${theme['focus-ring']};
          outline-offset: 2px;
        }
        .feedback-status-btn--show:hover {
          background: color-mix(in srgb, ${theme.success} 22%, ${theme['bg-surface']});
          border-color: color-mix(in srgb, ${theme.success} 72%, black);
          box-shadow: 0 2px 6px rgba(34, 197, 94, 0.22);
        }
        .feedback-status-btn--show:active {
          transform: translateY(1px);
          box-shadow: 0 1px 2px rgba(34, 197, 94, 0.14);
        }
        .feedback-status-btn--show:focus-visible {
          outline: 2px solid ${theme.success};
          outline-offset: 2px;
        }
        .feedback-status-btn--delete:hover {
          background: color-mix(in srgb, ${theme.error} 22%, ${theme['bg-surface']});
          border-color: color-mix(in srgb, ${theme.error} 72%, black);
          box-shadow: 0 2px 6px rgba(220, 38, 38, 0.22);
        }
        .feedback-status-btn--delete:active {
          transform: translateY(1px);
          box-shadow: 0 1px 2px rgba(220, 38, 38, 0.14);
        }
        .feedback-status-btn--delete:focus-visible {
          outline: 2px solid ${theme.error};
          outline-offset: 2px;
        }
      `}</style>
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
          My Feedback
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
          View feedback submitted by your network
        </p>
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
              minWidth: 720,
            }}
          >
            <thead>
              <tr>
                <th style={{ ...thStyle, textAlign: 'center', width: 56 }}>Sno</th>
                <th style={{ ...thStyle, textAlign: 'left', minWidth: 120 }}>Name</th>
                <th style={{ ...thStyle, textAlign: 'left', width: 100 }}>Date</th>
                <th style={{ ...thStyle, textAlign: 'left', width: 120 }}>
                  Counselor Mobile
                </th>
                <th style={{ ...thStyle, textAlign: 'left', minWidth: 200 }}>Feedback</th>
                <th style={{ ...thStyle, textAlign: 'center', width: 100 }}>Status</th>
              </tr>
            </thead>
            <tbody className="ledger-table-body">
              {pageRows.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
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
                  <tr key={row.sno} style={{ verticalAlign: 'top' }}>
                    <td style={{ ...tdStyle, textAlign: 'center' }}>{row.sno}</td>
                    <td style={tdStyle}>{row.name}</td>
                    <td style={{ ...tdStyle, whiteSpace: 'nowrap' }}>{row.date}</td>
                    <td style={tdStyle}>{row.counselorMobile}</td>
                    <td style={{ ...tdStyle, whiteSpace: 'normal', maxWidth: 360 }}>
                      {row.feedback}
                    </td>
                    <td style={{ ...tdStyle, textAlign: 'center' }}>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: spacing[1],
                          padding: spacing[1],
                        }}
                      >
                        <button
                          type="button"
                          className={row.hidden ? 'feedback-status-btn--show' : 'feedback-status-btn--hide'}
                          onClick={() =>
                            setPendingAction({ type: row.hidden ? 'show' : 'hide', row })
                          }
                          style={row.hidden ? feedbackPillShow : feedbackPillHide}
                        >
                          {row.hidden ? 'Show' : 'Hide'}
                        </button>
                        <button
                          type="button"
                          className="feedback-status-btn--delete"
                          onClick={() => setPendingAction({ type: 'delete', row })}
                          style={feedbackPillDelete}
                        >
                          Delete
                        </button>
                      </div>
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

      {pendingAction ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-feedback-action-title"
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
            if (e.target === e.currentTarget) setPendingAction(null);
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
              id="confirm-feedback-action-title"
              style={{
                margin: 0,
                fontSize: typography.sizes.lg.fontSize,
                fontWeight: typography.fonts.heading.fontWeight,
                fontFamily: typography.fonts.heading.family,
                color: theme['text-primary'],
              }}
            >
              {pendingAction.type === 'hide' ? 'Hide feedback' : 'Delete feedback'}
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
              {pendingAction.type === 'hide'
                ? 'Do you want to hide this feedback from the list? You can enable it again later from admin controls.'
                : pendingAction.type === 'show'
                  ? 'Do you want to show this feedback to other user types again?'
                : 'Are you sure you want to delete this feedback permanently? This action cannot be undone.'}
            </p>
            <p
              style={{
                margin: `${spacing[2]} 0 0`,
                fontSize: typography.sizes.sm.fontSize,
                fontFamily: typography.fonts.sans.family,
                color: theme['text-primary'],
              }}
            >
              <strong>{pendingAction.row.name}</strong> ({pendingAction.row.counselorMobile})
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
                onClick={() => setPendingAction(null)}
                style={{
                  height: inputTokens.height.sm,
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
                onClick={() => {
                  if (!pendingAction) return;
                  if (pendingAction.type === 'delete') {
                    setFeedbackRows((prev) => prev.filter((r) => r.sno !== pendingAction.row.sno));
                  } else if (pendingAction.type === 'hide') {
                    setFeedbackRows((prev) =>
                      prev.map((r) =>
                        r.sno === pendingAction.row.sno ? { ...r, hidden: true } : r
                      )
                    );
                  } else {
                    setFeedbackRows((prev) =>
                      prev.map((r) =>
                        r.sno === pendingAction.row.sno ? { ...r, hidden: false } : r
                      )
                    );
                  }
                  setPendingAction(null);
                }}
                style={{
                  height: inputTokens.height.sm,
                  padding: `${spacing[2]} ${spacing[4]}`,
                  borderRadius: radius.sm,
                  border: 'none',
                  background:
                    pendingAction.type === 'delete' ? theme.error : theme['btn-primary-bg'],
                  color: theme['text-inverse'],
                  fontSize: typography.sizes.sm.fontSize,
                  fontWeight: 600,
                  fontFamily: typography.fonts.sans.family,
                  cursor: 'pointer',
                }}
              >
                {pendingAction.type === 'delete'
                  ? 'Delete'
                  : pendingAction.type === 'hide'
                    ? 'Hide'
                    : 'Show'}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

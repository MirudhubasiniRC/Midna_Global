import {
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
  type FormEvent,
} from 'react';
import { X } from 'lucide-react';
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

type TestimonialRow = {
  sno: number;
  dsa: string;
  video: string;
};

const TESTIMONIALS: TestimonialRow[] = [];

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

const USER_OPTIONS = ['MiDNA (H.O)'];

const fieldLabelStyle = {
  display: 'block' as const,
  fontSize: typography.sizes.sm.fontSize,
  fontWeight: 500,
  fontFamily: typography.fonts.sans.family,
  color: theme['text-primary'],
  marginBottom: spacing[2],
};

const inputBase: CSSProperties = {
  width: '100%',
  padding: inputTokens.padding,
  fontSize: typography.sizes.sm.fontSize,
  fontFamily: typography.fonts.sans.family,
  border: `1px solid ${theme.border}`,
  borderRadius: radius.sm,
  color: theme['text-primary'],
  background: theme['bg-surface'],
  boxSizing: 'border-box',
  outlineColor: theme['focus-ring'],
};

/** Matches Reports “Request” chips: soft tint + brand text, full pill */
const addNewPillStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
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
};

const tableEditPillStyle: CSSProperties = {
  padding: `${spacing[1]} ${spacing[3]}`,
  borderRadius: radius.pill,
  border: 'none',
  background: theme['primary-soft'],
  color: theme.primary,
  fontSize: typography.sizes.xs.fontSize,
  fontWeight: 500,
  fontFamily: typography.fonts.sans.family,
  cursor: 'pointer',
};

const tableDeletePillStyle: CSSProperties = {
  padding: `${spacing[1]} ${spacing[3]}`,
  borderRadius: radius.pill,
  border: 'none',
  background: theme['btn-secondary-bg'],
  color: theme['btn-secondary-text'],
  fontSize: typography.sizes.xs.fontSize,
  fontWeight: 500,
  fontFamily: typography.fonts.sans.family,
  cursor: 'pointer',
};

const modalSubmitPillStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: buttonTokens.height.md,
  padding: buttonTokens.padding.md,
  borderRadius: radius.pill,
  border: 'none',
  background: theme['primary-soft'],
  color: theme.primary,
  fontSize: typography.sizes.sm.fontSize,
  fontWeight: 600,
  fontFamily: typography.fonts.sans.family,
  cursor: 'pointer',
};

export default function TestimonialsPage() {
  const [addOpen, setAddOpen] = useState(false);
  const [pageSize, setPageSize] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return TESTIMONIALS;
    return TESTIMONIALS.filter(
      (r) =>
        String(r.sno).includes(q) ||
        r.dsa.toLowerCase().includes(q) ||
        r.video.toLowerCase().includes(q)
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
          alignItems: 'center',
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
            My Testimonials
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
            View and manage your testimonials
          </p>
        </div>
        <button type="button" onClick={() => setAddOpen(true)} style={addNewPillStyle}>
          Add new
        </button>
      </div>

      {addOpen && <AddTestimonialModal onClose={() => setAddOpen(false)} />}

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
              minWidth: 560,
            }}
          >
            <thead>
              <tr>
                <th style={{ ...thStyle, textAlign: 'center', width: 72 }}>Sno</th>
                <th style={{ ...thStyle, textAlign: 'left' }}>DSA</th>
                <th style={{ ...thStyle, textAlign: 'left' }}>Video</th>
                <th style={{ ...thStyle, textAlign: 'center', width: 160 }}>Options</th>
              </tr>
            </thead>
            <tbody className="ledger-table-body">
              {pageRows.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
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
                    <td style={tdStyle}>{row.dsa}</td>
                    <td style={{ ...tdStyle, whiteSpace: 'normal', maxWidth: 320 }}>{row.video}</td>
                    <td style={{ ...tdStyle, textAlign: 'center' }}>
                      <span style={{ display: 'inline-flex', gap: spacing[2], justifyContent: 'center' }}>
                        <button type="button" style={tableEditPillStyle}>
                          Edit
                        </button>
                        <button type="button" style={tableDeletePillStyle}>
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

function AddTestimonialModal({ onClose }: { onClose: () => void }) {
  const [iframeLink, setIframeLink] = useState('');
  const [user, setUser] = useState(USER_OPTIONS[0]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-testimonial-title"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: spacing[4],
        background: 'rgba(17, 24, 39, 0.45)',
      }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        onMouseDown={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: 480,
          maxHeight: 'min(90vh, 640px)',
          overflow: 'auto',
          background: theme['bg-surface'],
          borderRadius: radius.lg,
          border: `1px solid ${theme.border}`,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: `${spacing[4]} ${spacing[5]} ${spacing[3]}`,
            borderBottom: `1px solid ${theme.border}`,
          }}
        >
          <h3
            id="add-testimonial-title"
            style={{
              margin: 0,
              fontSize: typography.sizes.lg.fontSize,
              fontWeight: typography.fonts.heading.fontWeight,
              fontFamily: typography.fonts.heading.family,
              color: theme['text-primary'],
            }}
          >
            Add new
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 40,
              height: 40,
              border: 'none',
              borderRadius: radius.sm,
              background: 'transparent',
              color: theme['text-secondary'],
              cursor: 'pointer',
            }}
          >
            <X size={22} strokeWidth={2} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: spacing[5] }}>
          <div style={{ marginBottom: spacing[4] }}>
            <label htmlFor="tt-iframe" style={fieldLabelStyle}>
              Youtube IFRAME link
            </label>
            <textarea
              id="tt-iframe"
              value={iframeLink}
              onChange={(e) => setIframeLink(e.target.value)}
              rows={5}
              placeholder="Paste embed / iframe code or URL"
              style={{
                ...inputBase,
                minHeight: 120,
                resize: 'vertical' as const,
                lineHeight: 1.5,
              }}
            />
          </div>
          <div style={{ marginBottom: spacing[5] }}>
            <label htmlFor="tt-user" style={fieldLabelStyle}>
              User
            </label>
            <select
              id="tt-user"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              style={{
                ...inputBase,
                height: inputTokens.height.md,
                cursor: 'pointer',
              }}
            >
              {USER_OPTIONS.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button type="submit" style={modalSubmitPillStyle}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

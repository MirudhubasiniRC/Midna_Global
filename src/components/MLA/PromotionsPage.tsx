import { useEffect, useMemo, useState } from 'react';
import {
  colors,
  spacing,
  radius,
  typography,
  inputTokens,
  buttonTokens,
  modalTokens,
} from '../../styles/theme';
import Pagination from '../ui/Pagination';
import TablePaginationFooter from '../ui/TablePaginationFooter';
import AppModal, { APP_MODAL_FIELD_ATTR } from '../ui/AppModal';

const theme = colors.light;

type PromotionRow = {
  sno: number;
  platform: string;
  link: string;
};

const PROMOTIONS: PromotionRow[] = [
  { sno: 1, platform: 'Google', link: 'https://example.com/google-review' },
  { sno: 2, platform: 'Instagram', link: 'https://example.com/instagram' },
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

export default function PromotionsPage() {
  const [pageSize, setPageSize] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [addOpen, setAddOpen] = useState(false);
  const [platform, setPlatform] = useState('Google');
  const [link, setLink] = useState('');

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return PROMOTIONS;
    return PROMOTIONS.filter(
      (r) =>
        String(r.sno).includes(q) ||
        r.platform.toLowerCase().includes(q) ||
        r.link.toLowerCase().includes(q)
    );
  }, [search]);

  const totalEntries = filtered.length;
  const totalPages = totalEntries === 0 ? 0 : Math.max(1, Math.ceil(totalEntries / pageSize));

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
          My Promotions
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
          Add and manage your promotion platform links
        </p>
      </div>

      <AppModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        titleId="add-promotion-title"
        title="Add promotion"
        subtitle="Choose a platform and paste the link you want to share."
        size="md"
        footer={
          <>
            <button
              type="button"
              onClick={() => setAddOpen(false)}
              style={{
                height: buttonTokens.height.md,
                padding: buttonTokens.padding.md,
                borderRadius: radius.pill,
                border: `1px solid ${theme.border}`,
                background: theme['bg-surface'],
                color: theme['text-primary'],
                fontSize: typography.sizes.sm.fontSize,
                fontWeight: 600,
                fontFamily: typography.fonts.sans.family,
                cursor: 'pointer',
                boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              form="promo-add-form"
              style={{
                height: buttonTokens.height.md,
                padding: buttonTokens.padding.md,
                borderRadius: radius.pill,
                border: 'none',
                background: theme['btn-primary-bg'],
                color: theme['btn-primary-text'],
                fontSize: typography.sizes.sm.fontSize,
                fontWeight: 600,
                fontFamily: typography.fonts.sans.family,
                cursor: 'pointer',
                boxShadow: modalTokens.primaryActionBoxShadow,
              }}
            >
              Add link
            </button>
          </>
        }
      >
        <form
          id="promo-add-form"
          onSubmit={(e) => {
            e.preventDefault();
            if (!link.trim()) return;
            setLink('');
            setPlatform('Google');
            setAddOpen(false);
          }}
          style={{ display: 'grid', gap: spacing[5], margin: 0, padding: 0 }}
        >
          <label
            style={{
              display: 'grid',
              gap: spacing[2],
              fontSize: typography.sizes.sm.fontSize,
              fontWeight: 600,
              color: theme['text-secondary'],
              fontFamily: typography.fonts.sans.family,
              letterSpacing: '0.01em',
            }}
          >
            Platform type
            <select
              {...APP_MODAL_FIELD_ATTR}
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              style={{
                width: '100%',
                height: inputTokens.height.md,
                boxSizing: 'border-box',
                padding: `0 ${spacing[3]}`,
                borderRadius: radius.md,
                border: `1px solid ${theme.border}`,
                fontSize: typography.sizes.sm.fontSize,
                fontFamily: typography.fonts.sans.family,
                color: theme['text-primary'],
                background: theme['bg-surface'],
                cursor: 'pointer',
                transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
              }}
            >
              <option>Google</option>
              <option>Instagram</option>
              <option>Facebook</option>
              <option>YouTube</option>
              <option>LinkedIn</option>
            </select>
          </label>
          <label
            style={{
              display: 'grid',
              gap: spacing[2],
              fontSize: typography.sizes.sm.fontSize,
              fontWeight: 600,
              color: theme['text-secondary'],
              fontFamily: typography.fonts.sans.family,
              letterSpacing: '0.01em',
            }}
          >
            Link
            <input
              {...APP_MODAL_FIELD_ATTR}
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="https://…"
              required
              style={{
                width: '100%',
                height: inputTokens.height.md,
                boxSizing: 'border-box',
                padding: `0 ${spacing[3]}`,
                borderRadius: radius.md,
                border: `1px solid ${theme.border}`,
                fontSize: typography.sizes.sm.fontSize,
                fontFamily: typography.fonts.sans.family,
                color: theme['text-primary'],
                background: theme['bg-surface'],
                transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
              }}
            />
          </label>
        </form>
      </AppModal>

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
                background: theme['bg-surface'],
              }}
            />
          </label>
        </div>
        <div
          style={{
            display: 'none',
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
        .promotions-table-body tr:nth-child(even) { background: ${theme['table-zebra']}; }
        .promotions-table-body tr:hover { background: ${theme['table-row-hover']}; }
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
              minWidth: 480,
            }}
          >
            <thead>
              <tr>
                <th style={{ ...thStyle, textAlign: 'center', width: 72 }}>Sno</th>
                <th style={{ ...thStyle, textAlign: 'left', minWidth: 120 }}>Platform</th>
                <th style={{ ...thStyle, textAlign: 'left' }}>Link</th>
              </tr>
            </thead>
            <tbody className="promotions-table-body">
              {pageRows.length === 0 ? (
                <tr>
                  <td
                    colSpan={3}
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
                    <td style={tdStyle}>{row.platform}</td>
                    <td
                      style={{
                        ...tdStyle,
                        whiteSpace: 'normal',
                        wordBreak: 'break-all',
                      }}
                    >
                      {row.link}
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

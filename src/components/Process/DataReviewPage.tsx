import { colors, spacing, typography, radius } from '../../styles/theme';
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

export default function DataReviewPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[4] }}>
      <div
        style={{
          background: theme['bg-surface'],
          border: `1px solid ${theme.border}`,
          borderRadius: radius.lg,
          overflow: 'hidden',
          padding: spacing[5],
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: spacing[3],
            marginBottom: spacing[3],
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: typography.sizes.xl.fontSize,
              fontFamily: typography.fonts.heading.family,
              fontWeight: typography.fonts.heading.fontWeight,
              color: theme['text-primary'],
            }}
          >
            Verification & Data Export
          </h1>
          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: spacing[2],
              fontSize: typography.sizes.sm.fontSize,
              color: theme['text-secondary'],
              fontFamily: typography.fonts.sans.family,
              width: '100%',
            }}
          >
            Search:
            <input
              type="text"
              placeholder="Search..."
              style={{
                padding: `${spacing[2]} ${spacing[3]}`,
                width: 240,
                maxWidth: '100%',
                border: `1px solid ${theme.border}`,
                borderRadius: radius.sm,
                fontSize: typography.sizes.sm.fontSize,
                fontFamily: typography.fonts.sans.family,
                background: theme['bg-surface'],
                color: theme['text-primary'],
              }}
            />
          </label>
          <h2
            style={{
              margin: 0,
              width: '100%',
              textAlign: 'center',
              fontSize: typography.sizes.xl.fontSize,
              fontFamily: typography.fonts.heading.family,
              fontWeight: typography.fonts.heading.fontWeight,
              color: theme['text-primary'],
            }}
          >
            Scans For QC Checking
          </h2>
        </div>

        <style>{`
          .process-review-table-body tr:nth-child(even) { background: ${theme['table-zebra']}; }
          .process-review-table-body tr:hover { background: ${theme['table-row-hover']}; }
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
                <th style={{ ...thStyle, textAlign: 'center', minWidth: 60 }}>Sno</th>
                <th style={{ ...thStyle, textAlign: 'left', minWidth: 90 }}>Scan Id</th>
                <th style={{ ...thStyle, textAlign: 'left', minWidth: 180 }}>Name</th>
                <th style={{ ...thStyle, textAlign: 'left', minWidth: 90 }}>Alert</th>
                <th style={{ ...thStyle, textAlign: 'left', minWidth: 140 }}>Reffered By</th>
                <th style={{ ...thStyle, textAlign: 'left', minWidth: 130 }}>Processed By</th>
                <th style={{ ...thStyle, textAlign: 'left', minWidth: 120 }}>Status</th>
                <th style={{ ...thStyle, textAlign: 'right', minWidth: 90 }}>Cost</th>
                <th style={{ ...thStyle, textAlign: 'center', minWidth: 90, borderRight: 'none' }}>Process</th>
              </tr>
            </thead>
            <tbody className="process-review-table-body">
              <tr>
                <td
                  colSpan={9}
                  style={{
                    padding: spacing[8],
                    textAlign: 'center',
                    color: theme['text-muted'],
                    fontSize: typography.sizes.sm.fontSize,
                    fontFamily: typography.fonts.sans.family,
                    background: theme['bg-surface'],
                  }}
                >
                  No records found
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <TablePaginationFooter summary="Showing 0 to 0 of 0 entries" />
      </div>
    </div>
  );
}

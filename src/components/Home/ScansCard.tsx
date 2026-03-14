import { colors, spacing, radius, typography } from '../../styles/theme';

const theme = colors.light;

const scanData = {
  todayScans: 3,
  cmScans: 163,
  cqScans: 963,
  cyScans: 963,
};
const daysToGo = 17;

export default function ScansCard() {
  return (
    <div
      style={{
        background: theme['bg-surface'],
        borderRadius: radius.lg,
        overflow: 'hidden',
        border: `1px solid ${theme.border}`,
        padding: spacing[4],
      }}
    >
      <div style={{ marginBottom: spacing[3] }}>
        <h2
          style={{
            margin: 0,
            fontSize: typography.sizes.xl.fontSize,
            fontWeight: typography.fonts.heading.fontWeight,
            fontFamily: typography.fonts.heading.family,
            color: theme['text-primary'],
            textAlign: 'left',
          }}
        >
          Scan summary
        </h2>
        <p
          style={{
            margin: `${spacing[2]} 0 0 0`,
            fontSize: typography.sizes.sm.fontSize,
            fontWeight: 400,
            fontFamily: typography.fonts.sans.family,
            color: theme['text-secondary'],
            lineHeight: 1.5,
          }}
        >
          Today's scan counts and period progress
        </p>
      </div>
      <style>{`
        .scans-table-body tr:nth-child(even) { background: ${theme['table-zebra']}; }
        .scans-table-body tr:hover { background: ${theme['table-row-hover']}; }
      `}</style>
      <div style={{ borderRadius: radius.sm, border: `1px solid ${theme.border}`, overflow: 'hidden' }}>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontFamily: typography.fonts.sans.family,
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                padding: spacing[2],
                height: '40px',
                background: theme['table-header-muted-secondary'],
                color: theme['text-primary'],
                fontSize: typography.sizes.sm.fontSize,
                fontWeight: 600,
                borderBottom: `1px solid ${theme['table-border']}`,
                textAlign: 'center',
              }}
            >
              Today Scans
            </th>
            <th
              style={{
                padding: spacing[2],
                height: '40px',
                background: theme['table-header-muted-secondary'],
                color: theme['text-primary'],
                fontSize: typography.sizes.sm.fontSize,
                fontWeight: 600,
                borderBottom: `1px solid ${theme['table-border']}`,
                textAlign: 'center',
              }}
            >
              CM Scans
            </th>
            <th
              style={{
                padding: spacing[2],
                height: '40px',
                background: theme['table-header-muted-secondary'],
                color: theme['text-primary'],
                fontSize: typography.sizes.sm.fontSize,
                fontWeight: 600,
                borderBottom: `1px solid ${theme['table-border']}`,
                textAlign: 'center',
              }}
            >
              CQ Scans
            </th>
            <th
              style={{
                padding: spacing[2],
                height: '40px',
                background: theme['table-header-muted-secondary'],
                color: theme['text-primary'],
                fontSize: typography.sizes.sm.fontSize,
                fontWeight: 600,
                borderBottom: `1px solid ${theme['table-border']}`,
                textAlign: 'center',
              }}
            >
              CY Scans
            </th>
          </tr>
        </thead>
        <tbody className="scans-table-body">
          <tr style={{ height: '40px' }}>
            <td
              style={{
                padding: spacing[2],
                color: theme['text-primary'],
                fontSize: typography.sizes.sm.fontSize,
                fontWeight: 400,
                textAlign: 'center',
                borderBottom: `1px solid ${theme['table-border']}`,
              }}
            >
              {scanData.todayScans}
            </td>
            <td
              style={{
                padding: spacing[2],
                color: theme['text-primary'],
                fontSize: typography.sizes.sm.fontSize,
                fontWeight: 400,
                textAlign: 'center',
                borderBottom: `1px solid ${theme['table-border']}`,
              }}
            >
              {scanData.cmScans}
            </td>
            <td
              style={{
                padding: spacing[2],
                color: theme['text-primary'],
                fontSize: typography.sizes.sm.fontSize,
                fontWeight: 400,
                textAlign: 'center',
                borderBottom: `1px solid ${theme['table-border']}`,
              }}
            >
              {scanData.cqScans}
            </td>
            <td
              style={{
                padding: spacing[2],
                color: theme['text-primary'],
                fontSize: typography.sizes.sm.fontSize,
                fontWeight: 400,
                textAlign: 'center',
                borderBottom: `1px solid ${theme['table-border']}`,
              }}
            >
              {scanData.cyScans}
            </td>
          </tr>
        </tbody>
      </table>
      </div>
      <div
        style={{
          marginTop: spacing[3],
          padding: spacing[2],
          textAlign: 'center',
          color: theme.primary,
          fontSize: typography.sizes.sm.fontSize,
          fontWeight: typography.fonts.heading.fontWeight,
        }}
      >
        {daysToGo} Days to Go
      </div>
    </div>
  );
}

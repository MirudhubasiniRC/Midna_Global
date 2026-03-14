import { colors, spacing, radius, typography } from '../../styles/theme';

const theme = colors.light;

const quickLinks = [
  'My Scans',
  'My Reports',
  'My Ledger',
  'My ABC Ledger',
  'My Profile',
];

const stats = [
  { label: 'CLOSING BALANCE', value: '-100318' },
  { label: 'LAST SCAN', value: '+0 DAYS AGO' },
  { label: 'CURRENT YEAR SCAN', value: '0' },
  { label: 'LAST 365 DAYS SCAN', value: '23' },
  { label: 'LAST 90 DAYS SCAN', value: '1' },
];
const nasExpiry = '31/03/2027';

export default function QuickLinks() {
  return (
    <div
      style={{
        background: theme['bg-surface'],
        borderRadius: radius.lg,
        padding: spacing[5],
        border: `1px solid ${theme.border}`,
        borderLeft: `4px solid ${theme.primary}`,
      }}
    >
      <div style={{ marginBottom: spacing[5] }}>
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
          Quick links
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
          Shortcuts and account overview
        </p>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: spacing[2], flexDirection: 'row' }}>
        {quickLinks.map((label) => (
          <button
            key={label}
            type="button"
            style={{
              background: theme['btn-primary-bg'],
              border: 'none',
              borderRadius: radius.sm,
              padding: `${spacing[2]} ${spacing[4]}`,
              color: theme['btn-primary-text'],
              fontSize: typography.sizes.sm.fontSize,
              fontFamily: typography.fonts.sans.family,
              fontWeight: 500,
              cursor: 'pointer',
              textAlign: 'center',
              flex: '0 0 auto',
            }}
          >
            {label}
          </button>
        ))}
      </div>
      <div
        style={{
          marginTop: spacing[6],
          display: 'flex',
          flexDirection: 'column',
          gap: spacing[1],
          color: theme['text-primary'],
          fontSize: typography.sizes.sm.fontSize,
          fontFamily: typography.fonts.sans.family,
        }}
      >
        {stats.map(({ label, value }) => (
          <div key={label}>
            {label} : {value}
          </div>
        ))}
        <div style={{ marginTop: spacing[3] }}>
          NAS EXPIRY DATE : {nasExpiry}
        </div>
      </div>
    </div>
  );
}

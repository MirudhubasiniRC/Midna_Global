import { colors, spacing, radius, typography } from '../../styles/theme';

const theme = colors.light;

const stats = [
  { label: 'Closing balance', value: '-100318' },
  { label: 'Last scan', value: '+0 days ago' },
  { label: 'Current year scan', value: '0' },
  { label: 'Last 365 days scan', value: '23' },
  { label: 'Last 90 days scan', value: '1' },
  { label: 'NAS expiry date', value: '31/03/2027' },
];

export default function AccountStats() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(6, 1fr)',
        gap: spacing[4],
      }}
    >
      {stats.map(({ label, value }) => (
        <div
          key={label}
          style={{
            background: theme['table-header-muted-secondary'],
            borderRadius: radius.sm,
            padding: spacing[4],
            border: `1px solid ${theme.border}`,
          }}
        >
          <div
            style={{
              fontSize: typography.sizes.xs.fontSize,
              color: theme['text-secondary'],
              marginBottom: spacing[2],
              fontFamily: typography.fonts.sans.family,
            }}
          >
            {label}
          </div>
          <div
            style={{
              fontSize: typography.sizes.base.fontSize,
              fontWeight: 600,
              color: theme['text-primary'],
              fontFamily: typography.fonts.heading.family,
            }}
          >
            {value}
          </div>
        </div>
      ))}
    </div>
  );
}

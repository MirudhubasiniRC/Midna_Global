import type { LucideIcon } from 'lucide-react';
import { ThumbsUp, IndianRupee } from 'lucide-react';
import { colors, spacing, radius, typography } from '../../styles/theme';

const theme = colors.light;

const ICON_SIZE = 22;
const CIRCLE = 48;

type KpiItem = {
  label: string;
  value: string;
  Icon: LucideIcon;
  circleBg: string;
};

const KPI_ITEMS: KpiItem[] = [
  {
    label: 'My Scans this Year',
    value: '0',
    Icon: ThumbsUp,
    circleBg: theme.warning,
  },
  {
    label: 'My Total Scans',
    value: '144',
    Icon: ThumbsUp,
    circleBg: theme.info,
  },
  {
    label: 'My Billing this Year',
    value: '–',
    Icon: IndianRupee,
    circleBg: theme.primary,
  },
  {
    label: 'My Total Billing',
    value: Number(3551617).toLocaleString('en-IN'),
    Icon: IndianRupee,
    circleBg: theme.success,
  },
];

export default function DashboardKpiStrip() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        gap: spacing[4],
        marginBottom: spacing[6],
      }}
    >
      {KPI_ITEMS.map(({ label, value, Icon, circleBg }) => (
        <div
          key={label}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: spacing[4],
            background: theme['bg-surface'],
            borderRadius: radius.lg,
            padding: `${spacing[4]} ${spacing[5]}`,
            border: `1px solid ${theme.border}`,
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
          }}
        >
          <div
            style={{
              width: CIRCLE,
              height: CIRCLE,
              borderRadius: '50%',
              background: circleBg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
            aria-hidden
          >
            <Icon size={ICON_SIZE} color={theme['text-inverse']} strokeWidth={2} />
          </div>
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                fontSize: typography.sizes['2xl'].fontSize,
                fontWeight: 700,
                fontFamily: typography.fonts.heading.family,
                color: theme['text-primary'],
                lineHeight: 1.2,
                marginBottom: spacing[1],
              }}
            >
              {value}
            </div>
            <div
              style={{
                fontSize: typography.sizes.sm.fontSize,
                color: theme['text-secondary'],
                fontFamily: typography.fonts.sans.family,
                lineHeight: 1.35,
              }}
            >
              {label}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

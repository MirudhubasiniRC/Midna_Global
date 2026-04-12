import type { LucideIcon } from 'lucide-react';
import {
  ThumbsUp,
  IndianRupee,
  CloudUpload,
  Search,
  Loader2,
  RefreshCw,
} from 'lucide-react';
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

/** Original “My Home” row — personal scans & billing */
const MY_HOME_KPIS: KpiItem[] = [
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

/** Scan pipeline — one distinct theme color per card (no duplicate swatches) */
const PIPELINE_KPIS: KpiItem[] = [
  {
    label: 'Scans Uploaded',
    value: '0',
    Icon: CloudUpload,
    circleBg: theme.warning,
  },
  {
    label: 'To be Processed',
    value: '0',
    Icon: Search,
    circleBg: theme.secondary,
  },
  {
    label: 'Under Processing',
    value: '0',
    Icon: RefreshCw,
    circleBg: theme.info,
  },
  {
    label: 'To Be Uploaded',
    value: '0',
    Icon: Loader2,
    circleBg: theme.primary,
  },
  {
    label: 'Scans Reported',
    value: '167',
    Icon: ThumbsUp,
    circleBg: theme.success,
  },
  {
    label: 'HO Billing',
    value: Number(95060).toLocaleString('en-IN'),
    Icon: IndianRupee,
    circleBg: theme['primary-hover'],
  },
];

/** Same number / label scale as the rest of Home (e.g. AccountStats, MLA cards) */
const kpiValueStyle = {
  fontSize: typography.sizes.xl.fontSize,
  lineHeight: typography.sizes.xl.lineHeight,
  fontWeight: 700,
  fontFamily: typography.fonts.heading.family,
  color: theme['text-primary'],
  marginBottom: spacing[1],
} as const;

const kpiLabelStyle = {
  fontSize: typography.sizes.sm.fontSize,
  lineHeight: typography.sizes.sm.lineHeight,
  color: theme['text-secondary'],
  fontFamily: typography.fonts.sans.family,
} as const;

function KpiCard({ label, value, Icon, circleBg }: KpiItem) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: spacing[4],
        background: theme['bg-surface'],
        borderRadius: radius.lg,
        padding: `${spacing[4]} ${spacing[5]}`,
        border: `1px solid ${theme.border}`,
        boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
        minWidth: 0,
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
        <div style={kpiValueStyle}>{value}</div>
        <div style={kpiLabelStyle}>{label}</div>
      </div>
    </div>
  );
}

export default function DashboardKpiStrip() {
  return (
    <div style={{ marginBottom: spacing[6] }}>
      {/* Row 1: four personal KPIs — fills width evenly */}
      <style>{`
        .dashboard-kpi-my-home {
          display: grid;
          gap: ${spacing[4]};
          grid-template-columns: repeat(4, minmax(0, 1fr));
          margin-bottom: ${spacing[5]};
        }
        @media (max-width: 1024px) {
          .dashboard-kpi-my-home {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        @media (max-width: 520px) {
          .dashboard-kpi-my-home {
            grid-template-columns: 1fr;
          }
        }
        .dashboard-kpi-pipeline {
          display: grid;
          gap: ${spacing[3]};
          grid-template-columns: repeat(6, minmax(0, 1fr));
        }
        @media (max-width: 1200px) {
          .dashboard-kpi-pipeline {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }
        @media (max-width: 700px) {
          .dashboard-kpi-pipeline {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        @media (max-width: 400px) {
          .dashboard-kpi-pipeline {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="dashboard-kpi-my-home">
        {MY_HOME_KPIS.map((item) => (
          <KpiCard key={item.label} {...item} />
        ))}
      </div>

      {/* Row 2: scan pipeline — brand-tint panel (no teal) */}
      <div
        style={{
          background: theme['primary-soft'],
          borderRadius: radius.lg,
          padding: spacing[4],
          border: `1px solid ${theme.border}`,
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
        }}
      >
        <div
          style={{
            fontSize: typography.sizes.base.fontSize,
            lineHeight: typography.sizes.base.lineHeight,
            fontWeight: 600,
            fontFamily: typography.fonts.heading.family,
            color: theme.primary,
            marginBottom: spacing[3],
          }}
        >
          Scan Pipeline
        </div>
        <div className="dashboard-kpi-pipeline">
          {PIPELINE_KPIS.map((item) => (
            <KpiCard key={item.label} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}

import { colors, spacing, radius, typography } from '../../styles/theme';
import TopBar from '../Layout/TopBar';
import NoticeBoard from './NoticeBoard';
import QuickLinks from './QuickLinks';
import ScansCard from './ScansCard';
import NestPerformance from './NestPerformance';

const theme = colors.light;

const kpiCards = [
  { label: 'Scans Uploaded', value: 0 },
  { label: 'To be Processed', value: 1 },
  { label: 'Under Processing', value: 0 },
  { label: 'To Be Uploaded', value: 0 },
  { label: 'Scans Reported', value: 176 },
  { label: 'HO Billing', value: 86910 },
];

export default function Home() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: theme['bg-base'],
        fontFamily: typography.fonts.sans.family,
        fontSize: typography.sizes.base.fontSize,
        color: theme['text-primary'],
      }}
    >
      <TopBar />
      <main style={{ padding: spacing[6] }}>
        <h1
          style={{
            fontSize: typography.sizes.xl.fontSize,
            fontWeight: typography.fonts.heading.fontWeight,
            fontFamily: typography.fonts.heading.family,
            marginBottom: spacing[6],
          }}
        >
          My Home
        </h1>

        {/* KPI Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: spacing[4],
            marginBottom: spacing[6],
          }}
        >
          {kpiCards.map((card) => (
            <div
              key={card.label}
              style={{
                background: theme['bg-surface'],
                borderRadius: radius.lg,
                padding: spacing[5],
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                border: `1px solid ${theme.border}`,
              }}
            >
              <div
                style={{
                  fontSize: typography.sizes['3xl'].fontSize,
                  fontWeight: typography.fonts.heading.fontWeight,
                  fontFamily: typography.fonts.heading.family,
                  color: theme.primary,
                  marginBottom: spacing[2],
                }}
              >
                {card.value.toLocaleString()}
              </div>
              <div
                style={{
                  fontSize: typography.sizes.sm.fontSize,
                  color: theme['text-secondary'],
                  lineHeight: 1.4,
                }}
              >
                {card.label}
              </div>
            </div>
          ))}
        </div>

        {/* Layout: Row1: Scan Summary | Quick Links | Notice Board; Row2: Table | Notice Board */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 320px',
            gridTemplateRows: 'auto 1fr',
            gap: spacing[6],
            alignItems: 'start',
          }}
        >
          <div style={{ gridColumn: 1 }}>
            <ScansCard />
          </div>
          <div style={{ gridColumn: 2 }}>
            <QuickLinks />
          </div>
          <div style={{ gridColumn: 3, gridRow: '1 / -1', alignSelf: 'stretch', minHeight: 0, display: 'flex' }}>
            <NoticeBoard />
          </div>
          <div style={{ gridColumn: '1 / 3' }}>
            <NestPerformance />
          </div>
        </div>
      </main>
    </div>
  );
}

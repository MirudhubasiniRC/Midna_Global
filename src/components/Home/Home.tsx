import { colors, spacing, typography } from '../../styles/theme';
import TopBar from '../Layout/TopBar';
import NoticeBoard from './NoticeBoard';
import QuickLinks from './QuickLinks';
import ScansCard from './ScansCard';
import NestPerformance from './NestPerformance';
import AccountStats from './AccountStats';
import DashboardKpiStrip from './DashboardKpiStrip';

const theme = colors.light;

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

        <DashboardKpiStrip />

        {/* Layout: Row1: AccountStats | Notice Board; Row2: Scan Summary | Quick Links | Notice Board; Row3: Table | Notice Board */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 320px',
            gridTemplateRows: 'auto auto 1fr',
            gap: spacing[6],
            alignItems: 'start',
          }}
        >
          <div style={{ gridColumn: '1 / 3' }}>
            <AccountStats />
          </div>
          <div style={{ gridColumn: 1 }}>
            <ScansCard />
          </div>
          <div style={{ gridColumn: 2 }}>
            <QuickLinks />
          </div>
          <div style={{ gridColumn: 3, gridRow: '1 / -1', alignSelf: 'stretch', minHeight: 0, display: 'flex', flexDirection: 'column' }}>
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

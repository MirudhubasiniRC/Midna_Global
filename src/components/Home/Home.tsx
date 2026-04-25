import { useEffect, useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { colors, spacing, typography, radius } from '../../styles/theme';
import TopBar from '../Layout/TopBar';
import NoticeBoard, { NOTICE_ITEMS } from './NoticeBoard';
import QuickLinks from './QuickLinks';
import ScansCard from './ScansCard';
import NestPerformance from './NestPerformance';
import AccountStats from './AccountStats';
import DashboardKpiStrip from './DashboardKpiStrip';

const theme = colors.light;
const NOTICE_READ_KEY = 'midna_notice_read_v1';

export default function Home() {
  const [showNoticeModal, setShowNoticeModal] = useState(false);

  useEffect(() => {
    const readStatus = localStorage.getItem(NOTICE_READ_KEY);
    if (readStatus === 'true') return;

    const timer = window.setTimeout(() => {
      setShowNoticeModal(true);
    }, 1200);

    return () => window.clearTimeout(timer);
  }, []);

  const handleMarkAsRead = () => {
    localStorage.setItem(NOTICE_READ_KEY, 'true');
    setShowNoticeModal(false);
  };

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

      {showNoticeModal ? (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(17, 24, 39, 0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: spacing[6],
          }}
          onClick={() => setShowNoticeModal(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Unread notice board alerts"
            onClick={(e) => e.stopPropagation()}
            style={{
              width: 'min(760px, 100%)',
              maxHeight: '86vh',
              overflow: 'hidden',
              background: theme['bg-surface'],
              border: `1px solid ${theme.border}`,
              borderRadius: radius.lg,
              boxShadow: '0 18px 48px rgba(0, 0, 0, 0.2)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                padding: spacing[5],
                borderBottom: `1px solid ${theme.border}`,
                display: 'flex',
                alignItems: 'center',
                gap: spacing[2],
              }}
            >
              <AlertCircle size={22} color={theme.error} />
              <div>
                <h2
                  style={{
                    margin: 0,
                    fontSize: typography.sizes.xl.fontSize,
                    fontFamily: typography.fonts.heading.family,
                    fontWeight: typography.fonts.heading.fontWeight,
                    color: theme['text-primary'],
                  }}
                >
                  Unread Notice Board Updates
                </h2>
                <p
                  style={{
                    margin: `${spacing[1]} 0 0`,
                    color: theme['text-secondary'],
                    fontSize: typography.sizes.sm.fontSize,
                  }}
                >
                  Please review these important updates before continuing.
                </p>
              </div>
            </div>

            <div
              style={{
                padding: spacing[5],
                overflowY: 'auto',
                display: 'grid',
                gap: spacing[3],
              }}
            >
              {NOTICE_ITEMS.map((text, idx) => (
                <div
                  key={`${idx}-${text.slice(0, 16)}`}
                  style={{
                    background: theme['table-header-bg'],
                    border: `1px solid ${theme.border}`,
                    borderRadius: radius.sm,
                    padding: spacing[3],
                    color: theme['text-primary'],
                    fontSize: typography.sizes.sm.fontSize,
                    lineHeight: 1.5,
                    fontFamily: typography.fonts.sans.family,
                  }}
                >
                  {text}
                </div>
              ))}
            </div>

            <div
              style={{
                padding: spacing[5],
                borderTop: `1px solid ${theme.border}`,
                display: 'flex',
                justifyContent: 'flex-end',
                gap: spacing[3],
              }}
            >
              <button
                type="button"
                onClick={() => setShowNoticeModal(false)}
                style={{
                  border: `1px solid ${theme.border}`,
                  borderRadius: radius.sm,
                  background: theme['bg-surface'],
                  color: theme['text-secondary'],
                  padding: `${spacing[2]} ${spacing[4]}`,
                  fontFamily: typography.fonts.sans.family,
                  fontSize: typography.sizes.sm.fontSize,
                  fontWeight: 600,
                  cursor: 'pointer',
                  outlineColor: theme['focus-ring'],
                }}
              >
                Remind me later
              </button>
              <button
                type="button"
                onClick={handleMarkAsRead}
                style={{
                  border: `1px solid ${theme.primary}`,
                  borderRadius: radius.sm,
                  background: theme['btn-primary-bg'],
                  color: theme['btn-primary-text'],
                  padding: `${spacing[2]} ${spacing[4]}`,
                  fontFamily: typography.fonts.sans.family,
                  fontSize: typography.sizes.sm.fontSize,
                  fontWeight: 600,
                  cursor: 'pointer',
                  outlineColor: theme['focus-ring'],
                }}
              >
                Mark as read
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { colors, spacing, typography, radius, buttonTokens, modalTokens } from '../../styles/theme';
import TopBar from '../Layout/TopBar';
import AppModal from '../ui/AppModal';
import NoticeBoard, { NOTICE_ITEMS } from './NoticeBoard';
import ScansCard from './ScansCard';
import NestPerformance from './NestPerformance';
import AccountStats from './AccountStats';
import DashboardKpiStrip from './DashboardKpiStrip';

const theme = colors.light;
const NOTICE_READ_KEY = 'midna_notice_read_v1';

export default function Home() {
  const [showNoticeModal, setShowNoticeModal] = useState(false);
  const [quickLinksOpen, setQuickLinksOpen] = useState(false);
  const quickLinkWrapRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const quickLinks = [
    { label: 'My Scan', path: '/mla/scan' },
    { label: 'My Reports', path: '/mla/reports' },
    { label: 'My Ledger', path: '/mla/ledger' },
    { label: 'My Profile', path: '/mla/profile' },
  ];

  useEffect(() => {
    const readStatus = localStorage.getItem(NOTICE_READ_KEY);
    if (readStatus === 'true') return;

    const timer = window.setTimeout(() => {
      setShowNoticeModal(true);
    }, 1200);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (!quickLinkWrapRef.current?.contains(event.target as Node)) {
        setQuickLinksOpen(false);
      }
    };
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
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
        <div
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing[6] }}
        >
          <h1
            style={{
              fontSize: typography.sizes.xl.fontSize,
              fontWeight: typography.fonts.heading.fontWeight,
              fontFamily: typography.fonts.heading.family,
              margin: 0,
            }}
          >
            My Home
          </h1>
          <div ref={quickLinkWrapRef} style={{ position: 'relative' }}>
            <button
              type="button"
              onClick={() => setQuickLinksOpen((v) => !v)}
              style={{
                border: 'none',
                borderRadius: radius.md,
                background: theme['btn-primary-bg'],
                color: theme['btn-primary-text'],
                fontSize: typography.sizes.sm.fontSize,
                fontWeight: 600,
                fontFamily: typography.fonts.sans.family,
                padding: `${spacing[3]} ${spacing[5]}`,
                cursor: 'pointer',
                boxShadow: '0 8px 18px rgba(147, 32, 122, 0.22)',
              }}
            >
              Quick Links
            </button>
            {quickLinksOpen ? (
              <div
                role="menu"
                style={{
                  position: 'absolute',
                  right: 0,
                  top: 'calc(100% + 8px)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'stretch',
                  width: 'fit-content',
                  minWidth: 'min-content',
                  maxWidth: 'calc(100vw - 20px)',
                  background: theme['bg-surface'],
                  border: `1px solid ${theme.border}`,
                  borderRadius: radius.md,
                  boxShadow: '0 16px 34px rgba(15, 23, 42, 0.18)',
                  overflow: 'hidden',
                  zIndex: 20,
                  padding: spacing[2],
                }}
              >
                {quickLinks.map((item, idx) => (
                  <button
                    key={item.path}
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setQuickLinksOpen(false);
                      navigate(item.path);
                    }}
                    style={{
                      display: 'block',
                      textAlign: 'left',
                      border: 'none',
                      borderRadius: radius.sm,
                      background: theme['bg-surface'],
                      padding: `${spacing[2]} ${spacing[4]}`,
                      fontSize: typography.sizes.sm.fontSize,
                      fontWeight: 600,
                      fontFamily: typography.fonts.sans.family,
                      color: theme['text-primary'],
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      marginBottom: idx < quickLinks.length - 1 ? spacing[1] : 0,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = theme['primary-soft'];
                      e.currentTarget.style.color = theme.primary;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = theme['bg-surface'];
                      e.currentTarget.style.color = theme['text-primary'];
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>

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
          <div style={{ gridColumn: '1 / 3' }}>
            <ScansCard />
          </div>
          <div style={{ gridColumn: 3, gridRow: '1 / -1', alignSelf: 'stretch', minHeight: 0, display: 'flex', flexDirection: 'column' }}>
            <NoticeBoard />
          </div>
          <div style={{ gridColumn: '1 / 3' }}>
            <NestPerformance />
          </div>
        </div>
      </main>

      <AppModal
        open={showNoticeModal}
        onClose={() => setShowNoticeModal(false)}
        titleId="notice-unread-title"
        ariaLabel="Unread notice board alerts"
        size="xl"
        maxHeight="86vh"
        headerContent={
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: spacing[3],
            }}
          >
            <AlertCircle size={22} color={theme.error} style={{ flexShrink: 0, marginTop: 2 }} />
            <div>
              <h2
                id="notice-unread-title"
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
                  fontFamily: typography.fonts.sans.family,
                }}
              >
                Please review these important updates before continuing.
              </p>
            </div>
          </div>
        }
        footer={
          <>
            <button
              type="button"
              onClick={() => setShowNoticeModal(false)}
              style={{
                height: buttonTokens.height.md,
                padding: buttonTokens.padding.md,
                borderRadius: radius.pill,
                border: `1px solid ${theme.border}`,
                background: theme['bg-surface'],
                color: theme['text-secondary'],
                fontFamily: typography.fonts.sans.family,
                fontSize: typography.sizes.sm.fontSize,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Remind me later
            </button>
            <button
              type="button"
              onClick={handleMarkAsRead}
              style={{
                height: buttonTokens.height.md,
                padding: buttonTokens.padding.md,
                borderRadius: radius.pill,
                border: 'none',
                background: theme['btn-primary-bg'],
                color: theme['btn-primary-text'],
                fontFamily: typography.fonts.sans.family,
                fontSize: typography.sizes.sm.fontSize,
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: modalTokens.primaryActionBoxShadow,
              }}
            >
              Mark as read
            </button>
          </>
        }
      >
        <div
          style={{
            display: 'grid',
            gap: spacing[3],
            margin: 0,
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
      </AppModal>
    </div>
  );
}

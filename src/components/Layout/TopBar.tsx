import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  House,
  Users,
  ChartColumn,
  BookMarked,
  FolderCode,
  BookOpenCheck,
  BookUser,
  UserStar,
  User,
  ShieldCheck,
  Laptop,
  Bell,
  IndianRupee,
  DollarSign,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import { colors, spacing, typography } from '../../styles/theme';
import logo from '../../assets/Name_only.png';

const theme = colors.light;

const ICON_SIZE = 18;

const navItems = [
  { label: 'My Home', Icon: House, path: '/home' },
  { label: 'MLA', Icon: Users, path: '/mla' },
  { label: 'Process', Icon: ChartColumn, path: '/process' },
  { label: 'Resources', Icon: BookMarked, path: '/resources' },
  { label: 'Softwares', Icon: FolderCode, path: '/softwares' },
  { label: 'Live Coach', Icon: BookOpenCheck, path: '/home' },
  { label: 'Mentor', Icon: BookUser, path: '/mentor' },
  { label: 'Admin', Icon: ShieldCheck, path: '/admin' },
  { label: 'Master', Icon: Laptop, path: '/master' },
  { label: 'Expert', Icon: UserStar, path: '/home' },
];

/** Only one nav item should read as “active” per route (many links still point to /home as placeholders). */
function isNavActive(item: { label: string; path: string }, pathname: string): boolean {
  if (item.label === 'My Home') return pathname === '/home';
  if (item.path === '/mla') return pathname.startsWith('/mla');
  if (item.path === '/process') return pathname.startsWith('/process');
  if (item.path === '/resources') return pathname === '/resources';
  if (item.path === '/softwares') return pathname === '/softwares';
  if (item.path === '/mentor') return pathname.startsWith('/mentor');
  if (item.path === '/admin') return pathname.startsWith('/admin');
  if (item.path === '/master') return pathname.startsWith('/master');
  return false;
}

const inactiveColor = theme['text-secondary'];

const INR_ALERTS = [
  { label: 'Vanitha Vimal (HLH)', value: -201 },
  { label: 'Vanitha Venkatasubbu', value: -401 },
  { label: 'Devi PL', value: -76 },
];

const USD_ALERTS = [
  { label: 'Global Research Desk', value: -42 },
  { label: 'Cloud Credits', value: -17 },
];

const NOTIFICATION_ALERTS = [
  { label: 'Sureshbabu L', value: 559 },
  { label: 'Skill Masters Academy', value: 708 },
  { label: '2 reports pending review', value: null },
  { label: '1 upload needs reassignment', value: null },
  { label: 'MIS sync completed', value: null },
];

type TopStatusKey = 'inr' | 'usd' | 'alerts';

export default function TopBar() {
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);
  const [expandedSection, setExpandedSection] = useState<TopStatusKey | null>(null);
  const [showProfileCard, setShowProfileCard] = useState(false);
  const statusWrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!showNotifications) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowNotifications(false);
        setShowProfileCard(false);
      }
    };

    const onPointerDown = (event: MouseEvent) => {
      if (!statusWrapRef.current?.contains(event.target as Node)) {
        setShowNotifications(false);
        setShowProfileCard(false);
      }
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onPointerDown);
    };
  }, [showNotifications, showProfileCard]);

  const statusConfig: {
    key: TopStatusKey;
    label: string;
    Icon: typeof Bell;
    count: number;
    badgeColor: string;
    rows: { label: string; value: number | null }[];
  }[] = [
    { key: 'inr', label: 'INR Balance', Icon: IndianRupee, count: 0, badgeColor: theme.error, rows: INR_ALERTS },
    { key: 'usd', label: 'USD Balance', Icon: DollarSign, count: 0, badgeColor: theme.error, rows: USD_ALERTS },
    {
      key: 'alerts',
      label: 'Notifications',
      Icon: Bell,
      count: NOTIFICATION_ALERTS.length,
      badgeColor: theme.warning,
      rows: NOTIFICATION_ALERTS,
    },
  ];
  const totalNotificationCount = statusConfig.reduce((sum, item) => sum + item.count, 0);

  return (
    <>
      <header
        style={{
          position: 'relative',
          background: theme['bg-surface'],
          borderBottom: `1px solid ${theme.border}`,
          padding: `${spacing[3]} ${spacing[6]}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            flexShrink: 0,
          }}
        >
          <img
            src={logo}
            alt="Midna Global"
            style={{
              height: 52,
              width: 'auto',
              objectFit: 'contain',
            }}
          />
        </div>
        <nav
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'nowrap',
            gap: spacing[4],
          }}
        >
          {navItems.map((item) => {
            const Icon = item.Icon;
            const isActive = isNavActive(item, location.pathname);
            return (
              <NavLink
                key={item.label}
                to={item.path}
                end={item.label === 'My Home'}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = theme.primary;
                  const iconSpan = e.currentTarget.querySelector('span:first-of-type');
                  if (iconSpan) (iconSpan as HTMLElement).style.color = theme.primary;
                }}
                onMouseLeave={(e) => {
                  const active = isNavActive(item, location.pathname);
                  e.currentTarget.style.color = active ? theme.primary : inactiveColor;
                  const iconSpan = e.currentTarget.querySelector('span:first-of-type');
                  if (iconSpan)
                    (iconSpan as HTMLElement).style.color = active ? theme.primary : inactiveColor;
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexShrink: 0,
                  gap: spacing[1],
                  textDecoration: 'none',
                  cursor: 'pointer',
                  padding: `${spacing[2]} ${spacing[2]}`,
                  fontFamily: typography.fonts.sans.family,
                  fontSize: typography.sizes.sm.fontSize,
                  color: isActive ? theme.primary : inactiveColor,
                  whiteSpace: 'nowrap',
                }}
              >
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    color: isActive ? theme.primary : inactiveColor,
                  }}
                >
                  <Icon size={ICON_SIZE} strokeWidth={2} />
                </span>
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
        <div
          style={{
            position: 'absolute',
            right: spacing[6],
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            alignItems: 'center',
            gap: spacing[2],
          }}
          ref={statusWrapRef}
        >
          <div
            onMouseEnter={() => {
              setShowProfileCard(true);
              setShowNotifications(false);
            }}
            onMouseLeave={() => setShowProfileCard(false)}
            style={{ position: 'relative' }}
          >
            <button
              type="button"
              aria-label="Open profile details"
              onClick={() => {
                setShowProfileCard((prev) => !prev);
                setShowNotifications(false);
              }}
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                border: `1px solid ${showProfileCard ? theme.primary : theme.border}`,
                background: showProfileCard ? theme['primary-soft'] : theme.primary,
                color: theme['text-inverse'],
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                outlineColor: theme['focus-ring'],
                transition: 'all 0.15s ease',
                flexShrink: 0,
              }}
            >
              <User
                size={20}
                color={showProfileCard ? theme.primary : theme['text-inverse']}
                strokeWidth={2}
              />
            </button>

            {showProfileCard ? (
              <div
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  right: 0,
                  width: 220,
                  background: theme['bg-surface'],
                  border: `1px solid ${theme.border}`,
                  borderRadius: 12,
                  boxShadow: '0 10px 24px rgba(0, 0, 0, 0.12)',
                  padding: spacing[3],
                  zIndex: 50,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: spacing[2] }}>
                  <div
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: '50%',
                      background: theme.primary,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <User size={18} color={theme['text-inverse']} strokeWidth={2} />
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: typography.sizes.sm.fontSize,
                        fontWeight: 600,
                        fontFamily: typography.fonts.sans.family,
                        color: theme['text-primary'],
                        lineHeight: 1.2,
                      }}
                    >
                      User Name
                    </div>
                    <div
                      style={{
                        fontSize: typography.sizes.xs.fontSize,
                        color: theme['text-secondary'],
                        fontFamily: typography.fonts.sans.family,
                      }}
                    >
                      Profile
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
          <button
            type="button"
            aria-label="Open notifications"
            onClick={() => {
              setShowNotifications((prev) => !prev);
              setShowProfileCard(false);
            }}
            style={{
              position: 'relative',
              width: 34,
              height: 34,
              borderRadius: '50%',
              border: `1px solid ${theme.primary}`,
              background: showNotifications ? theme['primary-soft'] : theme['bg-surface'],
              color: theme.primary,
              fontFamily: typography.fonts.sans.family,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              outlineColor: theme['focus-ring'],
              transition: 'all 0.15s ease',
              flexShrink: 0,
            }}
          >
            <Bell size={18} strokeWidth={2} />
            <span
              style={{
                position: 'absolute',
                top: -7,
                right: -7,
                minWidth: 22,
                height: 22,
                borderRadius: '9999px',
                padding: `0 ${spacing[1]}`,
                background: '#F59E0B',
                color: theme['text-inverse'],
                fontSize: typography.sizes.sm.fontSize,
                fontWeight: 700,
                display: 'grid',
                placeItems: 'center',
                border: `2px solid ${theme['bg-surface']}`,
              }}
            >
              {totalNotificationCount}
            </span>
          </button>

          {showNotifications ? (
            <div
              style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                right: 0,
                width: 360,
                background: theme['bg-surface'],
                border: `1px solid ${theme.border}`,
                borderRadius: 12,
                boxShadow: '0 10px 28px rgba(0, 0, 0, 0.12)',
                padding: spacing[3],
                zIndex: 50,
              }}
            >
              <div
                style={{
                  fontSize: typography.sizes.xl.fontSize,
                  fontWeight: typography.fonts.heading.fontWeight,
                  fontFamily: typography.fonts.heading.family,
                  color: theme['text-primary'],
                  marginBottom: spacing[2],
                }}
              >
                Notifications
              </div>
              <div style={{ display: 'grid', gap: spacing[2] }}>
                {statusConfig.map(({ key, label, Icon, count, badgeColor, rows }) => {
                  const isExpanded = expandedSection === key;
                  return (
                    <div
                      key={key}
                      style={{
                        border: `1px solid ${theme.border}`,
                        borderRadius: 10,
                        overflow: 'hidden',
                        background: theme['bg-surface'],
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => setExpandedSection((prev) => (prev === key ? null : key))}
                        style={{
                          width: '100%',
                          border: 'none',
                          background: theme['bg-base'],
                          padding: `${spacing[2]} ${spacing[3]}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: spacing[2],
                          cursor: 'pointer',
                          outlineColor: theme['focus-ring'],
                        }}
                      >
                        <span
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: spacing[2],
                            color: theme['text-primary'],
                            fontFamily: typography.fonts.sans.family,
                            fontSize: typography.sizes.sm.fontSize,
                            fontWeight: 600,
                          }}
                        >
                          <Icon size={18} strokeWidth={2} />
                          {label}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: spacing[2] }}>
                          <span
                            style={{
                              minWidth: 22,
                              height: 22,
                              borderRadius: '9999px',
                              padding: `0 ${spacing[1]}`,
                              background: badgeColor,
                              color: theme['text-inverse'],
                              fontSize: typography.sizes.xs.fontSize,
                              fontWeight: 700,
                              display: 'grid',
                              placeItems: 'center',
                            }}
                          >
                            {count}
                          </span>
                          {isExpanded ? (
                            <ChevronDown size={16} strokeWidth={2} color={theme['text-secondary']} />
                          ) : (
                            <ChevronRight size={16} strokeWidth={2} color={theme['text-secondary']} />
                          )}
                        </span>
                      </button>

                      {isExpanded ? (
                        <div style={{ display: 'grid', gap: spacing[2], padding: spacing[2] }}>
                          {rows.map((row) => {
                            const isNegative = typeof row.value === 'number' && row.value < 0;
                            const isPositive = typeof row.value === 'number' && row.value > 0;
                            return (
                              <div
                                key={`${key}-${row.label}`}
                                style={{
                                  borderRadius: 8,
                                  padding: `${spacing[2]} ${spacing[3]}`,
                                  background: isNegative
                                    ? theme['error-bg']
                                    : isPositive
                                      ? theme['info-bg']
                                      : theme['bg-base'],
                                  border: `1px solid ${
                                    isNegative ? '#FECACA' : isPositive ? '#BAE6FD' : theme.border
                                  }`,
                                }}
                              >
                                <div
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    gap: spacing[3],
                                    color: theme['text-primary'],
                                    fontSize: typography.sizes.sm.fontSize,
                                  }}
                                >
                                  <span>{row.label}</span>
                                  {typeof row.value === 'number' ? (
                                    <strong style={{ color: isNegative ? theme.error : theme.info }}>
                                      {row.value}
                                    </strong>
                                  ) : null}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>
      </header>
    </>
  );
}

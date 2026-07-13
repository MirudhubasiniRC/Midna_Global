import { Fragment } from 'react';
import { colors, layoutTokens, sidebarTokens, spacing } from '../../styles/theme';
import { navItems, type AppView } from './navItems';
import logo from '../../assets/high-resolution-color-logo.png';

const theme = colors.light;

type SidebarProps = {
  collapsed: boolean;
  onToggle: () => void;
  activeView: AppView;
  onNavigate: (view: AppView) => void;
  onLogout?: () => void;
};

export function Sidebar({ collapsed, onToggle, activeView, onNavigate, onLogout }: SidebarProps) {
  const width = collapsed ? layoutTokens.sidebarCollapsedWidth : layoutTokens.sidebarWidth;

  return (
    <aside
      className="sidebar sidebar-desktop"
      style={{
        width,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        padding: collapsed
          ? `calc(${layoutTokens.contentPaddingTop} - ${spacing[3]}) ${spacing[2]} ${spacing[5]}`
          : `calc(${layoutTokens.contentPaddingTop} - ${spacing[3]}) ${spacing[3]} ${spacing[5]}`,
        alignSelf: 'stretch',
        background: sidebarTokens.background,
        transition: 'width 0.2s ease, padding 0.2s ease',
        overflow: 'visible',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'space-between',
          gap: spacing[2],
          padding: collapsed ? 0 : `0 ${spacing[2]}`,
          marginBottom: spacing[6],
          minHeight: 40,
        }}
      >
        <div
          style={{
            height: 42,
            width: collapsed ? 42 : 102,
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            flexShrink: 0,
          }}
        >
          <img
            src={logo}
            alt="Midna"
            style={{
              height: 42,
              width: 102,
              maxWidth: 102,
              objectFit: 'cover',
              objectPosition: 'center',
              flexShrink: 0,
              userSelect: 'none',
            }}
          />
        </div>
        {!collapsed && (
          <button
            type="button"
            className="btn-icon"
            aria-label="Collapse sidebar"
            onClick={onToggle}
            style={{ flexShrink: 0, width: 32, height: 32 }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="3" />
              <path d="M9 3v18" />
            </svg>
          </button>
        )}
      </div>

      {collapsed && (
        <button
          type="button"
          className="btn-icon"
          aria-label="Expand sidebar"
          onClick={onToggle}
          style={{ width: 40, height: 40, margin: `0 auto ${spacing[5]}` }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="3" />
            <path d="M9 3v18" />
          </svg>
        </button>
      )}

      <nav
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
          flex: 1,
          minHeight: 0,
          /* Logo/toggle position is separately tuned via the header's own padding above —
             don't touch that. This margin only controls the nav list's own position. */
          marginTop: collapsed ? 0 : spacing[8],
          overflowY: 'auto',
          overflowX: 'visible',
        }}
      >
        {navItems.map((item, index) => {
          const active = item.id === activeView;
          const { Icon } = item;
          const isNewSection = index > 0 && navItems[index - 1].section !== item.section;
          return (
            <Fragment key={item.id}>
              {isNewSection && !collapsed && (
                <p
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: theme['text-muted'],
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    padding: `0 ${spacing[3]}`,
                    margin: `${spacing[4]} 0 ${spacing[2]}`,
                  }}
                >
                  {item.section}
                </p>
              )}
              <button
                type="button"
                onClick={() => onNavigate(item.id)}
                className={`sidebar-nav-item${active ? ' is-active' : ''}`}
                aria-label={item.label}
                style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: collapsed ? 'center' : 'flex-start',
                  gap: 12,
                  width: '100%',
                  minHeight: 42,
                  padding: collapsed ? '10px 8px' : '10px 12px',
                  border: 'none',
                  borderRadius: sidebarTokens.itemRadius,
                  background: 'transparent',
                  color: active ? theme['text-primary'] : '#565C78',
                  fontSize: 15,
                  fontWeight: active ? 700 : 500,
                  letterSpacing: '-0.01em',
                  textAlign: 'left',
                  cursor: 'pointer',
                  flexShrink: 0,
                }}
              >
                <span
                  className="sidebar-nav-icon"
                  style={{ width: 20, height: 20, display: 'grid', placeItems: 'center', flexShrink: 0 }}
                >
                  <Icon size={19} fill="none" stroke="currentColor" strokeWidth={1.8} />
                </span>
                {!collapsed && <span className="sidebar-nav-label">{item.label}</span>}
                {collapsed && <span className="sidebar-tooltip">{item.label}</span>}
              </button>
            </Fragment>
          );
        })}
      </nav>

      <div
        style={{
          borderTop: `1px solid ${theme.divider}`,
          paddingTop: spacing[3],
          marginTop: spacing[3],
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}
      >
        <button
          type="button"
          onClick={onLogout}
          className="sidebar-nav-item sidebar-logout-item"
          aria-label="Log out"
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'flex-start',
            gap: 12,
            width: '100%',
            padding: collapsed ? '10px 8px' : '10px 12px',
            border: 'none',
            borderRadius: sidebarTokens.itemRadius,
            background: 'transparent',
            color: '#565C78',
            fontSize: 15,
            fontWeight: 500,
            letterSpacing: '-0.01em',
            textAlign: 'left',
            cursor: 'pointer',
          }}
        >
          <span style={{ width: 20, height: 20, display: 'grid', placeItems: 'center', flexShrink: 0 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <path d="M16 17l5-5-5-5" />
              <path d="M21 12H9" />
            </svg>
          </span>
          {!collapsed && <span>Log out</span>}
          {collapsed && <span className="sidebar-tooltip">Log out</span>}
        </button>
      </div>
    </aside>
  );
}

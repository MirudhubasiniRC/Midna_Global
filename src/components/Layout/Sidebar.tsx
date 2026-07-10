import {
  colors,
  layoutTokens,
  sidebarTokens,
  spacing,
} from '../../styles/theme';
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
  const profileActive = activeView === 'profile';

  return (
    <aside
      className={`panel sidebar sidebar-desktop ${collapsed ? 'sidebar--collapsed' : 'sidebar--expanded'}`}
      style={{
        width,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        padding: collapsed ? `${spacing[5]} ${spacing[2]}` : `${spacing[5]} ${spacing[4]}`,
        alignSelf: 'stretch',
        transition: 'width 0.2s ease, padding 0.2s ease',
        overflow: 'visible',
      }}
    >
      <div
        className="sidebar-brand"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: spacing[2],
          padding: collapsed ? 0 : `0 ${spacing[2]}`,
          marginBottom: spacing[6],
          minHeight: 40,
        }}
      >
        <div
          style={{
            height: 36,
            width: collapsed ? 36 : 88,
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            flexShrink: 0,
          }}
        >
          <img
            src={logo}
            alt="Midna"
            className="sidebar-logo"
            style={{
              height: 36,
              width: 88,
              maxWidth: 88,
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
            className="btn-icon sidebar-collapse-btn"
            aria-label="Collapse sidebar"
            onClick={onToggle}
            style={{
              flexShrink: 0,
              width: 32,
              height: 32,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 6 9 12l6 6" />
            </svg>
          </button>
        )}
      </div>

      {collapsed && (
        <button
          type="button"
          className="btn-icon sidebar-expand-btn"
          aria-label="Expand sidebar"
          onClick={onToggle}
          style={{ width: 40, height: 40, margin: `0 auto ${spacing[5]}` }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m9 6 6 6-6 6" />
          </svg>
        </button>
      )}

      {!collapsed && (
        <p
          className="sidebar-menu-label"
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: theme['text-muted'],
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            padding: `0 ${spacing[3]}`,
            marginBottom: spacing[3],
          }}
        >
          Menu
        </p>
      )}

      <nav
        className="sidebar-nav"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          flex: 1,
        }}
      >
        {navItems.map((item) => {
          const active = item.id === activeView;
          const { Icon } = item;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className={`sidebar-nav-item${active ? ' is-active' : ''}`}
              title={collapsed ? item.label : undefined}
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: collapsed ? 'center' : 'flex-start',
                gap: 14,
                width: '100%',
                minHeight: 40,
                padding: collapsed ? '10px 8px' : '10px 14px',
                border: 'none',
                borderRadius: sidebarTokens.itemRadius,
                color: active ? theme['text-primary'] : theme['text-secondary'],
                fontSize: 14,
                fontWeight: active ? 600 : 500,
                letterSpacing: '-0.01em',
                textAlign: 'left',
                cursor: 'pointer',
                overflow: 'visible',
              }}
            >
              <span
                className="sidebar-nav-icon"
                style={{
                  width: 22,
                  height: 22,
                  display: 'grid',
                  placeItems: 'center',
                  background: 'transparent',
                  color: active ? theme.primary : theme['text-muted'],
                  flexShrink: 0,
                }}
              >
                <Icon
                  size={20}
                  fill={active ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  strokeWidth={active ? 1.25 : 1.8}
                />
              </span>
              {!collapsed && <span className="sidebar-nav-label">{item.label}</span>}
            </button>
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
          onClick={() => onNavigate('profile')}
          className={`sidebar-profile-item${profileActive ? ' is-active' : ''}`}
          title={collapsed ? 'My Profile' : undefined}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'flex-start',
            gap: 10,
            width: '100%',
            padding: collapsed ? '8px' : '10px 12px',
            borderRadius: sidebarTokens.itemRadius,
            textAlign: 'left',
            cursor: 'pointer',
          }}
        >
          <span
            style={{
              width: 34,
              height: 34,
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${theme.primary}, ${theme['primary-dark']})`,
              color: '#fff',
              display: 'grid',
              placeItems: 'center',
              fontWeight: 700,
              fontSize: 14,
              flexShrink: 0,
            }}
          >
            U
          </span>
          {!collapsed && (
            <span style={{ lineHeight: 1.35, minWidth: 0 }}>
              <span
                style={{
                  display: 'block',
                  fontSize: 15,
                  fontWeight: 700,
                  color: theme['text-primary'],
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                User
              </span>
              <span
                style={{
                  display: 'block',
                  fontSize: 13,
                  color: theme['text-secondary'],
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                user@midna.com
              </span>
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={onLogout}
          className="sidebar-logout-item"
          title={collapsed ? 'Log out' : undefined}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'flex-start',
            gap: 14,
            width: '100%',
            padding: collapsed ? '10px 8px' : '10px 14px',
            border: 'none',
            borderRadius: sidebarTokens.itemRadius,
            background: 'transparent',
            color: theme['text-secondary'],
            fontSize: 14,
            fontWeight: 500,
            letterSpacing: '-0.01em',
            textAlign: 'left',
            cursor: 'pointer',
          }}
        >
          <span style={{ width: 22, height: 22, display: 'grid', placeItems: 'center', flexShrink: 0 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <path d="M16 17l5-5-5-5" />
              <path d="M21 12H9" />
            </svg>
          </span>
          {!collapsed && <span>Log out</span>}
        </button>
      </div>
    </aside>
  );
}

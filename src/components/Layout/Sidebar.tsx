import { LuLayoutDashboard } from 'react-icons/lu';
import {
  colors,
  layoutTokens,
  sidebarTokens,
  spacing,
  typography,
} from '../../styles/theme';

const theme = colors.light;

export const navItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    Icon: LuLayoutDashboard,
  },
] as const;

type SidebarProps = {
  collapsed: boolean;
  onToggle: () => void;
};

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const width = collapsed ? layoutTokens.sidebarCollapsedWidth : layoutTokens.sidebarWidth;

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
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: collapsed ? 0 : `0 ${spacing[2]}`,
          marginBottom: spacing[8],
          minHeight: 40,
        }}
      >
        <span
          className="sidebar-logo"
          style={{
            fontFamily: typography.fonts.heading.family,
            fontSize: collapsed ? 14 : 20,
            fontWeight: 700,
            letterSpacing: '0.08em',
            color: theme['text-primary'],
            userSelect: 'none',
          }}
        >
          {collapsed ? 'M' : 'MIDNA'}
        </span>
        {!collapsed && (
          <button
            type="button"
            className="btn-icon sidebar-collapse-btn"
            aria-label="Collapse sidebar"
            onClick={onToggle}
            style={{
              position: 'absolute',
              right: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              width: 32,
              height: 32,
              flexShrink: 0,
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
          const active = item.id === 'dashboard';
          const { Icon } = item;
          return (
            <button
              key={item.id}
              type="button"
              className={`sidebar-nav-item${active ? ' is-active' : ''}`}
              title={collapsed ? item.label : undefined}
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: collapsed ? 'center' : 'flex-start',
                gap: 14,
                width: '100%',
                minHeight: 44,
                padding: collapsed ? '12px 8px' : '12px 14px 12px 18px',
                border: 'none',
                borderRadius: sidebarTokens.itemRadius,
                background: 'transparent',
                color: active ? theme['text-primary'] : theme['text-muted'],
                fontSize: 15,
                fontWeight: active ? 700 : 500,
                letterSpacing: '-0.01em',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'color 0.15s ease',
                overflow: 'visible',
              }}
            >
              {active && (
                <span
                  className="sidebar-active-bar"
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: 5,
                    height: 28,
                    borderRadius: '0 999px 999px 0',
                    background: theme.primary,
                  }}
                />
              )}
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
    </aside>
  );
}

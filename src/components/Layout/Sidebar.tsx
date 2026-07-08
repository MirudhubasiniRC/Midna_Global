import {
  brandScale,
  colors,
  layoutTokens,
  radius,
  shadow,
  sidebarTokens,
  spacing,
} from '../../styles/theme';

const theme = colors.light;

type SidebarProps = {
  collapsed: boolean;
  onToggle: () => void;
};

const navItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
];

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const width = collapsed ? layoutTokens.sidebarCollapsedWidth : layoutTokens.sidebarWidth;

  return (
    <aside
      className="panel"
      style={{
        width,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        padding: collapsed ? `${spacing[5]} ${spacing[2]}` : `${spacing[5]} ${spacing[4]}`,
        alignSelf: 'stretch',
        transition: 'width 0.2s ease, padding 0.2s ease',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'space-between',
          gap: 10,
          padding: collapsed ? 0 : `0 ${spacing[2]}`,
          marginBottom: spacing[8],
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${brandScale.base}, ${brandScale.dark})`,
              display: 'grid',
              placeItems: 'center',
              color: '#fff',
              fontWeight: 700,
              fontSize: 16,
              boxShadow: shadow.soft,
              flexShrink: 0,
            }}
          >
            M
          </div>
          {!collapsed && (
            <span
              style={{
                fontSize: 22,
                fontWeight: 700,
                letterSpacing: '-0.03em',
                color: theme['text-primary'],
              }}
            >
              Midna
            </span>
          )}
        </div>
        {!collapsed && (
          <button
            type="button"
            className="btn-icon"
            aria-label="Collapse sidebar"
            onClick={onToggle}
            style={{ width: 32, height: 32 }}
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
          className="btn-icon"
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

      <nav style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
        {navItems.map((item) => (
          <button
            key={item.id}
            type="button"
            title={collapsed ? item.label : undefined}
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: collapsed ? 'center' : 'flex-start',
              gap: 12,
              width: '100%',
              padding: collapsed ? 10 : '10px 12px',
              border: 'none',
              borderRadius: sidebarTokens.itemRadius,
              background: theme['primary-soft'],
              color: theme.primary,
              fontSize: 14,
              fontWeight: 600,
              textAlign: 'left',
            }}
          >
            {!collapsed && (
              <span
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 8,
                  bottom: 8,
                  width: sidebarTokens.activeBarWidth,
                  borderRadius: radius.pill,
                  background: theme.primary,
                }}
              />
            )}
            <span
              style={{
                width: sidebarTokens.iconChipSize,
                height: sidebarTokens.iconChipSize,
                borderRadius: sidebarTokens.iconChipRadius,
                display: 'grid',
                placeItems: 'center',
                background: theme.primary,
                color: '#fff',
                flexShrink: 0,
              }}
            >
              {item.icon}
            </span>
            {!collapsed && <span>{item.label}</span>}
          </button>
        ))}
      </nav>
    </aside>
  );
}

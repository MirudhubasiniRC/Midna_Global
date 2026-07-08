import { colors, sidebarTokens, spacing, typography } from '../../styles/theme';
import { navItems } from './Sidebar';

const theme = colors.light;

type MobileNavDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileNavDrawer({ open, onClose }: MobileNavDrawerProps) {
  return (
    <div className={`mobile-nav ${open ? 'is-open' : ''}`} aria-hidden={!open}>
      <button type="button" className="mobile-nav-backdrop" aria-label="Close menu" onClick={onClose} />
      <aside className="mobile-nav-panel panel" role="dialog" aria-modal="true" aria-label="Navigation menu">
        <div className="mobile-nav-header">
          <span
            style={{
              fontFamily: typography.fonts.heading.family,
              fontSize: 20,
              fontWeight: 700,
              letterSpacing: '0.08em',
              color: theme['text-primary'],
            }}
          >
            MIDNA
          </span>
          <button type="button" className="btn-icon" aria-label="Close menu" onClick={onClose}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <p
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: theme['text-muted'],
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            padding: `0 ${spacing[1]}`,
            marginBottom: spacing[3],
          }}
        >
          Menu
        </p>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {navItems.map((item) => {
            const active = item.id === 'dashboard';
            const { Icon } = item;
            return (
              <button
                key={item.id}
                type="button"
                className={`sidebar-nav-item${active ? ' is-active' : ''}`}
                onClick={onClose}
                style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  width: '100%',
                  minHeight: 48,
                  padding: '12px 14px 12px 18px',
                  border: 'none',
                  borderRadius: sidebarTokens.itemRadius,
                  background: 'transparent',
                  color: active ? theme['text-primary'] : theme['text-muted'],
                  fontSize: 15,
                  fontWeight: active ? 700 : 500,
                  letterSpacing: '-0.01em',
                  textAlign: 'left',
                  cursor: 'pointer',
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
                  style={{
                    width: 22,
                    height: 22,
                    display: 'grid',
                    placeItems: 'center',
                    color: active ? theme.primary : theme['text-muted'],
                  }}
                >
                  <Icon
                    size={20}
                    fill={active ? 'currentColor' : 'none'}
                    stroke="currentColor"
                    strokeWidth={active ? 1.25 : 1.8}
                  />
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <p
          style={{
            marginTop: 'auto',
            paddingTop: spacing[6],
            fontSize: 12,
            color: theme['text-muted'],
            textAlign: 'center',
          }}
        >
          Midna Global
        </p>
      </aside>
    </div>
  );
}

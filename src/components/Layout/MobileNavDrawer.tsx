import { colors, sidebarTokens, spacing } from '../../styles/theme';
import { navItems, type AppView } from './navItems';
import logo from '../../assets/high-resolution-color-logo.png';

const theme = colors.light;

type MobileNavDrawerProps = {
  open: boolean;
  onClose: () => void;
  activeView: AppView;
  onNavigate: (view: AppView) => void;
  onLogout?: () => void;
};

export function MobileNavDrawer({ open, onClose, activeView, onNavigate, onLogout }: MobileNavDrawerProps) {
  const profileActive = activeView === 'profile';

  const go = (view: AppView) => {
    onNavigate(view);
    onClose();
  };

  return (
    <div className={`mobile-nav ${open ? 'is-open' : ''}`} aria-hidden={!open}>
      <button type="button" className="mobile-nav-backdrop" aria-label="Close menu" onClick={onClose} />
      <aside className="mobile-nav-panel" role="dialog" aria-modal="true" aria-label="Navigation menu">
        <div className="mobile-nav-header">
          <div style={{ height: 36, width: 88, overflow: 'hidden', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <img
              src={logo}
              alt="Midna"
              style={{ height: 36, width: 88, maxWidth: 88, objectFit: 'cover', objectPosition: 'center', flexShrink: 0 }}
            />
          </div>
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
            const active = item.id === activeView;
            const { Icon } = item;
            return (
              <button
                key={item.id}
                type="button"
                className={`sidebar-nav-item${active ? ' is-active' : ''}`}
                onClick={() => go(item.id)}
                style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  width: '100%',
                  minHeight: 44,
                  padding: '10px 14px',
                  border: 'none',
                  borderRadius: sidebarTokens.itemRadius,
                  color: active ? theme['text-primary'] : theme['text-secondary'],
                  fontSize: 15,
                  fontWeight: active ? 600 : 500,
                  letterSpacing: '-0.01em',
                  textAlign: 'left',
                  cursor: 'pointer',
                }}
              >
                <span
                  className="sidebar-nav-icon"
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
                <span className="sidebar-nav-label">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div
          style={{
            marginTop: 'auto',
            borderTop: `1px solid ${theme.divider}`,
            paddingTop: spacing[3],
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}
        >
          <button
            type="button"
            onClick={() => go('profile')}
            className={`sidebar-profile-item${profileActive ? ' is-active' : ''}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              width: '100%',
              padding: '10px 12px',
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
          </button>

          <button
            type="button"
            onClick={() => {
              onLogout?.();
              onClose();
            }}
            className="sidebar-logout-item"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              width: '100%',
              padding: '10px 14px',
              border: 'none',
              borderRadius: sidebarTokens.itemRadius,
              background: 'transparent',
              color: theme['text-secondary'],
              fontSize: 15,
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
            <span>Log out</span>
          </button>
        </div>
      </aside>
    </div>
  );
}

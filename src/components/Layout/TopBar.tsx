import { colors, layoutTokens, shadow, spacing, typography } from '../../styles/theme';

const theme = colors.light;

type TopBarProps = {
  showMenuButton?: boolean;
  onMenuClick?: () => void;
};

export function TopBar({ showMenuButton = false, onMenuClick }: TopBarProps) {
  return (
    <header
      className="panel topbar"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: spacing[3],
        minHeight: layoutTokens.topBarHeight,
        padding: `0 ${spacing[5]}`,
        flexShrink: 0,
      }}
    >
      {showMenuButton && (
        <button
          type="button"
          className="btn-icon topbar-menu-btn"
          aria-label="Open menu"
          onClick={onMenuClick}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
      )}

      <div className="topbar-search">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={theme['text-muted']} strokeWidth="1.8">
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3-3" />
        </svg>
        <input type="search" placeholder="Search…" aria-label="Search" />
        <kbd>⌘F</kbd>
      </div>

      <div className="topbar-actions" style={{ display: 'flex', alignItems: 'center', gap: 10, marginLeft: 'auto' }}>
        <button type="button" className="btn-icon" aria-label="Messages">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M4 6h16v12H4z" />
            <path d="m4 7 8 6 8-6" />
          </svg>
        </button>
        <button type="button" className="btn-icon" aria-label="Notifications" style={{ position: 'relative' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M6 9a6 6 0 0 1 12 0c0 7 3 7 3 7H3s3 0 3-7" />
            <path d="M10 19a2 2 0 0 0 4 0" />
          </svg>
          <span
            style={{
              position: 'absolute',
              top: 8,
              right: 9,
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: theme.primary,
              border: `2px solid ${theme['bg-canvas']}`,
              boxShadow: shadow.soft,
            }}
          />
        </button>

        <div className="topbar-profile">
          <div
            style={{
              width: 40,
              height: 40,
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
          </div>
          <div
            className="topbar-profile-text"
            style={{
              lineHeight: 1.3,
              fontFamily: typography.fonts.sans.family,
            }}
          >
            <div
              style={{
                fontSize: typography.sizes.sm.fontSize,
                lineHeight: '18px',
                fontWeight: 600,
                color: theme['text-primary'],
                letterSpacing: typography.fonts.heading.letterSpacing,
              }}
            >
              User
            </div>
            <div
              style={{
                fontSize: typography.sizes.xs.fontSize,
                lineHeight: typography.sizes.xs.lineHeight,
                fontWeight: 400,
                color: theme['text-muted'],
              }}
            >
              user@midna.com
            </div>
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={theme['text-muted']} strokeWidth="2">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </div>
    </header>
  );
}

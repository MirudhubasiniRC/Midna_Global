import { colors, radius, spacing, shadow } from '../../styles/theme';

const theme = colors.light;

export function TopBar() {
  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: spacing[4],
        padding: `${spacing[4]} 24px`,
        background: theme['bg-surface'],
        borderBottom: `1px solid ${theme.border}`,
        position: 'sticky',
        top: 0,
        zIndex: 20,
      }}
    >
      <div
        style={{
          flex: 1,
          maxWidth: 420,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          height: 44,
          padding: '0 14px',
          borderRadius: radius.md,
          background: theme['bg-base'],
          border: `1px solid ${theme.border}`,
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={theme['text-muted']} strokeWidth="1.8">
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3-3" />
        </svg>
        <input
          type="search"
          placeholder="Search task"
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            background: 'transparent',
            fontSize: 14,
            color: theme['text-primary'],
          }}
        />
        <kbd
          style={{
            fontSize: 11,
            color: theme['text-muted'],
            background: theme['bg-surface'],
            border: `1px solid ${theme.border}`,
            borderRadius: 6,
            padding: '2px 6px',
            fontFamily: 'inherit',
          }}
        >
          ⌘F
        </kbd>
      </div>

      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
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
              border: `2px solid ${theme['bg-surface']}`,
              boxShadow: shadow.soft,
            }}
          />
        </button>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            marginLeft: 6,
            paddingLeft: 12,
            borderLeft: `1px solid ${theme.border}`,
          }}
        >
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
            }}
          >
            TO
          </div>
          <div style={{ lineHeight: 1.25 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: theme['text-primary'] }}>Totok Michael</div>
            <div style={{ fontSize: 12, color: theme['text-muted'] }}>tmichael20@mail.com</div>
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={theme['text-muted']} strokeWidth="2">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </div>
    </header>
  );
}

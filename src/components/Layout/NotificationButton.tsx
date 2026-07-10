import { colors, shadow } from '../../styles/theme';

const theme = colors.light;

export function NotificationButton() {
  return (
    <button
      type="button"
      className="btn-icon"
      aria-label="Notifications"
      style={{ position: 'relative', flexShrink: 0, width: 42, height: 42 }}
    >
      <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M6 9a6 6 0 0 1 12 0c0 7 3 7 3 7H3s3 0 3-7" />
        <path d="M10 19a2 2 0 0 0 4 0" />
      </svg>
      <span
        style={{
          position: 'absolute',
          top: 9,
          right: 10,
          width: 9,
          height: 9,
          borderRadius: '50%',
          background: theme.primary,
          border: `2px solid ${theme['bg-surface']}`,
          boxShadow: shadow.soft,
        }}
      />
    </button>
  );
}

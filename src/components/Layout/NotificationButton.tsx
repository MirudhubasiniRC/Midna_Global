import { colors, shadow } from '../../styles/theme';

const theme = colors.light;

export function NotificationButton() {
  return (
    <button
      type="button"
      className="btn-icon"
      aria-label="Notifications"
      style={{ position: 'relative', flexShrink: 0 }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9a6 6 0 0 1 12 0c0 7 3 7 3 7H3s3 0 3-7" />
        <path d="M10 19a2 2 0 0 0 4 0" />
      </svg>
      <span
        style={{
          position: 'absolute',
          top: 10,
          right: 11,
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: '#FA5252',
          border: `2px solid ${theme['bg-surface']}`,
          boxShadow: shadow.float,
        }}
      />
    </button>
  );
}

import { colors, spacing } from '../../styles/theme';

const theme = colors.light;

export function Reminders() {
  return (
    <section className="area-reminders dash-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h2 className="dash-card-title">Reminders</h2>
        <button type="button" className="btn-icon" aria-label="More">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="5" cy="12" r="1.5" />
            <circle cx="12" cy="12" r="1.5" />
            <circle cx="19" cy="12" r="1.5" />
          </svg>
        </button>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: spacing[3],
          height: 'calc(100% - 40px)',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 14,
            background: theme['primary-soft'],
            color: theme.primary,
            display: 'grid',
            placeItems: 'center',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M15 10l4.55-2.27A1 1 0 0 1 21 8.62v6.76a1 1 0 0 1-1.45.89L15 14" />
            <rect x="3" y="6" width="12" height="12" rx="2" />
          </svg>
        </div>
        <div>
          <h3 style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 6 }}>
            Meeting with Arc Company
          </h3>
          <p style={{ fontSize: 13, color: theme['text-muted'] }}>Time: 02:00 pm – 04:00 pm</p>
        </div>
        <button type="button" className="btn-primary" style={{ width: '100%', marginTop: 8 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 10l4.55-2.27A1 1 0 0 1 21 8.62v6.76a1 1 0 0 1-1.45.89L15 14" />
            <rect x="3" y="6" width="12" height="12" rx="2" />
          </svg>
          Start Meeting
        </button>
      </div>
    </section>
  );
}

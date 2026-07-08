import { brandScale, colors, radius, spacing } from '../../styles/theme';

const theme = colors.light;

export function TimeTracker() {
  return (
    <section
      className="area-tracker"
      style={{
        borderRadius: radius.lg,
        padding: spacing[5],
        minHeight: 180,
        color: '#fff',
        position: 'relative',
        overflow: 'hidden',
        background: `
          radial-gradient(ellipse at 10% 20%, ${brandScale.mid}66, transparent 45%),
          radial-gradient(ellipse at 90% 90%, ${brandScale.base}88, transparent 40%),
          linear-gradient(155deg, ${brandScale.dark} 0%, #1a0a14 55%, #0d0610 100%)
        `,
        border: `1px solid ${brandScale.dark}`,
        boxShadow: '0 8px 28px rgba(139, 33, 84, 0.25)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.4,
          backgroundImage: `
            repeating-linear-gradient(
              120deg,
              transparent 0px,
              transparent 18px,
              ${brandScale.base}33 18px,
              ${brandScale.base}33 20px
            ),
            radial-gradient(circle at 70% 30%, ${brandScale.light}33, transparent 40%)
          `,
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <h2 style={{ fontSize: 16, fontWeight: 600 }}>Time Tracker</h2>
        <button
          type="button"
          aria-label="More"
          style={{
            width: 32,
            height: 32,
            borderRadius: 10,
            border: '1px solid rgba(255,255,255,0.2)',
            background: 'rgba(255,255,255,0.08)',
            color: '#fff',
            display: 'grid',
            placeItems: 'center',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="5" cy="12" r="1.5" />
            <circle cx="12" cy="12" r="1.5" />
            <circle cx="19" cy="12" r="1.5" />
          </svg>
        </button>
      </div>

      <div
        style={{
          position: 'relative',
          marginTop: 28,
          fontSize: 40,
          fontWeight: 700,
          letterSpacing: '0.04em',
          fontVariantNumeric: 'tabular-nums',
          textAlign: 'center',
        }}
      >
        01:24:08
      </div>

      <div
        style={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          gap: 12,
          marginTop: 20,
        }}
      >
        <button
          type="button"
          aria-label="Pause"
          style={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            border: 'none',
            background: 'rgba(255,255,255,0.15)',
            color: '#fff',
            display: 'grid',
            placeItems: 'center',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="5" width="4" height="14" rx="1" />
            <rect x="14" y="5" width="4" height="14" rx="1" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Stop"
          style={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            border: 'none',
            background: theme.error,
            color: '#fff',
            display: 'grid',
            placeItems: 'center',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="6" width="12" height="12" rx="2" />
          </svg>
        </button>
      </div>
    </section>
  );
}

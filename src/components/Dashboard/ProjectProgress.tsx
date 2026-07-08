import { brandScale, colors, spacing } from '../../styles/theme';

const theme = colors.light;

const legend = [
  { label: 'Completed', color: brandScale.dark },
  { label: 'In Progress', color: brandScale.mid },
  { label: 'Pending', color: brandScale.muted, stripe: true },
];

export function ProjectProgress() {
  return (
    <section className="area-progress dash-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <h2 className="dash-card-title">Project Progress</h2>
        <button type="button" className="btn-icon" aria-label="More">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="5" cy="12" r="1.5" />
            <circle cx="12" cy="12" r="1.5" />
            <circle cx="19" cy="12" r="1.5" />
          </svg>
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: `${spacing[2]} 0` }}>
        <svg width="220" height="130" viewBox="0 0 220 130" aria-hidden>
          <defs>
            <pattern id="pendingStripe" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(-45)">
              <rect width="4" height="8" fill={brandScale.muted} />
              <rect x="4" width="4" height="8" fill={theme['bg-muted']} />
            </pattern>
          </defs>
          {/* Track */}
          <path
            d="M20 110 A90 90 0 0 1 200 110"
            fill="none"
            stroke={theme['bg-muted']}
            strokeWidth="18"
            strokeLinecap="round"
          />
          {/* Pending (stripe) — right segment */}
          <path
            d="M20 110 A90 90 0 0 1 200 110"
            fill="none"
            stroke="url(#pendingStripe)"
            strokeWidth="18"
            strokeLinecap="round"
            strokeDasharray="80 220"
            strokeDashoffset="-200"
          />
          {/* In Progress */}
          <path
            d="M20 110 A90 90 0 0 1 200 110"
            fill="none"
            stroke={brandScale.mid}
            strokeWidth="18"
            strokeLinecap="round"
            strokeDasharray="70 230"
            strokeDashoffset="-130"
          />
          {/* Completed */}
          <path
            d="M20 110 A90 90 0 0 1 200 110"
            fill="none"
            stroke={brandScale.dark}
            strokeWidth="18"
            strokeLinecap="round"
            strokeDasharray="120 180"
            strokeDashoffset="0"
          />
          <text
            x="110"
            y="88"
            textAnchor="middle"
            fill={theme['text-primary']}
            style={{ fontSize: 28, fontWeight: 700, fontFamily: 'DM Sans, sans-serif' }}
          >
            41%
          </text>
          <text
            x="110"
            y="108"
            textAnchor="middle"
            fill={theme['text-muted']}
            style={{ fontSize: 12, fontFamily: 'DM Sans, sans-serif' }}
          >
            Project Ended
          </text>
        </svg>

        <div
          style={{
            display: 'flex',
            gap: 16,
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginTop: 4,
          }}
        >
          {legend.map((item) => (
            <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: item.stripe
                    ? `repeating-linear-gradient(-45deg, ${brandScale.muted}, ${brandScale.muted} 2px, ${theme['bg-muted']} 2px, ${theme['bg-muted']} 4px)`
                    : item.color,
                }}
              />
              <span style={{ fontSize: 12, color: theme['text-secondary'] }}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

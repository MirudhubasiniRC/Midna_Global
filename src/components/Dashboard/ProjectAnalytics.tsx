import { brandScale, colors } from '../../styles/theme';

const theme = colors.light;

const bars = [
  { day: 'S', height: 42, tone: 'muted' as const },
  { day: 'M', height: 72, tone: 'base' as const },
  { day: 'T', height: 55, tone: 'stripe' as const },
  { day: 'W', height: 88, tone: 'light' as const },
  { day: 'T', height: 64, tone: 'dark' as const },
  { day: 'F', height: 48, tone: 'stripe' as const },
  { day: 'S', height: 70, tone: 'mid' as const },
];

function barFill(tone: (typeof bars)[number]['tone']) {
  switch (tone) {
    case 'dark':
      return brandScale.dark;
    case 'base':
      return brandScale.base;
    case 'mid':
      return brandScale.mid;
    case 'light':
      return brandScale.light;
    case 'muted':
      return brandScale.muted;
    case 'stripe':
      return `repeating-linear-gradient(
        -45deg,
        ${brandScale.muted},
        ${brandScale.muted} 4px,
        ${theme['bg-muted']} 4px,
        ${theme['bg-muted']} 8px
      )`;
  }
}

export function ProjectAnalytics() {
  return (
    <section className="area-analytics dash-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div>
          <h2 className="dash-card-title">Project Analytics</h2>
          <p className="dash-card-subtitle">Weekly delivery overview</p>
        </div>
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
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: 10,
          height: 160,
          paddingTop: 8,
        }}
      >
        {bars.map((bar, index) => (
          <div
            key={`${bar.day}-${index}`}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 10,
              height: '100%',
              justifyContent: 'flex-end',
            }}
          >
            <div
              style={{
                width: '100%',
                maxWidth: 36,
                height: `${bar.height}%`,
                borderRadius: 10,
                background: barFill(bar.tone),
                transition: 'height 0.3s ease',
              }}
            />
            <span style={{ fontSize: 12, fontWeight: 500, color: theme['text-muted'] }}>{bar.day}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

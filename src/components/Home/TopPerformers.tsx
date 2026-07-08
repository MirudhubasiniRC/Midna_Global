import { brandScale, colors, radius, spacing } from '../../styles/theme';

const theme = colors.light;

type Performer = {
  rank: number;
  name: string;
  metric: string;
  detail: string;
  initials: string;
};

const performers: Performer[] = [
  { rank: 1, name: 'Ananya Rao', metric: '48 scans', detail: 'Nest · South', initials: 'AR' },
  { rank: 2, name: 'Rahul Mehta', metric: '41 scans', detail: 'Nest · West', initials: 'RM' },
  { rank: 3, name: 'Priya Shah', metric: '37 scans', detail: 'Nest · North', initials: 'PS' },
  { rank: 4, name: 'Vikram Iyer', metric: '33 scans', detail: 'Nest · East', initials: 'VI' },
  { rank: 5, name: 'Sneha Patel', metric: '29 scans', detail: 'Nest · Central', initials: 'SP' },
];

export function TopPerformers() {
  return (
    <section className="dash-card" style={{ display: 'flex', flexDirection: 'column', minHeight: 280 }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: spacing[4],
        }}
      >
        <div>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em' }}>
            Top performer of 5
          </h2>
          <p style={{ margin: '4px 0 0', fontSize: 12, color: theme['text-muted'] }}>Leading scanners this period</p>
        </div>
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: theme.primary,
            background: theme['primary-soft'],
            borderRadius: radius.pill,
            padding: '4px 10px',
          }}
        >
          Top 5
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
        {performers.map((person) => (
          <div
            key={person.rank}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '10px 8px',
              borderRadius: radius.md,
            }}
          >
            <span
              style={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                display: 'grid',
                placeItems: 'center',
                fontSize: 11,
                fontWeight: 700,
                flexShrink: 0,
                background: person.rank === 1 ? theme.primary : theme['bg-muted'],
                color: person.rank === 1 ? '#fff' : theme['text-secondary'],
              }}
            >
              {person.rank}
            </span>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background:
                  person.rank === 1
                    ? `linear-gradient(135deg, ${brandScale.base}, ${brandScale.dark})`
                    : `linear-gradient(135deg, ${brandScale.light}, ${brandScale.mid})`,
                color: '#fff',
                display: 'grid',
                placeItems: 'center',
                fontSize: 12,
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              {person.initials}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: theme['text-primary'] }}>{person.name}</div>
              <div style={{ fontSize: 12, color: theme['text-muted'] }}>{person.detail}</div>
            </div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: theme.primary,
                background: theme['primary-soft'],
                borderRadius: radius.pill,
                padding: '4px 10px',
                whiteSpace: 'nowrap',
              }}
            >
              {person.metric}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

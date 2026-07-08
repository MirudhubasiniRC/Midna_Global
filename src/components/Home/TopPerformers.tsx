import { colors, radius, spacing } from '../../styles/theme';

const theme = colors.light;

type Performer = {
  rank: number;
  name: string;
  metric: string;
  detail: string;
  avatar: string;
  pastel: string;
};

/** Soft pastel wells behind memoji-style faces (Donezo look) */
const performers: Performer[] = [
  {
    rank: 1,
    name: 'Ananya Rao',
    metric: '48 scans',
    detail: 'Nest · South',
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Ananya&backgroundColor=transparent',
    pastel: '#F8D7E8',
  },
  {
    rank: 2,
    name: 'Rahul Mehta',
    metric: '41 scans',
    detail: 'Nest · West',
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Rahul&backgroundColor=transparent',
    pastel: '#D8F0E2',
  },
  {
    rank: 3,
    name: 'Priya Shah',
    metric: '37 scans',
    detail: 'Nest · North',
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Priya&backgroundColor=transparent',
    pastel: '#DDE4F8',
  },
  {
    rank: 4,
    name: 'Vikram Iyer',
    metric: '33 scans',
    detail: 'Nest · East',
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Vikram&backgroundColor=transparent',
    pastel: '#F3EBDD',
  },
  {
    rank: 5,
    name: 'Sneha Patel',
    metric: '29 scans',
    detail: 'Nest · Central',
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Sneha&backgroundColor=transparent',
    pastel: '#E8D9F0',
  },
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
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: person.pastel,
                display: 'grid',
                placeItems: 'center',
                flexShrink: 0,
                overflow: 'hidden',
              }}
            >
              <img
                src={person.avatar}
                alt={person.name}
                width={40}
                height={40}
                style={{
                  width: 40,
                  height: 40,
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
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

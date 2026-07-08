import { colors, radius, spacing } from '../../styles/theme';

const theme = colors.light;

type Status = 'completed' | 'progress' | 'pending';

const members = [
  {
    name: 'Adrian Davis',
    role: 'Product Manager',
    time: '12 min ago',
    status: 'completed' as Status,
    initials: 'AD',
  },
  {
    name: 'Steve Fiedler',
    role: 'UI/UX Designer',
    time: '1 day ago',
    status: 'progress' as Status,
    initials: 'SF',
  },
  {
    name: 'Angela Moss',
    role: 'Frontend Dev',
    time: '2 days ago',
    status: 'pending' as Status,
    initials: 'AM',
  },
];

const statusClass: Record<Status, string> = {
  completed: 'status-completed',
  progress: 'status-progress',
  pending: 'status-pending',
};

const statusLabel: Record<Status, string> = {
  completed: 'Completed',
  progress: 'In Progress',
  pending: 'Pending',
};

export function TeamCollaboration() {
  return (
    <section className="area-team dash-card" style={{ display: 'flex', flexDirection: 'column', minHeight: 360 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h2 className="dash-card-title">Team Collaboration</h2>
        <button type="button" className="btn-secondary" style={{ height: 34, padding: '0 12px', fontSize: 12 }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Add Member
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[4], flex: 1 }}>
        {members.map((member) => (
          <div key={member.name} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${theme['primary-mid']}, ${theme.primary})`,
                color: '#fff',
                display: 'grid',
                placeItems: 'center',
                fontSize: 12,
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              {member.initials}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{member.name}</div>
              <div style={{ fontSize: 12, color: theme['text-muted'] }}>
                {member.role} · {member.time}
              </div>
            </div>
            <span className={`status-pill ${statusClass[member.status]}`}>{statusLabel[member.status]}</span>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: spacing[4],
          paddingTop: spacing[4],
          borderTop: `1px solid ${theme.border}`,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <div style={{ display: 'flex' }}>
          {['JD', 'KR', 'LP'].map((initials, i) => (
            <div
              key={initials}
              style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                marginLeft: i === 0 ? 0 : -8,
                border: `2px solid ${theme['bg-surface']}`,
                background: i === 1 ? theme['primary-dark'] : theme['primary-mid'],
                color: '#fff',
                fontSize: 10,
                fontWeight: 700,
                display: 'grid',
                placeItems: 'center',
              }}
            >
              {initials}
            </div>
          ))}
        </div>
        <span
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: theme.primary,
            background: theme['primary-soft'],
            borderRadius: radius.pill,
            padding: '4px 10px',
          }}
        >
          +2 more
        </span>
      </div>
    </section>
  );
}

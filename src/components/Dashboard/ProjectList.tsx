import { brandScale, colors, radius, spacing } from '../../styles/theme';

const theme = colors.light;

const projects = [
  { name: 'Develop API Endpoints', due: 'Due date: Nov 26, 2024', icon: '</>' },
  { name: 'Onboarding Flow', due: 'Due date: Nov 28, 2024', icon: '◎' },
  { name: 'Build Dashboard', due: 'Due date: Nov 30, 2024', icon: '▦' },
  { name: 'Optimize Page Load', due: 'Due date: Dec 5, 2024', icon: '⚡' },
  { name: 'Cross-Browser Testing', due: 'Due date: Dec 6, 2024', icon: '◐' },
];

export function ProjectList() {
  return (
    <section className="area-projects dash-card" style={{ display: 'flex', flexDirection: 'column', minHeight: 360 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h2 className="dash-card-title">Projects</h2>
        <button type="button" className="btn-secondary" style={{ height: 34, padding: '0 12px', fontSize: 12 }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 5v14M5 12h14" />
          </svg>
          New
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
        {projects.map((project) => (
          <div
            key={project.name}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '12px 10px',
              borderRadius: radius.md,
              transition: 'background 0.15s ease',
            }}
          >
            <span
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background: theme['primary-soft'],
                color: brandScale.dark,
                display: 'grid',
                placeItems: 'center',
                fontSize: 13,
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              {project.icon}
            </span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: theme['text-primary'] }}>{project.name}</div>
              <div style={{ fontSize: 12, color: theme['text-muted'], marginTop: 2 }}>{project.due}</div>
            </div>
            <button type="button" className="btn-icon" aria-label="Project menu" style={{ width: 32, height: 32 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="5" cy="12" r="1.5" />
                <circle cx="12" cy="12" r="1.5" />
                <circle cx="19" cy="12" r="1.5" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      <p style={{ fontSize: 12, color: theme['text-muted'], textAlign: 'center', marginTop: spacing[3] }}>
        + 4 more projects
      </p>
    </section>
  );
}

import { colors, radius, brandScale, shadow, spacing } from '../../styles/theme';

const theme = colors.light;

const kpis = [
  {
    id: 'total',
    label: 'Total Projects',
    value: '24',
    hint: 'Increased from last month',
    hero: true,
  },
  {
    id: 'ended',
    label: 'Ended Projects',
    value: '10',
    hint: 'Increased from last month',
    iconBg: brandScale.soft,
  },
  {
    id: 'running',
    label: 'Running Projects',
    value: '12',
    hint: 'Increased from last month',
    iconBg: brandScale.muted,
  },
  {
    id: 'pending',
    label: 'Pending Project',
    value: '2',
    hint: 'On Discuss',
    iconBg: '#FEE2E2',
  },
];

export function DashboardKpis() {
  return (
    <section className="area-kpis">
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: spacing[4],
          marginBottom: spacing[4],
          flexWrap: 'wrap',
        }}
      >
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.03em', color: theme['text-primary'] }}>
            Dashboard
          </h1>
          <p style={{ fontSize: 13, color: theme['text-muted'], marginTop: 4 }}>
            Plan, prioritize, and accomplish your tasks with ease.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button type="button" className="btn-primary">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Add Project
          </button>
          <button type="button" className="btn-secondary">
            Import Data
          </button>
        </div>
      </div>

      <div className="kpi-grid">
        {kpis.map((kpi) =>
          kpi.hero ? (
            <div
              key={kpi.id}
              style={{
                borderRadius: radius.lg,
                padding: spacing[5],
                background: `linear-gradient(145deg, ${brandScale.dark} 0%, ${brandScale.base} 55%, ${brandScale.mid} 100%)`,
                color: '#fff',
                boxShadow: shadow.primary,
                minHeight: 140,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  right: -20,
                  top: -20,
                  width: 100,
                  height: 100,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.12)',
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span style={{ fontSize: 13, fontWeight: 500, opacity: 0.9 }}>{kpi.label}</span>
                <span
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.2)',
                    display: 'grid',
                    placeItems: 'center',
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                    <path d="M7 17 17 7M8 7h9v9" />
                  </svg>
                </span>
              </div>
              <div>
                <div style={{ fontSize: 40, fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1 }}>{kpi.value}</div>
                <div style={{ fontSize: 12, opacity: 0.8, marginTop: 8 }}>{kpi.hint}</div>
              </div>
            </div>
          ) : (
            <div
              key={kpi.id}
              className="dash-card"
              style={{
                minHeight: 140,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span style={{ fontSize: 13, fontWeight: 500, color: theme['text-secondary'] }}>{kpi.label}</span>
                <span
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: kpi.iconBg,
                    color: theme.primary,
                    display: 'grid',
                    placeItems: 'center',
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17 17 7M8 7h9v9" />
                  </svg>
                </span>
              </div>
              <div>
                <div
                  style={{
                    fontSize: 36,
                    fontWeight: 700,
                    letterSpacing: '-0.04em',
                    lineHeight: 1,
                    color: theme.primary,
                  }}
                >
                  {kpi.value}
                </div>
                <div style={{ fontSize: 12, color: theme['text-muted'], marginTop: 8 }}>{kpi.hint}</div>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
}

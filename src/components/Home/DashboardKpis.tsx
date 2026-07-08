import { useState } from 'react';
import { brandScale, colors, radius, shadow, spacing } from '../../styles/theme';

const theme = colors.light;

type Kpi = {
  id: string;
  label: string;
  value: string;
  hint: string;
};

const kpis: Kpi[] = [
  {
    id: 'scans-year',
    label: 'My Scans this Year',
    value: '0',
    hint: 'Current year activity',
  },
  {
    id: 'scans-total',
    label: 'My Total Scans',
    value: '144',
    hint: 'All-time scans',
  },
  {
    id: 'billing-year',
    label: 'My Billing this Year',
    value: '–',
    hint: 'Current year billing',
  },
  {
    id: 'billing-total',
    label: 'My Total Billing',
    value: '35,51,617',
    hint: 'All-time billing',
  },
];

export function DashboardKpis() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section>
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
          <h1
            style={{
              margin: 0,
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: '-0.03em',
              color: theme['text-primary'],
            }}
          >
            Dashboard
          </h1>
          <p style={{ margin: '4px 0 0', fontSize: 13, color: theme['text-muted'] }}>
            Track your scans, billing, notices, and top performers.
          </p>
        </div>
      </div>

      <div className="kpi-grid">
        {kpis.map((kpi) => {
          const active = hoveredId === kpi.id;
          return (
            <article
              key={kpi.id}
              onMouseEnter={() => setHoveredId(kpi.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                minHeight: 148,
                borderRadius: radius.lg,
                padding: spacing[5],
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'default',
                transition: 'background 0.2s ease, box-shadow 0.2s ease, color 0.2s ease, transform 0.2s ease',
                background: active
                  ? `linear-gradient(145deg, ${brandScale.dark} 0%, ${brandScale.base} 55%, ${brandScale.mid} 100%)`
                  : theme['bg-surface'],
                color: active ? '#fff' : theme['text-primary'],
                border: active ? '1px solid transparent' : `1px solid ${theme.border}`,
                boxShadow: active ? shadow.primary : shadow.card,
                transform: active ? 'translateY(-2px)' : 'none',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {active && (
                <div
                  style={{
                    position: 'absolute',
                    right: -20,
                    top: -20,
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.12)',
                    pointerEvents: 'none',
                  }}
                />
              )}
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: active ? 'rgba(255,255,255,0.9)' : theme['text-secondary'],
                }}
              >
                {kpi.label}
              </span>
              <div>
                <div
                  style={{
                    fontSize: 34,
                    fontWeight: 700,
                    letterSpacing: '-0.04em',
                    lineHeight: 1,
                    color: active ? '#fff' : theme.primary,
                  }}
                >
                  {kpi.value}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    marginTop: 8,
                    color: active ? 'rgba(255,255,255,0.8)' : theme['text-muted'],
                  }}
                >
                  {kpi.hint}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

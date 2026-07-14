import { useState } from 'react';
import { colors, metricColors, radius, spacing, typography, type MetricColor } from '../../styles/theme';
import { NotificationButton } from '../Layout/NotificationButton';
import { ProfileAvatarButton } from '../Layout/ProfileAvatarButton';
import type { AppView } from '../Layout/navItems';

const theme = colors.light;

type Kpi = {
  id: string;
  label: string;
  value: string;
  hint: string;
  color: MetricColor;
  icon: React.ReactNode;
  /** When set, the card gets colored hover + arrow and navigates here on click */
  linkTo?: AppView;
};

const kpis: Kpi[] = [
  {
    id: 'scans-year',
    label: 'My Scans this Year',
    value: '0',
    hint: 'Current year activity',
    color: 'blue',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="3" />
        <path d="M3 10h18" />
        <path d="M8 2v4M16 2v4" />
      </svg>
    ),
    linkTo: 'scans-mla',
  },
  {
    id: 'scans-total',
    label: 'My Total Scans',
    value: '144',
    hint: 'All-time scans',
    color: 'pink',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 7V4h3M20 7V4h-3M4 17v3h3M20 17v3h-3" />
        <path d="M8 8h8v8H8z" />
      </svg>
    ),
  },
  {
    id: 'billing-year',
    label: 'My Billing this Year',
    value: '–',
    hint: 'Current year billing',
    color: 'purple',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="6" width="18" height="13" rx="2.5" />
        <path d="M3 10h18" />
        <circle cx="16" cy="14.5" r="1.6" />
      </svg>
    ),
    linkTo: 'ledger',
  },
  {
    id: 'billing-total',
    label: 'My Total Billing',
    value: '35,51,617',
    hint: 'All-time billing',
    color: 'green',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 17l6-6 4 4 8-8" />
        <path d="M15 7h6v6" />
      </svg>
    ),
  },
];

type DashboardKpisProps = {
  onOpenMobileMenu?: () => void;
  onOpenProfile?: () => void;
  onNavigate?: (view: AppView) => void;
};

export function DashboardKpis({ onOpenMobileMenu, onOpenProfile, onNavigate }: DashboardKpisProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [focusedId, setFocusedId] = useState<string | null>(null);

  return (
    <section>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: spacing[4],
          marginBottom: spacing[6],
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: typography.roles.pageTitle.fontSize,
              lineHeight: typography.roles.pageTitle.lineHeight,
              fontWeight: typography.roles.pageTitle.fontWeight,
              letterSpacing: typography.roles.pageTitle.letterSpacing,
              color: theme['text-primary'],
            }}
          >
            Dashboard
          </h1>
          <p style={{ margin: '8px 0 0', fontSize: 14, color: theme['text-secondary'] }}>
            Track your scans, billing, notices, and top performers.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            type="button"
            className="btn-icon mobile-menu-btn"
            aria-label="Open menu"
            onClick={onOpenMobileMenu}
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
          <NotificationButton />
          <ProfileAvatarButton onClick={onOpenProfile} />
        </div>
      </div>

      <div className="kpi-grid">
        {kpis.map((kpi) => {
          const featured = Boolean(kpi.linkTo);
          const tone = metricColors[kpi.color];
          const hovered = hoveredId === kpi.id;
          const focused = focusedId === kpi.id;
          const showColor = featured && (hovered || focused);
          const gradient = `linear-gradient(135deg, ${tone.icon} 0%, ${tone.text} 100%)`;

          return (
            <article
              key={kpi.id}
              className={`kpi-card${featured ? ' kpi-card--link' : ''}${showColor ? ' is-featured' : ''}`}
              onMouseEnter={() => setHoveredId(kpi.id)}
              onMouseLeave={() => setHoveredId(null)}
              onFocus={featured ? () => setFocusedId(kpi.id) : undefined}
              onBlur={featured ? () => setFocusedId(null) : undefined}
              onClick={featured ? () => onNavigate?.(kpi.linkTo!) : undefined}
              onKeyDown={
                featured
                  ? (e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onNavigate?.(kpi.linkTo!);
                      }
                    }
                  : undefined
              }
              role={featured ? 'button' : undefined}
              tabIndex={featured ? 0 : undefined}
              style={{
                cursor: featured ? 'pointer' : 'default',
                outline: 'none',
                background: showColor ? gradient : theme['bg-surface'],
                boxShadow: showColor
                  ? `0 20px 40px ${tone.icon}55`
                  : hovered
                    ? 'var(--shadow-cardHover)'
                    : undefined,
                transform: hovered || showColor ? 'translateY(-3px)' : undefined,
                transition: 'background 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease, color 0.2s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
                <span
                  style={{
                    fontSize: typography.roles.cardLabel.fontSize,
                    fontWeight: typography.roles.cardLabel.fontWeight,
                    color: showColor ? 'rgba(255, 255, 255, 0.9)' : theme['text-secondary'],
                    transition: 'color 0.2s ease',
                  }}
                >
                  {kpi.label}
                </span>
                <span
                  className="kpi-icon-bubble"
                  style={{
                    background: showColor ? 'rgba(255, 255, 255, 0.22)' : tone.bg,
                    color: showColor ? '#ffffff' : tone.icon,
                    borderRadius: radius.pill,
                    transition: 'background 0.2s ease, color 0.2s ease',
                  }}
                >
                  {showColor ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17 17 7" />
                      <path d="M7 7h10v10" />
                    </svg>
                  ) : (
                    kpi.icon
                  )}
                </span>
              </div>

              <div style={{ position: 'relative', zIndex: 1 }}>
                <div
                  style={{
                    fontSize: typography.roles.kpiValue.fontSize,
                    fontWeight: typography.roles.kpiValue.fontWeight,
                    letterSpacing: typography.roles.kpiValue.letterSpacing,
                    lineHeight: typography.roles.kpiValue.lineHeight,
                    color: showColor ? '#ffffff' : theme['text-primary'],
                    transition: 'color 0.2s ease',
                  }}
                >
                  {kpi.value}
                </div>
                <div
                  style={{
                    fontSize: typography.roles.helperText.fontSize,
                    marginTop: 6,
                    color: showColor ? 'rgba(255, 255, 255, 0.78)' : theme['text-muted'],
                    transition: 'color 0.2s ease',
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

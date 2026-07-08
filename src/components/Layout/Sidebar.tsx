import type { ReactNode } from 'react';
import { colors, radius, spacing, brandScale, shadow } from '../../styles/theme';

const theme = colors.light;

type NavItem = {
  id: string;
  label: string;
  badge?: string;
  icon: ReactNode;
};

const navItems: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    id: 'tasks',
    label: 'Tasks',
    badge: '12+',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
  },
  {
    id: 'calendar',
    label: 'Calendar',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
    ),
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 19V9M10 19V5M16 19v-7M22 19H2" />
      </svg>
    ),
  },
  {
    id: 'team',
    label: 'Team',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

export function Sidebar() {
  const activeId = 'dashboard';

  return (
    <aside
      style={{
        width: 240,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        background: theme['bg-sidebar'],
        borderRight: `1px solid ${theme.border}`,
        padding: `${spacing[5]} ${spacing[4]}`,
        minHeight: '100vh',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: `0 ${spacing[2]}`, marginBottom: spacing[8] }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${brandScale.base}, ${brandScale.dark})`,
            display: 'grid',
            placeItems: 'center',
            color: '#fff',
            fontWeight: 700,
            fontSize: 18,
            boxShadow: shadow.soft,
          }}
        >
          M
        </div>
        <span style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.03em', color: theme['text-primary'] }}>
          Midna
        </span>
      </div>

      <p
        style={{
          fontSize: 11,
          fontWeight: 600,
          color: theme['text-muted'],
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          padding: `0 ${spacing[3]}`,
          marginBottom: spacing[3],
        }}
      >
        Menu
      </p>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
        {navItems.map((item) => {
          const active = item.id === activeId;
          return (
            <button
              key={item.id}
              type="button"
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                width: '100%',
                padding: '10px 12px',
                border: 'none',
                borderRadius: radius.md,
                background: active ? theme['primary-soft'] : 'transparent',
                color: active ? theme.primary : theme['text-secondary'],
                fontSize: 14,
                fontWeight: active ? 600 : 500,
                textAlign: 'left',
                transition: 'background 0.15s ease, color 0.15s ease',
              }}
            >
              {active && (
                <span
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 8,
                    bottom: 8,
                    width: 3,
                    borderRadius: radius.pill,
                    background: theme.primary,
                  }}
                />
              )}
              <span
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 10,
                  display: 'grid',
                  placeItems: 'center',
                  background: active ? theme.primary : 'transparent',
                  color: active ? '#fff' : 'currentColor',
                }}
              >
                {item.icon}
              </span>
              <span style={{ flex: 1 }}>{item.label}</span>
              {item.badge && (
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    background: theme.primary,
                    color: '#fff',
                    padding: '2px 8px',
                    borderRadius: radius.pill,
                  }}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div
        style={{
          marginTop: spacing[6],
          borderRadius: radius.lg,
          padding: spacing[5],
          background: `
            radial-gradient(ellipse at 20% 0%, ${brandScale.mid}55, transparent 55%),
            radial-gradient(ellipse at 90% 80%, ${brandScale.base}66, transparent 50%),
            linear-gradient(160deg, ${brandScale.dark} 0%, #1a0a14 100%)
          `,
          color: '#fff',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.35,
            backgroundImage: `repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 8px,
              ${brandScale.base}22 8px,
              ${brandScale.base}22 16px
            )`,
            pointerEvents: 'none',
          }}
        />
        <p style={{ position: 'relative', fontSize: 14, fontWeight: 600, marginBottom: 6, lineHeight: 1.35 }}>
          Download the Midna app
        </p>
        <p style={{ position: 'relative', fontSize: 12, opacity: 0.75, marginBottom: 14, lineHeight: 1.4 }}>
          Get full access to projects on the go.
        </p>
        <button
          type="button"
          className="btn-primary"
          style={{
            position: 'relative',
            width: '100%',
            height: 38,
            boxShadow: 'none',
          }}
        >
          Download
        </button>
      </div>
    </aside>
  );
}

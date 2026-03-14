import { NavLink, useLocation } from 'react-router-dom';
import { House, Users, ChartColumn, BookMarked, FolderCode, BookOpenCheck, BookUser, UserStar, User } from 'lucide-react';
import { colors, spacing, typography } from '../../styles/theme';
import logo from '../../assets/Name_only.png';

const theme = colors.light;

const ICON_SIZE = 18;

const navItems = [
  { label: 'My Home', Icon: House, path: '/home' },
  { label: 'MLA', Icon: Users, path: '/mla' },
  { label: 'Process', Icon: ChartColumn, path: '/home' },
  { label: 'Resources', Icon: BookMarked, path: '/home' },
  { label: 'Softwares', Icon: FolderCode, path: '/home' },
  { label: 'Live Coach', Icon: BookOpenCheck, path: '/home' },
  { label: 'Mentor', Icon: BookUser, path: '/home' },
  { label: 'Expert', Icon: UserStar, path: '/home' },
];

export default function TopBar() {
  const location = useLocation();

  return (
    <header
      style={{
        position: 'relative',
        background: theme['bg-surface'],
        borderBottom: `1px solid ${theme.border}`,
        padding: `${spacing[3]} ${spacing[6]}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ flexShrink: 0 }}>
        <img
          src={logo}
          alt="Midna Global"
          style={{
            height: 52,
            width: 'auto',
            objectFit: 'contain',
          }}
        />
      </div>
      <nav
        style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'nowrap',
          gap: spacing[4],
        }}
      >
        {navItems.map((item) => {
          const Icon = item.Icon;
          const isActive =
            item.path === '/home'
              ? location.pathname === '/home'
              : location.pathname.startsWith(item.path);
          return (
            <NavLink
              key={item.label}
              to={item.path}
              end={item.path === '/home'}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = theme.primary;
                const iconSpan = e.currentTarget.querySelector('span:first-of-type');
                if (iconSpan) (iconSpan as HTMLElement).style.color = theme.primary;
              }}
              onMouseLeave={(e) => {
                const active =
                  item.path === '/home'
                    ? location.pathname === '/home'
                    : location.pathname.startsWith(item.path);
                e.currentTarget.style.color = active ? theme.primary : theme['text-primary'];
                const iconSpan = e.currentTarget.querySelector('span:first-of-type');
                if (iconSpan)
                  (iconSpan as HTMLElement).style.color = active
                    ? theme.primary
                    : theme['text-secondary'];
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                flexShrink: 0,
                gap: spacing[1],
                textDecoration: 'none',
                cursor: 'pointer',
                padding: `${spacing[2]} ${spacing[2]}`,
                fontFamily: typography.fonts.sans.family,
                fontSize: typography.sizes.sm.fontSize,
                color: isActive ? theme.primary : theme['text-primary'],
                whiteSpace: 'nowrap',
              }}
            >
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  color: isActive ? theme.primary : theme['text-secondary'],
                }}
              >
                <Icon size={ICON_SIZE} strokeWidth={2} />
              </span>
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
      <div
        style={{
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          gap: spacing[2],
          padding: `${spacing[2]} ${spacing[3]}`,
          borderRadius: 8,
          background: theme['bg-base'],
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: theme.primary,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <User size={20} color={theme['text-inverse']} strokeWidth={2} />
        </div>
        <div>
          <div
            style={{
              fontSize: typography.sizes.sm.fontSize,
              fontWeight: 600,
              fontFamily: typography.fonts.sans.family,
              color: theme['text-primary'],
              lineHeight: 1.2,
            }}
          >
            User Name
          </div>
          <div
            style={{
              fontSize: typography.sizes.xs.fontSize,
              color: theme['text-secondary'],
              fontFamily: typography.fonts.sans.family,
            }}
          >
            Profile
          </div>
        </div>
      </div>
    </header>
  );
}

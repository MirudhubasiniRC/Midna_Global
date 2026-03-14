import { House, Users, ChartColumn, BookMarked, FolderCode, BookOpenCheck, BookUser, UserStar, ChevronDown, User } from 'lucide-react';
import { colors, spacing, typography } from '../../styles/theme';
import logo from '../../assets/Name_only.png';

const theme = colors.light;

const ICON_SIZE = 18;

const navItems = [
  { label: 'My Home', Icon: House, hasDropdown: false },
  { label: 'MLA', Icon: Users, hasDropdown: false },
  { label: 'Process', Icon: ChartColumn, hasDropdown: false },
  { label: 'Resources', Icon: BookMarked, hasDropdown: false },
  { label: 'Softwares', Icon: FolderCode, hasDropdown: false },
  { label: 'Live Coach', Icon: BookOpenCheck, hasDropdown: false },
  { label: 'Mentor', Icon: BookUser, hasDropdown: false },
  { label: 'Expert', Icon: UserStar, hasDropdown: false },
];

export default function TopBar() {
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
          return (
            <button
              key={item.label}
              type="button"
              onMouseEnter={(e) => {
                e.currentTarget.style.color = theme.primary;
                const iconSpan = e.currentTarget.querySelector('span:first-of-type');
                if (iconSpan) (iconSpan as HTMLElement).style.color = theme.primary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = theme['text-primary'];
                const iconSpan = e.currentTarget.querySelector('span:first-of-type');
                if (iconSpan) (iconSpan as HTMLElement).style.color = theme['text-secondary'];
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                flexShrink: 0,
                gap: spacing[1],
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: `${spacing[2]} ${spacing[2]}`,
                fontFamily: typography.fonts.sans.family,
                fontSize: typography.sizes.sm.fontSize,
                color: theme['text-primary'],
                whiteSpace: 'nowrap',
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', color: theme['text-secondary'] }}>
                <Icon size={ICON_SIZE} strokeWidth={2} />
              </span>
              <span>{item.label}</span>
              {item.hasDropdown && <ChevronDown size={12} strokeWidth={2} />}
            </button>
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

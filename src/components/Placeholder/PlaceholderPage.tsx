import { colors, radius, spacing, typography } from '../../styles/theme';
import { NotificationButton } from '../Layout/NotificationButton';
import { ProfileAvatarButton } from '../Layout/ProfileAvatarButton';

const theme = colors.light;

type PlaceholderPageProps = {
  title: string;
  subtitle: string;
  actions?: string[];
  onOpenMobileMenu?: () => void;
  onOpenProfile?: () => void;
};

export function PlaceholderPage({ title, subtitle, actions = [], onOpenMobileMenu, onOpenProfile }: PlaceholderPageProps) {
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
            {title}
          </h1>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: theme['text-secondary'] }}>{subtitle}</p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button
            type="button"
            className="btn-icon mobile-menu-btn"
            aria-label="Open menu"
            onClick={onOpenMobileMenu}
            style={{ width: 42, height: 42 }}
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
          <NotificationButton />
          <ProfileAvatarButton onClick={onOpenProfile} />
        </div>
      </div>

      <div className="dash-card">
        {actions.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: spacing[5] }}>
            {actions.map((action) => (
              <span
                key={action}
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: theme.primary,
                  background: theme['primary-soft'],
                  borderRadius: radius.pill,
                  padding: '6px 12px',
                }}
              >
                {action}
              </span>
            ))}
          </div>
        )}

        <div
          style={{
            border: `1.5px dashed ${theme.border}`,
            borderRadius: radius.md,
            padding: spacing[8],
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            color: theme['text-muted'],
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              background: theme['bg-canvas'],
              display: 'grid',
              placeItems: 'center',
              color: theme['text-muted'],
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="3" />
              <path d="M9 9h6v6H9z" />
            </svg>
          </div>
          <span style={{ fontSize: 14, fontWeight: 600, color: theme['text-secondary'] }}>This section is coming soon</span>
          <span style={{ fontSize: 13, textAlign: 'center', maxWidth: 360 }}>
            We&apos;ll build out {title} here next — layout and data wiring are still in progress.
          </span>
        </div>
      </div>
    </section>
  );
}

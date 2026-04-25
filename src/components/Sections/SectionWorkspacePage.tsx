import { Navigate, Outlet, useLocation, useParams } from 'react-router-dom';
import { colors, spacing, typography } from '../../styles/theme';
import TopBar from '../Layout/TopBar';
import SectionSidebar, { type SectionSidebarItem } from '../Layout/SectionSidebar';

const theme = colors.light;

type SectionWorkspacePageProps = {
  title: string;
  items: SectionSidebarItem[];
};

export default function SectionWorkspacePage({ title, items }: SectionWorkspacePageProps) {
  const location = useLocation();
  const { section } = useParams<{ section: string }>();

  if (!section) {
    return <Navigate to={items[0].path} replace />;
  }

  const activeItem = items.find((item) => item.path.endsWith(`/${section}`));

  return (
    <div
      style={{
        minHeight: '100vh',
        background: theme['bg-base'],
        fontFamily: typography.fonts.sans.family,
        fontSize: typography.sizes.base.fontSize,
        color: theme['text-primary'],
      }}
    >
      <TopBar />
      <div style={{ display: 'flex', minHeight: 'calc(100vh - 65px)' }}>
        <SectionSidebar items={items} />
        <main
          style={{
            flex: 1,
            padding: spacing[6],
            overflow: 'auto',
          }}
        >
          <div
            style={{
              background: theme['bg-surface'],
              border: `1px solid ${theme.border}`,
              borderRadius: 14,
              padding: spacing[5],
            }}
          >
            <h1
              style={{
                margin: 0,
                marginBottom: spacing[2],
                fontSize: typography.sizes.xl.fontSize,
                fontWeight: typography.fonts.heading.fontWeight,
                fontFamily: typography.fonts.heading.family,
                color: theme['text-primary'],
              }}
            >
              {activeItem?.label ?? title}
            </h1>
            <p
              style={{
                margin: 0,
                color: theme['text-secondary'],
                fontSize: typography.sizes.sm.fontSize,
              }}
            >
              {title} section content can be added here.
            </p>
            <Outlet key={location.pathname} />
          </div>
        </main>
      </div>
    </div>
  );
}

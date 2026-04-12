import { Outlet } from 'react-router-dom';
import { colors, spacing, typography } from '../../styles/theme';
import TopBar from '../Layout/TopBar';
import ProcessSidebar from './ProcessSidebar';

const theme = colors.light;

/** Layout mirrors `MLAPage`: top bar + collapsible sidebar + main */
export default function ProcessPage() {
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
        <ProcessSidebar />
        <main
          style={{
            flex: 1,
            padding: spacing[6],
            overflow: 'auto',
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}

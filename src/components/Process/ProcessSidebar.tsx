import { useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  ChartColumn,
  FileSearch,
  Settings2,
  Upload,
  PanelLeftClose,
  PanelLeft,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { colors, spacing, radius, typography, sidebarTokens } from '../../styles/theme';

const theme = colors.light;

const ICON_SIZE = sidebarTokens.iconSize;
const SIDEBAR_EXPANDED = sidebarTokens.width.expanded;
const SIDEBAR_COLLAPSED = sidebarTokens.width.collapsed;

const processMenuItems: {
  label: string;
  Icon: LucideIcon;
  path: string;
  end?: boolean;
}[] = [
  { label: 'Process', Icon: ChartColumn, path: '/process', end: true },
  { label: 'Data Review', Icon: FileSearch, path: '/process/data-review' },
  { label: 'Data Process', Icon: Settings2, path: '/process/data-process' },
  { label: 'Upload Report', Icon: Upload, path: '/process/upload-report' },
];

/** Same structure and styling as MLA `Sidebar` */
export default function ProcessSidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      style={{
        width: collapsed ? SIDEBAR_COLLAPSED : SIDEBAR_EXPANDED,
        flexShrink: 0,
        background: theme['bg-surface'],
        borderRight: `1px solid ${theme.border}`,
        padding: spacing[4],
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.2s ease',
      }}
    >
      <button
        type="button"
        onClick={() => setCollapsed((c) => !c)}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = theme.primary;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = theme['text-secondary'];
        }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'flex-start',
          gap: spacing[2],
          marginBottom: spacing[4],
          padding: spacing[2],
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: theme['text-secondary'],
        }}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? (
          <PanelLeft size={sidebarTokens.collapseIconSize} strokeWidth={2} />
        ) : (
          <>
            <PanelLeftClose size={sidebarTokens.collapseIconSize} strokeWidth={2} />
            <span
              style={{
                fontSize: typography.sizes.xs.fontSize,
                fontFamily: typography.fonts.sans.family,
              }}
            >
              Collapse
            </span>
          </>
        )}
      </button>
      <nav
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: spacing[1],
        }}
      >
        {processMenuItems.map(({ label, Icon, path, end }) => (
          <NavLink
            key={path}
            to={path}
            end={end}
            title={collapsed ? label : undefined}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = theme.primary;
            }}
            onMouseLeave={(e) => {
              const isActive = e.currentTarget.getAttribute('aria-current') === 'page';
              e.currentTarget.style.color = isActive ? theme.primary : theme['text-primary'];
            }}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              justifyContent: collapsed ? 'center' : 'flex-start',
              gap: spacing[3],
              padding: collapsed ? spacing[3] : `${spacing[3]} ${spacing[4]}`,
              borderRadius: radius.sm,
              fontFamily: typography.fonts.sans.family,
              fontSize: sidebarTokens.navItemFontSize,
              color: isActive ? theme.primary : theme['text-primary'],
              textDecoration: 'none',
              background: isActive ? theme['primary-soft'] : 'transparent',
            })}
          >
            <span
              style={{
                display: 'flex',
                flexShrink: 0,
                color: 'inherit',
              }}
            >
              <Icon size={ICON_SIZE} strokeWidth={2} />
            </span>
            {!collapsed && label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

import { useState } from 'react';
import {
  ScanLine,
  FileText,
  BookOpen,
  User,
  Award,
  Star,
  BookMarked,
  Sparkles,
  PanelLeftClose,
  PanelLeft,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { colors, spacing, radius, typography, sidebarTokens } from '../../styles/theme';

const theme = colors.light;

const ICON_SIZE = sidebarTokens.iconSize;
const SIDEBAR_EXPANDED = sidebarTokens.width.expanded;
const SIDEBAR_COLLAPSED = sidebarTokens.width.collapsed;

const mlaMenuItems = [
  { label: 'My Scan', Icon: ScanLine, path: '/mla/scan' },
  { label: 'My Reports', Icon: FileText, path: '/mla/reports' },
  { label: 'My Ledger', Icon: BookOpen, path: '/mla/ledger' },
  { label: 'My Profile', Icon: User, path: '/mla/profile' },
  { label: 'My SRA', Icon: Award, path: '/mla/sra' },
  // { label: 'My Transactions', Icon: Receipt, path: '/mla/transactions' },
  // { label: 'My Testimonials', Icon: MessageSquareQuote, path: '/mla/testimonials' },
  // { label: 'My Feedbacks', Icon: MessageCircle, path: '/mla/feedbacks' },
  { label: 'My Google Review', Icon: Star, path: '/mla/google-review' },
  { label: 'My Promotions', Icon: Sparkles, path: '/mla/promotions' },
  { label: 'My ABC Ledger', Icon: BookMarked, path: '/mla/abc-ledger' },
];

export default function Sidebar() {
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
        {mlaMenuItems.map(({ label, Icon, path }) => (
          <NavLink
            key={path}
            to={path}
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

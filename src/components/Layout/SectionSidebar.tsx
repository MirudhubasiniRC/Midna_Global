import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';
import {
  PanelLeft,
  PanelLeftClose,
  Globe2,
  Cog,
  BarChart3,
  Database,
  Brain,
  ScanLine,
  BadgeIndianRupee,
  CircleDollarSign,
  BookOpen,
  Bell,
  MessageCircle,
  MessageSquareQuote,
  NotebookPen,
  Landmark,
  Printer,
  BookMarked,
  Users,
  Shapes,
  FolderKanban,
  Receipt,
  BookText,
  Sparkles,
  Network,
  ArrowLeftRight,
  FileBarChart2,
} from 'lucide-react';
import { colors, spacing, radius, typography, sidebarTokens } from '../../styles/theme';

const theme = colors.light;

const SIDEBAR_EXPANDED = sidebarTokens.width.sectionExpanded;
const SIDEBAR_COLLAPSED = sidebarTokens.width.collapsed;

export type SectionSidebarItem = {
  label: string;
  path: string;
};

type SectionSidebarProps = {
  items: SectionSidebarItem[];
};

const sectionIconMap: Record<string, LucideIcon> = {
  'Web Enquiries': Globe2,
  'Pre Process': Cog,
  'MIS ABC': BarChart3,
  'NLA Data': Database,
  'SLC Domain': Brain,
  'MIS Scans': ScanLine,
  'MIS DDS': BadgeIndianRupee,
  'MIS GBP Plus': CircleDollarSign,
  Ledger: BookOpen,
  Resources: BookMarked,
  Notifications: Bell,
  Feedbacks: MessageCircle,
  Testimonials: MessageSquareQuote,
  'MIS Ledger': NotebookPen,
  'Bank Account': Landmark,
  'Print Label': Printer,
  'ABC Ledger': BookMarked,
  'Associate Master': Users,
  Patterns: Shapes,
  Database: FolderKanban,
  'MIS Transactions': Receipt,
  'Master Journal': BookText,
  'MIS Special Offer': Sparkles,
  'MIS Network': Network,
  'MIS ABC Transactions': ArrowLeftRight,
  'MIS-MNA': FileBarChart2,
};

export default function SectionSidebar({ items }: SectionSidebarProps) {
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
          outlineColor: theme['focus-ring'],
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
        {items.map(({ label, path }) => {
          const Icon = sectionIconMap[label] ?? FolderKanban;
          return (
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
                outlineColor: theme['focus-ring'],
              })}
            >
              <span
                style={{
                  display: 'flex',
                  flexShrink: 0,
                  color: 'inherit',
                }}
              >
                <Icon size={sidebarTokens.iconSize} strokeWidth={2} />
              </span>
              {!collapsed && label}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}

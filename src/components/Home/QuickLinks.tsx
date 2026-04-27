import { useState } from 'react';
import { colors, spacing, radius, typography } from '../../styles/theme';

const theme = colors.light;

const quickLinks = [
  'My Scans',
  'My Reports',
  'My Ledger',
  'My ABC Ledger',
  'My Profile',
];

export default function QuickLinks() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      style={{
        background: theme['bg-surface'],
        borderRadius: radius.lg,
        padding: spacing[5],
        border: `1px solid ${theme.border}`,
        borderLeft: `4px solid ${theme.primary}`,
      }}
    >
      <div style={{ marginBottom: spacing[5] }}>
        <h2
          style={{
            margin: 0,
            fontSize: typography.sizes.xl.fontSize,
            fontWeight: typography.fonts.heading.fontWeight,
            fontFamily: typography.fonts.heading.family,
            color: theme['text-primary'],
            textAlign: 'left',
          }}
        >
          Quick links
        </h2>
        <p
          style={{
            margin: `${spacing[2]} 0 0 0`,
            fontSize: typography.sizes.sm.fontSize,
            fontWeight: 400,
            fontFamily: typography.fonts.sans.family,
            color: theme['text-secondary'],
            lineHeight: 1.5,
          }}
        >
          Shortcuts and account overview
        </p>
      </div>
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        style={{
          background: theme['btn-primary-bg'],
          border: 'none',
          borderRadius: radius.sm,
          padding: `${spacing[2]} ${spacing[4]}`,
          color: theme['btn-primary-text'],
          fontSize: typography.sizes.sm.fontSize,
          fontFamily: typography.fonts.sans.family,
          fontWeight: 600,
          cursor: 'pointer',
          marginBottom: spacing[3],
        }}
      >
        Quick link menu {expanded ? '▲' : '▼'}
      </button>
      <div style={{ display: expanded ? 'flex' : 'none', flexWrap: 'wrap', gap: spacing[2], flexDirection: 'row' }}>
        {quickLinks.map((label) => (
          <button
            key={label}
            type="button"
            style={{
              background: theme['btn-primary-bg'],
              border: 'none',
              borderRadius: radius.sm,
              padding: `${spacing[2]} ${spacing[4]}`,
              color: theme['btn-primary-text'],
              fontSize: typography.sizes.sm.fontSize,
              fontFamily: typography.fonts.sans.family,
              fontWeight: 500,
              cursor: 'pointer',
              textAlign: 'center',
              flex: '0 0 auto',
            }}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

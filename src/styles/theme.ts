/**
 * Midna Global Design System
 * Typography, spacing, colors, and component tokens
 */

export type ThemeMode = 'light';

// ─── Typography ───────────────────────────────────────────────────────────────

export const typography = {
  sizes: {
    '2xs': { fontSize: '11px', lineHeight: '16px', fontWeight: 400 },
    xs: { fontSize: '12px', lineHeight: '18px', fontWeight: 400 },
    sm: { fontSize: '14px', lineHeight: '20px', fontWeight: 400 },
    base: { fontSize: '16px', lineHeight: '24px', fontWeight: 400 },
    lg: { fontSize: '18px', lineHeight: '28px', fontWeight: 500 },
    xl: { fontSize: '20px', lineHeight: '28px', fontWeight: 600 },
    '2xl': { fontSize: '24px', lineHeight: '32px', fontWeight: 600 },
    '3xl': { fontSize: '30px', lineHeight: '38px', fontWeight: 700 },
    '4xl': { fontSize: '36px', lineHeight: '44px', fontWeight: 700 },
  } as const,

  fonts: {
    sans: { family: 'Inter, system-ui, sans-serif', letterSpacing: '0', fontWeight: 400 },
    heading: { family: 'Inter, system-ui, sans-serif', letterSpacing: '-0.01em', fontWeight: 600 },
    mono: { family: 'Menlo, Consolas, monospace', letterSpacing: '0', fontWeight: 500 },
    emphasis: { family: 'Inter', letterSpacing: '0', fontWeight: 500 },
  } as const,
};

// ─── Spacing & Sizing ─────────────────────────────────────────────────────────

export const spacing = {
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
} as const;

export const radius = {
  sm: '6px',
  md: '10px',
  lg: '14px',
  /** Full pill — inline table actions, chips */
  pill: '9999px',
} as const;

export const buttonTokens = {
  height: {
    sm: '36px',
    md: '44px',
    lg: '52px',
  } as const,
  padding: {
    sm: '8px 14px',
    md: '12px 18px',
    lg: '16px 24px',
  } as const,
};

export const inputTokens = {
  height: {
    sm: '36px',
    md: '44px',
    lg: '52px',
  } as const,
  padding: '12px 16px',
};

export const tableTokens = {
  rowHeight: '48px',
} as const;

export const sidebarTokens = {
  width: {
    expanded: 220,
    collapsed: 72,
    sectionExpanded: 280,
  } as const,
  iconSize: 20,
  collapseIconSize: 22,
  navItemFontSize: '14px',
} as const;

// ─── Colors (Light) ───────────────────────────────────────────────────────────

export const colors = {
  light: {
    // Background
    'bg-base': '#F5F6F7',
    'bg-surface': '#FFFFFF',
    'bg-muted': '#FFF8E1',
    'bg-hover': '#F7E6F2',

    // Text
    'text-primary': '#333333',
    'text-secondary': '#6B7280',
    'text-muted': '#9CA3AF',
    'text-inverse': '#FFFFFF',

    // Brand
    primary: '#93207A',
    'primary-hover': '#A52A8A',
    'primary-soft': '#F7E6F2',
    secondary: '#E9C75A',
    'secondary-hover': '#DDB94F',
    accent: '#E9C75A',

    // Buttons
    'btn-primary-bg': '#93207A',
    'btn-primary-text': '#FFFFFF',
    'btn-primary-hover': '#A52A8A',

    'btn-secondary-bg': '#E9C75A',
    'btn-secondary-text': '#333333',
    'btn-secondary-hover': '#DDB94F',

    'btn-disabled-bg': '#E5E7EB',
    'btn-disabled-text': '#9CA3AF',

    // Tables
    'table-header-bg': '#F7E6F2',
    'table-header-gray': '#F3F4F6',
    'table-header-muted-secondary': '#FDF8E7',
    'table-row-hover': 'rgba(147, 32, 122, 0.05)',
    'table-zebra': '#F9FAFB',
    'table-border': '#E5E7EB',

    // Status
    success: '#22C55E',
    'success-bg': '#DCFCE7',
    error: '#DC2626',
    'error-bg': '#FEE2E2',
    warning: '#F59E0B',
    'warning-bg': '#FEF3C7',
    info: '#0284C7',
    'info-bg': '#E0F2FE',

    // Borders
    border: '#E5E7EB',
    divider: '#E5E7EB',
    'focus-ring': '#93207A',
  } as const,
};

// ─── Theme Helper ─────────────────────────────────────────────────────────────

export const getTheme = (mode: ThemeMode) => colors[mode];

/**
 * Generate CSS custom properties for the given theme mode.
 * Usage: Apply the returned object to document.documentElement.style or use in a styled component.
 */
export const getThemeCssVars = (mode: ThemeMode): Record<string, string> => {
  const theme = colors[mode];
  const vars: Record<string, string> = {};

  for (const [key, value] of Object.entries(theme)) {
    vars[`--color-${key}`] = value;
  }
  for (const [key, value] of Object.entries(spacing)) {
    vars[`--space-${key}`] = value;
  }
  for (const [key, value] of Object.entries(radius)) {
    vars[`--radius-${key}`] = value;
  }
  for (const [key, value] of Object.entries(buttonTokens.height)) {
    vars[`--btn-height-${key}`] = value;
  }
  for (const [key, value] of Object.entries(buttonTokens.padding)) {
    vars[`--btn-padding-${key}`] = value;
  }
  for (const [key, value] of Object.entries(inputTokens.height)) {
    vars[`--input-height-${key}`] = value;
  }
  vars['--input-padding'] = inputTokens.padding;
  vars['--table-row-height'] = tableTokens.rowHeight;

  // Typography
  for (const [key, val] of Object.entries(typography.sizes)) {
    vars[`--text-${key}-font-size`] = val.fontSize;
    vars[`--text-${key}-line-height`] = val.lineHeight;
    vars[`--text-${key}-font-weight`] = String(val.fontWeight);
  }
  for (const [key, val] of Object.entries(typography.fonts)) {
    vars[`--font-${key}-family`] = val.family;
    vars[`--font-${key}-letter-spacing`] = val.letterSpacing;
    vars[`--font-${key}-weight`] = String(val.fontWeight);
  }

  return vars;
};

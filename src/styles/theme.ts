/**
 * Midna Global Design System
 * Typography, spacing, colors, and component tokens
 */

export type ThemeMode = 'light' | 'dark';

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

// ─── Colors (Light & Dark) ────────────────────────────────────────────────────

export const colors = {
  light: {
    // Background
    'bg-base': '#F8FAFC',
    'bg-surface': '#FFFFFF',
    'bg-muted': '#F1F5F9',
    'bg-hover': '#EEF2FF',

    // Text
    'text-primary': '#0F172A',
    'text-secondary': '#475569',
    'text-muted': '#64748B',
    'text-inverse': '#FFFFFF',

    // Brand
    primary: '#312E81',
    'primary-hover': '#4338CA',
    accent: '#0D9488',
    'accent-soft': '#CCFBF1',

    // Buttons
    'btn-primary-bg': '#312E81',
    'btn-primary-text': '#FFFFFF',
    'btn-primary-hover': '#4338CA',
    'btn-secondary-bg': '#E0E7FF',
    'btn-secondary-text': '#312E81',
    'btn-disabled-bg': '#E2E8F0',
    'btn-disabled-text': '#94A3B8',

    // Tables
    'table-header-bg': '#EEF2FF',
    'table-row-hover': '#F9FAFB',
    'table-border': '#E2E8F0',

    // Status
    success: '#16A34A',
    'success-bg': '#DCFCE7',
    error: '#DC2626',
    'error-bg': '#FEE2E2',
    warning: '#D97706',
    'warning-bg': '#FEF3C7',
    info: '#0EA5E9',
    'info-bg': '#E0F2FE',

    // Security
    'secure-badge-bg': '#E0E7FF',
    'secure-badge-text': '#312E81',
    'focus-ring': '#6366F1',

    // Borders
    border: '#E5E7EB',
    divider: '#E2E8F0',
  } as const,

  dark: {
    // Background
    'bg-base': '#0B1220',
    'bg-surface': '#111827',
    'bg-muted': '#1F2937',
    'bg-hover': '#1E293B',

    // Text
    'text-primary': '#F8FAFC',
    'text-secondary': '#CBD5E1',
    'text-muted': '#94A3B8',
    'text-inverse': '#0F172A',

    // Brand
    primary: '#6366F1',
    'primary-hover': '#818CF8',
    accent: '#14B8A6',
    'accent-soft': '#134E4A',

    // Buttons
    'btn-primary-bg': '#6366F1',
    'btn-primary-text': '#0B1220',
    'btn-primary-hover': '#818CF8',
    'btn-secondary-bg': '#1E293B',
    'btn-secondary-text': '#E0E7FF',
    'btn-disabled-bg': '#334155',
    'btn-disabled-text': '#64748B',

    // Tables
    'table-header-bg': '#1E293B',
    'table-row-hover': '#1F2937',
    'table-border': '#334155',

    // Status
    success: '#22C55E',
    'success-bg': '#14532D',
    error: '#EF4444',
    'error-bg': '#7F1D1D',
    warning: '#F59E0B',
    'warning-bg': '#78350F',
    info: '#38BDF8',
    'info-bg': '#0C4A6E',

    // Security
    'secure-badge-bg': '#312E81',
    'secure-badge-text': '#E0E7FF',
    'focus-ring': '#818CF8',

    // Borders
    border: '#334155',
    divider: '#1F2937',
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

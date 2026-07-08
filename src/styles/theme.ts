/**
 * Midna Global Design System — Donezo-style shell with #CA317A brand
 */

export type ThemeMode = 'light';

// ─── Brand scale (magenta) ────────────────────────────────────────────────────

export const brandScale = {
  dark: '#8B2154',
  base: '#CA317A',
  hover: '#A82866',
  mid: '#E06A9E',
  light: '#F0A8C8',
  soft: '#F9E8F0',
  muted: '#F3D0E0',
} as const;

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
    sans: {
      family: '"DM Sans", "Segoe UI", system-ui, sans-serif',
      letterSpacing: '0',
      fontWeight: 400,
    },
    heading: {
      family: '"DM Sans", "Segoe UI", system-ui, sans-serif',
      letterSpacing: '-0.02em',
      fontWeight: 600,
    },
    mono: { family: 'Menlo, Consolas, monospace', letterSpacing: '0', fontWeight: 500 },
    emphasis: {
      family: '"DM Sans", "Segoe UI", system-ui, sans-serif',
      letterSpacing: '0',
      fontWeight: 500,
    },
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
  sm: '8px',
  md: '14px',
  lg: '20px',
  xl: '24px',
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

export const shadow = {
  card: '0 1px 2px rgba(15, 23, 42, 0.04), 0 8px 24px rgba(15, 23, 42, 0.04)',
  soft: '0 4px 14px rgba(202, 49, 122, 0.18)',
  primary: '0 6px 18px rgba(202, 49, 122, 0.28)',
} as const;

// ─── Colors (Light) ───────────────────────────────────────────────────────────

export const colors = {
  light: {
    'bg-base': '#F5F6F8',
    'bg-surface': '#FFFFFF',
    'bg-muted': '#EEF0F3',
    'bg-hover': brandScale.soft,
    'bg-sidebar': '#F7F8FA',

    'text-primary': '#1A1D21',
    'text-secondary': '#5B6470',
    'text-muted': '#8B949E',
    'text-inverse': '#FFFFFF',

    primary: brandScale.base,
    'primary-hover': brandScale.hover,
    'primary-soft': brandScale.soft,
    'primary-muted': brandScale.muted,
    'primary-mid': brandScale.mid,
    'primary-dark': brandScale.dark,
    'primary-light': brandScale.light,

    accent: brandScale.base,
    'accent-soft': brandScale.soft,

    'btn-primary-bg': brandScale.base,
    'btn-primary-text': '#FFFFFF',
    'btn-primary-hover': brandScale.hover,
    'btn-secondary-bg': '#FFFFFF',
    'btn-secondary-text': brandScale.base,
    'btn-secondary-border': brandScale.base,
    'btn-disabled-bg': '#E2E8F0',
    'btn-disabled-text': '#94A3B8',

    'table-header-bg': brandScale.soft,
    'table-row-hover': 'rgba(202, 49, 122, 0.04)',
    'table-border': '#E5E7EB',

    success: '#16A34A',
    'success-bg': '#DCFCE7',
    error: '#DC2626',
    'error-bg': '#FEE2E2',
    warning: '#D97706',
    'warning-bg': '#FEF3C7',
    info: '#0EA5E9',
    'info-bg': '#E0F2FE',

    'status-completed-bg': brandScale.soft,
    'status-completed-text': brandScale.dark,
    'status-progress-bg': '#FEF3C7',
    'status-progress-text': '#92400E',
    'status-pending-bg': '#FEE2E2',
    'status-pending-text': '#991B1B',

    'secure-badge-bg': brandScale.soft,
    'secure-badge-text': brandScale.dark,
    'focus-ring': brandScale.base,

    border: '#E8EAED',
    divider: '#EEF0F3',
  } as const,
};

export const getTheme = (mode: ThemeMode = 'light') => colors[mode];

/**
 * Generate CSS custom properties for the given theme mode.
 */
export const getThemeCssVars = (mode: ThemeMode = 'light'): Record<string, string> => {
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
  for (const [key, value] of Object.entries(shadow)) {
    vars[`--shadow-${key}`] = value;
  }
  for (const [key, value] of Object.entries(brandScale)) {
    vars[`--brand-${key}`] = value;
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

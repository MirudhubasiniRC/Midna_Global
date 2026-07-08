/**
 * Midna Global Design System
 * Visual reference: Donezo-style modern dashboard shell
 * Brand primary: #CA317A (replaces Donezo green)
 *
 * Three-layer backgrounds (Donezo exact):
 *   1. bg-frame   — full outer white page
 *   2. bg-canvas  — grey fill for the three enclosed panels (sidebar, top bar, main)
 *   3. bg-surface — white component cards inside main
 *
 * Use these tokens when building pages — colors, radius, shadow,
 * spacing, buttons, cards, sidebar, charts, and status chips.
 */

export type ThemeMode = 'light';

// ─── Brand scale (magenta, Donezo green → #CA317A) ────────────────────────────

/** Monochrome brand ladder for fills, charts, gradients, patterns */
export const brandScale = {
  /** Deep accent — hero gradients, gauge "completed", dark pattern cards */
  dark: '#8B2154',
  /** Primary brand — buttons, active nav, solid accents */
  base: '#CA317A',
  /** Hover / pressed */
  hover: '#A82866',
  /** Mid tint — secondary chart bars, avatars */
  mid: '#E06A9E',
  /** Light tint — soft chart bars, highlights */
  light: '#F0A8C8',
  /** Soft wash — active nav bg, icon chips, completed badges */
  soft: '#F9E8F0',
  /** Muted tint — striped chart segments, muted fills */
  muted: '#F3D0E0',
} as const;

// ─── Typography ───────────────────────────────────────────────────────────────

export const typography = {
  sizes: {
    '2xs': { fontSize: '11px', lineHeight: '16px', fontWeight: 400 },
    xs: { fontSize: '12px', lineHeight: '18px', fontWeight: 400 },
    sm: { fontSize: '14px', lineHeight: '20px', fontWeight: 400 },
    base: { fontSize: '16px', lineHeight: '24px', fontWeight: 400 },
    lg: { fontSize: '18px', lineHeight: '26px', fontWeight: 600 },
    xl: { fontSize: '20px', lineHeight: '28px', fontWeight: 600 },
    '2xl': { fontSize: '24px', lineHeight: '32px', fontWeight: 700 },
    '3xl': { fontSize: '32px', lineHeight: '40px', fontWeight: 700 },
    '4xl': { fontSize: '36px', lineHeight: '44px', fontWeight: 700 },
  } as const,

  fonts: {
    /**
     * SF Pro Display — Apple's system font. It can't be self-hosted or
     * pulled from a CDN (Apple restricts distribution to Apple platforms),
     * so `-apple-system` / `BlinkMacSystemFont` resolve to it natively on
     * macOS & iOS Safari/Chrome. Inter is the closest metric fallback for
     * everyone else (Windows, Android, Linux).
     */
    sans: {
      family: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Inter", "Segoe UI", system-ui, sans-serif',
      letterSpacing: '0',
      fontWeight: 400,
    },
    heading: {
      family: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Inter", "Segoe UI", system-ui, sans-serif',
      letterSpacing: '-0.025em',
      fontWeight: 700,
    },
    mono: { family: 'Menlo, Consolas, monospace', letterSpacing: '0', fontWeight: 500 },
    emphasis: {
      family: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Inter", "Segoe UI", system-ui, sans-serif',
      letterSpacing: '0',
      fontWeight: 500,
    },
  } as const,

  /**
   * Semantic text roles mapped 1:1 to the Donezo reference dashboard.
   * Prefer these over raw `sizes` in components so copy stays visually
   * consistent with the template (e.g. `typography.roles.pageTitle`).
   */
  roles: {
    /** Sidebar wordmark — "Donezo" */
    logo: { fontSize: '20px', lineHeight: '28px', fontWeight: 700, letterSpacing: '-0.02em' },
    /** Page heading — "Dashboard" */
    pageTitle: { fontSize: '32px', lineHeight: '40px', fontWeight: 700, letterSpacing: '-0.02em' },
    /** Page description under the heading */
    pageSubtitle: { fontSize: '14px', lineHeight: '20px', fontWeight: 400 },
    /** Panel/card headers — "Project Analytics", "Reminders", "Team Collaboration" */
    sectionTitle: { fontSize: '18px', lineHeight: '26px', fontWeight: 600, letterSpacing: '0' },
    /** KPI card labels — "Total Projects", "Ended Projects" */
    cardLabel: { fontSize: '14px', lineHeight: '20px', fontWeight: 500 },
    /** Big KPI numerals — "24", "10", "12" */
    kpiValue: { fontSize: '36px', lineHeight: '44px', fontWeight: 700, letterSpacing: '-0.02em' },
    /** KPI footnote — "Increased from last month" */
    kpiHint: { fontSize: '12px', lineHeight: '18px', fontWeight: 400 },
    /** Sidebar nav group label — "MENU", "GENERAL" */
    navGroupLabel: { fontSize: '11px', lineHeight: '16px', fontWeight: 600, letterSpacing: '0.06em' },
    /** Sidebar nav link */
    navItem: { fontSize: '14px', lineHeight: '20px', fontWeight: 500 },
    /** Primary row text — names, task titles, list items */
    body: { fontSize: '14px', lineHeight: '20px', fontWeight: 500 },
    /** Secondary row text — "Working on...", due dates */
    bodyMuted: { fontSize: '13px', lineHeight: '18px', fontWeight: 400 },
    /** Top bar user name */
    userName: { fontSize: '14px', lineHeight: '20px', fontWeight: 600 },
    /** Top bar user email */
    userMeta: { fontSize: '12px', lineHeight: '18px', fontWeight: 400 },
    /** Button label */
    button: { fontSize: '14px', lineHeight: '20px', fontWeight: 600 },
    /** Large ring/gauge stat — "41%" */
    statValue: { fontSize: '30px', lineHeight: '38px', fontWeight: 700, letterSpacing: '-0.02em' },
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

/** Donezo-soft rounding — prefer md/lg/xl on cards and controls */
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
    md: '40px',
    lg: '48px',
  } as const,
  padding: {
    sm: '8px 14px',
    md: '10px 16px',
    lg: '14px 22px',
  } as const,
  /** Primary = solid brand pill; secondary = outlined brand pill */
  shape: 'pill' as const,
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
  /** Default white card elevation */
  card: '0 1px 2px rgba(15, 23, 42, 0.04), 0 8px 24px rgba(15, 23, 42, 0.04)',
  /** Soft brand glow (icons, small accents) */
  soft: '0 4px 14px rgba(202, 49, 122, 0.18)',
  /** Primary CTA / hero KPI glow */
  primary: '0 6px 18px rgba(202, 49, 122, 0.28)',
} as const;

// ─── Layout reference (Donezo shell) ──────────────────────────────────────────

/**
 * Donezo page shell:
 * 1. Outer page — full white (`bg-frame`)
 * 2. Three enclosed grey panels — sidebar | top bar | main content (`bg-canvas` + rounded border)
 * 3. White component cards inside main content (`bg-surface`)
 */
export const layoutTokens = {
  /** White outer page inset */
  framePadding: spacing[5],
  /** Gap between the three enclosed panels */
  shellGap: spacing[4],
  /** Shared rounding for the three grey panels */
  panelRadius: '24px',
  /** Soft border around each grey panel */
  panelBorder: '1px solid #E4E6EA',
  sidebarWidth: '212px',
  sidebarCollapsedWidth: '76px',
  topBarHeight: '72px',
  contentPadding: spacing[6],
  contentPaddingX: spacing[6],
  /** Gap between dashboard cards (KPI row, panel grid) */
  gridGap: spacing[5],
  /** Shared fixed height for the Notice board / Top performers row, so both cards line up and the taller one scrolls internally */
  homeLowerCardHeight: '480px',
} as const;

/** White surface cards used across the dashboard grid */
export const cardTokens = {
  padding: spacing[6],
  radius: radius.lg,
  border: '1px solid',
  background: 'bg-surface' as const,
  shadow: 'card' as const,
} as const;

/**
 * Sidebar = enclosed grey panel on white page.
 * Active item (Donezo): left brand bar + brand icon + bold black label (no filled pill).
 */
export const sidebarTokens = {
  background: 'bg-canvas' as const,
  itemRadius: radius.md,
  activeBackground: 'transparent' as const,
  activeBarWidth: '5px',
  activeBarColor: 'primary' as const,
  iconChipSize: '22px',
  iconChipRadius: '0',
} as const;

/**
 * Chart / gauge palette — map Donezo green bars to brandScale.
 * Use dark/base/mid/light/muted (+ stripe = muted over bg-muted).
 */
export const chartTokens = {
  dark: brandScale.dark,
  base: brandScale.base,
  mid: brandScale.mid,
  light: brandScale.light,
  muted: brandScale.muted,
  soft: brandScale.soft,
} as const;

/**
 * Notice/severity accents — red / orange / yellow, desaturated enough to
 * sit quietly on white surfaces rather than read as an alarm. Drives the
 * Notice Board icon chip, headline color, and left accent per item.
 */
export const severityTokens = {
  high: {
    icon: '#DC2626',
    text: '#B42318',
    bg: '#FDF2F2',
    border: '#F6D3D3',
  },
  medium: {
    icon: '#EA580C',
    text: '#B45309',
    bg: '#FDF5EC',
    border: '#F3DFC0',
  },
  low: {
    icon: '#CA8A04',
    text: '#946800',
    bg: '#FDFBEA',
    border: '#EFE4AC',
  },
} as const;

export type SeverityLevel = keyof typeof severityTokens;

/**
 * Patterned dark panels (promo card, time tracker):
 * dark → black gradient + brand mid/base radial washes + subtle stripes.
 */
export const patternTokens = {
  gradient: `linear-gradient(155deg, ${brandScale.dark} 0%, #1a0a14 55%, #0d0610 100%)`,
  glowMid: brandScale.mid,
  glowBase: brandScale.base,
  stripe: `${brandScale.base}33`,
} as const;

// ─── Colors (Light) ───────────────────────────────────────────────────────────

export const colors = {
  light: {
    /**
     * Three-layer Donezo backgrounds:
     * bg-frame   → full outer white page
     * bg-canvas  → grey fill for enclosed sidebar / top bar / main panels
     * bg-surface → white component cards (KPIs, notice, lists, etc.)
     */
    'bg-frame': '#FFFFFF',
    'bg-canvas': '#F7F7F7',
    'bg-base': '#F7F7F7',
    'bg-surface': '#FFFFFF',
    'bg-muted': '#EEEEEE',
    'bg-hover': brandScale.soft,
    'bg-sidebar': '#F7F7F7',
    'bg-topbar': '#F7F7F7',
    'bg-main': '#F7F7F7',

    // Text
    'text-primary': '#1A1D21',
    'text-secondary': '#5B6470',
    'text-muted': '#8B949E',
    'text-inverse': '#FFFFFF',

    // Brand
    primary: brandScale.base,
    'primary-hover': brandScale.hover,
    'primary-soft': brandScale.soft,
    'primary-muted': brandScale.muted,
    'primary-mid': brandScale.mid,
    'primary-dark': brandScale.dark,
    'primary-light': brandScale.light,

    accent: brandScale.base,
    'accent-soft': brandScale.soft,

    // Buttons
    'btn-primary-bg': brandScale.base,
    'btn-primary-text': '#FFFFFF',
    'btn-primary-hover': brandScale.hover,
    'btn-secondary-bg': '#FFFFFF',
    'btn-secondary-text': brandScale.base,
    'btn-secondary-border': brandScale.base,
    'btn-disabled-bg': '#E2E8F0',
    'btn-disabled-text': '#94A3B8',

    // Tables
    'table-header-bg': brandScale.soft,
    'table-row-hover': 'rgba(202, 49, 122, 0.04)',
    'table-border': '#E5E7EB',

    // Semantic (keep — not brand green)
    success: '#16A34A',
    'success-bg': '#DCFCE7',
    error: '#DC2626',
    'error-bg': '#FEE2E2',
    warning: '#D97706',
    'warning-bg': '#FEF3C7',
    info: '#0EA5E9',
    'info-bg': '#E0F2FE',

    // Status chips (Completed → magenta soft; others semantic)
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
 * Apply on app mount: Object.entries(vars).forEach(([k,v]) => document.documentElement.style.setProperty(k,v))
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
  for (const [key, value] of Object.entries(layoutTokens)) {
    vars[`--layout-${key}`] = value;
  }
  for (const [key, value] of Object.entries(chartTokens)) {
    vars[`--chart-${key}`] = value;
  }
  for (const [level, tokens] of Object.entries(severityTokens)) {
    for (const [key, value] of Object.entries(tokens)) {
      vars[`--severity-${level}-${key}`] = value;
    }
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
  vars['--pattern-gradient'] = patternTokens.gradient;

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
  for (const [key, val] of Object.entries(typography.roles)) {
    vars[`--role-${key}-font-size`] = val.fontSize;
    vars[`--role-${key}-line-height`] = val.lineHeight;
    vars[`--role-${key}-font-weight`] = String(val.fontWeight);
    vars[`--role-${key}-letter-spacing`] = 'letterSpacing' in val ? val.letterSpacing : '0';
  }

  return vars;
};

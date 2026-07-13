/**
 * Midna Global Design System
 * Visual reference: Orbix Studio fintech dashboard (blue/indigo, soft lavender)
 * Brand primary: #4F6AF0
 *
 * Three-layer backgrounds:
 *   1. bg-frame   — full outer lavender-grey page
 *   2. bg-canvas  — same lavender-grey fill behind the content panel
 *   3. bg-surface — white component cards inside main
 *
 * Use these tokens when building pages — colors, radius, shadow,
 * spacing, buttons, cards, sidebar, charts, and status chips.
 */

export type ThemeMode = 'light';

// ─── Brand scale (indigo/blue → #4F6AF0) ───────────────────────────────────────

/** Monochrome brand ladder for fills, charts, gradients, patterns */
export const brandScale = {
  /** Deep accent — hero gradients, gauge "completed", dark pattern cards */
  dark: '#333F97',
  /** Primary brand — buttons, active nav, solid accents */
  base: '#4F6AF0',
  /** Hover / pressed */
  hover: '#3B54DE',
  /** Mid tint — secondary chart bars, avatars */
  mid: '#7C93FF',
  /** Light tint — soft chart bars, highlights */
  light: '#AFC0FF',
  /** Soft wash — active nav bg, icon chips, completed badges */
  soft: '#EAEEFF',
  /** Muted tint — striped chart segments, muted fills */
  muted: '#D3DBFF',
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
     * Inter, self-hosted via @fontsource-variable/inter (imported in
     * main.tsx) — bundled with the app instead of pulled from a CDN link,
     * so it always loads regardless of network/ad-block conditions. The
     * package registers the family as "Inter Variable", not "Inter".
     * Matches the Orbix reference's rounded geometric look.
     */
    sans: {
      family: '"Inter Variable", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
      letterSpacing: '0',
      fontWeight: 400,
    },
    heading: {
      family: '"Inter Variable", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
      letterSpacing: '-0.025em',
      fontWeight: 700,
    },
    mono: { family: 'Menlo, Consolas, monospace', letterSpacing: '0', fontWeight: 500 },
    emphasis: {
      family: '"Inter Variable", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
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
    pageTitle: { fontSize: '36px', lineHeight: '44px', fontWeight: 700, letterSpacing: '-0.02em' },
    /** Page description under the heading */
    pageSubtitle: { fontSize: '14px', lineHeight: '20px', fontWeight: 400 },
    /** Panel/card headers — "Notice board", "Top performer of 5" */
    sectionTitle: { fontSize: '22px', lineHeight: '30px', fontWeight: 700, letterSpacing: '-0.01em' },
    /** Nested card/row titles — notice headline, performer name */
    cardTitle: { fontSize: '16px', lineHeight: '24px', fontWeight: 600, letterSpacing: '0' },
    /** Body copy — notice text, descriptions */
    description: { fontSize: '14px', lineHeight: '20px', fontWeight: 400 },
    /** KPI card labels — "Total Projects", "Ended Projects" */
    cardLabel: { fontSize: '13px', lineHeight: '18px', fontWeight: 500 },
    /** Big KPI numerals — "24", "10", "12" */
    kpiValue: { fontSize: '32px', lineHeight: '38px', fontWeight: 700, letterSpacing: '-0.02em' },
    /** KPI footnote — "Increased from last month" */
    kpiHint: { fontSize: '12px', lineHeight: '18px', fontWeight: 400 },
    /** Generic helper/meta text — dates, counts, fine print */
    helperText: { fontSize: '12px', lineHeight: '18px', fontWeight: 400 },
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

/** Fintech-soft rounding — lg is the standard card radius (20px) */
export const radius = {
  sm: '10px',
  md: '14px',
  lg: '20px',
  xl: '28px',
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
  /** Default white card elevation — soft, diffused, fintech-calm */
  card: '0 10px 28px rgba(22, 26, 46, 0.06)',
  /** Slightly raised — hover states on cards */
  cardHover: '0 16px 36px rgba(22, 26, 46, 0.10)',
  /** Soft brand glow (icons, small accents) */
  soft: '0 6px 18px rgba(79, 106, 240, 0.16)',
  /** Primary CTA glow — used sparingly */
  primary: '0 6px 20px rgba(79, 106, 240, 0.24)',
} as const;

// ─── Layout reference ───────────────────────────────────────────────────────

/**
 * Page shell:
 * 1. Outer page — soft lavender-grey (`bg-frame`)
 * 2. Light, collapsible nav rail flush against the left edge (`sidebarTokens`)
 * 3. White component cards inside main content (`bg-surface`)
 */
export const layoutTokens = {
  /** App bleeds to the viewport edge — no outer inset */
  framePadding: '0px',
  /** Gap between the sidebar and the content panel, and the content panel's outer right/bottom inset */
  shellGap: '20px',
  /** Outer top inset — a bit more than shellGap so both the sidebar and content panel sit a little lower, clear of the viewport edge */
  shellGapTop: '32px',
  /** Shared rounding for the content panel */
  panelRadius: '24px',
  /** Soft border around each panel */
  panelBorder: '1px solid #E6E9F6',
  /** Expanded width — icons + labels */
  sidebarWidth: '216px',
  /** Collapsed width — icons only */
  sidebarCollapsedWidth: '76px',
  /** Extra breathing room above the page title, so it doesn't sit flush against the viewport edge */
  contentPaddingTop: spacing[10],
  contentPadding: spacing[6],
  contentPaddingX: spacing[6],
  /** Gap between dashboard cards (KPI row, panel grid) — generous, premium whitespace */
  gridGap: spacing[6],
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
 * Sidebar = light, collapsible nav rail. A touch whiter than the page's
 * bg-canvas (not full bg-surface white — that read as too much contrast),
 * just enough to lift it slightly off the page.
 */
export const sidebarTokens = {
  background: '#F8F9FD',
  itemRadius: radius.md,
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
  /** Red — urgent */
  high: {
    icon: '#DE6B6B',
    text: '#A93E3E',
    bg: '#FBEEEE',
    border: '#F0D6D6',
  },
  /** Orangy-yellow — caution */
  medium: {
    icon: '#DDA43C',
    text: '#8A5D14',
    bg: '#FBF4E5',
    border: '#EFDDB9',
  },
  /** Green — informational */
  low: {
    icon: '#57A67D',
    text: '#336B4F',
    bg: '#EEF6F1',
    border: '#D5E9DD',
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
     * Soft lavender-grey page (Orbix Studio fintech style):
     * bg-frame / bg-canvas → same cool lavender #EEF1FA, so the content
     *                        panel reads as one continuous surface
     * bg-surface           → white component cards (KPIs, notice, lists, etc.)
     * Structure/hierarchy comes from the white cards + soft shadow, not panel fills.
     */
    'bg-frame': '#EEF1FA',
    'bg-canvas': '#EEF1FA',
    'bg-surface': '#FFFFFF',
    'bg-muted': '#F1F3FC',
    'bg-hover': '#F1F3FC',

    // Text
    'text-primary': '#161A2E',
    'text-secondary': '#767B99',
    'text-muted': '#9EA3BE',
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
    'btn-secondary-text': '#161A2E',
    'btn-secondary-border': '#E6E9F6',
    'btn-disabled-bg': '#E2E8F0',
    'btn-disabled-text': '#94A3B8',

    // Tables
    'table-header-bg': '#EEF1FA',
    'table-row-hover': '#EEF1FA',
    'table-border': '#E6E9F6',

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

    border: '#E6E9F6',
    divider: '#E6E9F6',
  } as const,
};

/**
 * Supporting metric colors — used sparingly on KPI icon chips / trend
 * badges, never as a full card fill. One hue per metric, not a rainbow.
 */
export const metricColors = {
  blue: { icon: '#2E90FA', text: '#175CD3', bg: '#EFF8FF' },
  green: { icon: '#12B76A', text: '#027A48', bg: '#ECFDF3' },
  amber: { icon: '#F79009', text: '#B54708', bg: '#FFFAEB' },
  purple: { icon: '#9E77ED', text: '#6941C6', bg: '#F9F5FF' },
  indigo: { icon: brandScale.base, text: brandScale.dark, bg: brandScale.soft },
} as const;

export type MetricColor = keyof typeof metricColors;

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
  for (const [name, tones] of Object.entries(metricColors)) {
    for (const [key, value] of Object.entries(tones)) {
      vars[`--metric-${name}-${key}`] = value;
    }
  }
  for (const [level, tokens] of Object.entries(severityTokens)) {
    for (const [key, value] of Object.entries(tokens)) {
      vars[`--severity-${level}-${key}`] = value;
    }
  }
  for (const [key, value] of Object.entries(sidebarTokens)) {
    vars[`--sidebar-${key}`] = value;
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

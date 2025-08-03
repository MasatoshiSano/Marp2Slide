// Design system configuration for consistent styling across slides

export interface DesignSystem {
  colors: ColorPalette;
  typography: TypographyScale;
  spacing: SpacingScale;
  breakpoints: ResponsiveBreakpoints;
  effects: EffectSystem;
}

export interface ColorPalette {
  primary: ColorSet;
  secondary: ColorSet;
  neutral: ColorSet;
  semantic: SemanticColors;
}

export interface ColorSet {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
}

export interface SemanticColors {
  success: ColorSet;
  warning: ColorSet;
  error: ColorSet;
  info: ColorSet;
}

export interface TypographyScale {
  fontFamilies: FontFamilySet;
  fontSizes: FontSizeScale;
  fontWeights: FontWeightScale;
  lineHeights: LineHeightScale;
  letterSpacing: LetterSpacingScale;
}

export interface FontFamilySet {
  heading: string;
  body: string;
  mono: string;
}

export interface FontSizeScale {
  xs: string;
  sm: string;
  base: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  '4xl': string;
  '5xl': string;
  '6xl': string;
}

export interface FontWeightScale {
  thin: number;
  light: number;
  normal: number;
  medium: number;
  semibold: number;
  bold: number;
  extrabold: number;
  black: number;
}

export interface LineHeightScale {
  none: number;
  tight: number;
  snug: number;
  normal: number;
  relaxed: number;
  loose: number;
}

export interface LetterSpacingScale {
  tighter: string;
  tight: string;
  normal: string;
  wide: string;
  wider: string;
  widest: string;
}

export interface SpacingScale {
  0: string;
  px: string;
  0.5: string;
  1: string;
  1.5: string;
  2: string;
  2.5: string;
  3: string;
  3.5: string;
  4: string;
  5: string;
  6: string;
  7: string;
  8: string;
  9: string;
  10: string;
  11: string;
  12: string;
  14: string;
  16: string;
  20: string;
  24: string;
  28: string;
  32: string;
  36: string;
  40: string;
  44: string;
  48: string;
  52: string;
  56: string;
  60: string;
  64: string;
  72: string;
  80: string;
  96: string;
}

export interface ResponsiveBreakpoints {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
}

export interface EffectSystem {
  shadows: ShadowScale;
  borders: BorderScale;
  borderRadius: BorderRadiusScale;
  transitions: TransitionScale;
}

export interface ShadowScale {
  sm: string;
  base: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  inner: string;
  none: string;
}

export interface BorderScale {
  0: string;
  2: string;
  4: string;
  8: string;
}

export interface BorderRadiusScale {
  none: string;
  sm: string;
  base: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  full: string;
}

export interface TransitionScale {
  none: string;
  all: string;
  default: string;
  colors: string;
  opacity: string;
  shadow: string;
  transform: string;
}

// Default design system configuration
export const defaultDesignSystem: DesignSystem = {
  colors: {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#2c5aa0',
      600: '#1e3d6f',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
    },
    secondary: {
      50: '#fff7ed',
      100: '#ffedd5',
      200: '#fed7aa',
      300: '#fdba74',
      400: '#fb923c',
      500: '#f39800',
      600: '#cc7a00',
      700: '#c2410c',
      800: '#9a3412',
      900: '#7c2d12',
    },
    neutral: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
    semantic: {
      success: {
        50: '#ecfdf5',
        100: '#d1fae5',
        200: '#a7f3d0',
        300: '#6ee7b7',
        400: '#34d399',
        500: '#4ecdc4',
        600: '#059669',
        700: '#047857',
        800: '#065f46',
        900: '#064e3b',
      },
      warning: {
        50: '#fffbeb',
        100: '#fef3c7',
        200: '#fde68a',
        300: '#fcd34d',
        400: '#fbbf24',
        500: '#f59e0b',
        600: '#d97706',
        700: '#b45309',
        800: '#92400e',
        900: '#78350f',
      },
      error: {
        50: '#fef2f2',
        100: '#fee2e2',
        200: '#fecaca',
        300: '#fca5a5',
        400: '#f87171',
        500: '#ff6b6b',
        600: '#dc2626',
        700: '#b91c1c',
        800: '#991b1b',
        900: '#7f1d1d',
      },
      info: {
        50: '#eff6ff',
        100: '#dbeafe',
        200: '#bfdbfe',
        300: '#93c5fd',
        400: '#60a5fa',
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8',
        800: '#1e40af',
        900: '#1e3a8a',
      },
    },
  },
  typography: {
    fontFamilies: {
      heading: '"Hiragino Sans", "Yu Gothic", "Meiryo", sans-serif',
      body: '"Hiragino Sans", "Yu Gothic", "Meiryo", sans-serif',
      mono: '"SF Mono", "Monaco", "Inconsolata", "Roboto Mono", monospace',
    },
    fontSizes: {
      xs: 'clamp(0.75rem, 1.5vw, 1rem)',
      sm: 'clamp(1rem, 2vw, 1.25rem)',
      base: 'clamp(1.125rem, 2.5vw, 1.5rem)',
      lg: 'clamp(1.5rem, 3vw, 2rem)',
      xl: 'clamp(2rem, 4vw, 2.5rem)',
      '2xl': 'clamp(2.5rem, 5vw, 3.5rem)',
      '3xl': 'clamp(3rem, 6vw, 4rem)',
      '4xl': 'clamp(3.5rem, 7vw, 4.5rem)',
      '5xl': 'clamp(4rem, 8vw, 5rem)',
      '6xl': 'clamp(4.5rem, 9vw, 6rem)',
    },
    fontWeights: {
      thin: 100,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900,
    },
    lineHeights: {
      none: 1,
      tight: 1.25,
      snug: 1.375,
      normal: 1.5,
      relaxed: 1.625,
      loose: 2,
    },
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0em',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },
  },
  spacing: {
    0: '0px',
    px: '1px',
    0.5: 'clamp(0.125rem, 0.5vw, 0.25rem)',
    1: 'clamp(0.25rem, 1vw, 0.5rem)',
    1.5: 'clamp(0.375rem, 1.5vw, 0.75rem)',
    2: 'clamp(0.5rem, 1.5vw, 1rem)',
    2.5: 'clamp(0.625rem, 2vw, 1.25rem)',
    3: 'clamp(0.75rem, 2vw, 1.5rem)',
    3.5: 'clamp(0.875rem, 2.5vw, 1.75rem)',
    4: 'clamp(1rem, 2.5vw, 2rem)',
    5: 'clamp(1.25rem, 3vw, 2.5rem)',
    6: 'clamp(1.5rem, 3vw, 3rem)',
    7: 'clamp(1.75rem, 3.5vw, 3.5rem)',
    8: 'clamp(2rem, 4vw, 4rem)',
    9: 'clamp(2.25rem, 4.5vw, 4.5rem)',
    10: 'clamp(2.5rem, 5vw, 5rem)',
    11: 'clamp(2.75rem, 5.5vw, 5.5rem)',
    12: 'clamp(3rem, 6vw, 6rem)',
    14: 'clamp(3.5rem, 7vw, 7rem)',
    16: 'clamp(4rem, 8vw, 8rem)',
    20: 'clamp(5rem, 10vw, 10rem)',
    24: 'clamp(6rem, 12vw, 12rem)',
    28: 'clamp(7rem, 14vw, 14rem)',
    32: 'clamp(8rem, 16vw, 16rem)',
    36: 'clamp(9rem, 18vw, 18rem)',
    40: 'clamp(10rem, 20vw, 20rem)',
    44: 'clamp(11rem, 22vw, 22rem)',
    48: 'clamp(12rem, 24vw, 24rem)',
    52: 'clamp(13rem, 26vw, 26rem)',
    56: 'clamp(14rem, 28vw, 28rem)',
    60: 'clamp(15rem, 30vw, 30rem)',
    64: 'clamp(16rem, 32vw, 32rem)',
    72: 'clamp(18rem, 36vw, 36rem)',
    80: 'clamp(20rem, 40vw, 40rem)',
    96: 'clamp(24rem, 48vw, 48rem)',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  effects: {
    shadows: {
      sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
      '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
      inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
      none: '0 0 #0000',
    },
    borders: {
      0: '0px',
      2: '2px',
      4: '4px',
      8: '8px',
    },
    borderRadius: {
      none: '0px',
      sm: '0.125rem',
      base: '0.25rem',
      md: '0.375rem',
      lg: '0.5rem',
      xl: '0.75rem',
      '2xl': '1rem',
      '3xl': '1.5rem',
      full: '9999px',
    },
    transitions: {
      none: 'none',
      all: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
      default: 'color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter 150ms cubic-bezier(0.4, 0, 0.2, 1)',
      colors: 'color, background-color, border-color, text-decoration-color, fill, stroke 150ms cubic-bezier(0.4, 0, 0.2, 1)',
      opacity: 'opacity 150ms cubic-bezier(0.4, 0, 0.2, 1)',
      shadow: 'box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1)',
      transform: 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
};

// Layout pattern configurations
export interface LayoutConfiguration {
  aspectRatio: AspectRatio;
  safeArea: SafeAreaSettings;
  gridSystem: GridConfiguration;
  layoutPatterns: LayoutPatternConfig[];
}

export interface AspectRatio {
  width: number;
  height: number;
  enforceStrict: boolean;
}

export interface SafeAreaSettings {
  top: string;
  right: string;
  bottom: string;
  left: string;
  enforceMinimum: boolean;
}

export interface GridConfiguration {
  columns: number;
  rows: number;
  gap: string;
  maxWidth: string;
  centerContent: boolean;
}

export interface LayoutPatternConfig {
  name: string;
  type: string;
  template: string;
  constraints: LayoutConstraints;
  responsiveBehavior: ResponsiveBehavior;
  cssClasses: string[];
}

export interface LayoutConstraints {
  minWidth?: string;
  maxWidth?: string;
  minHeight?: string;
  maxHeight?: string;
  aspectRatio?: string;
  contentOverflow: 'hidden' | 'scroll' | 'auto' | 'visible';
}

export enum ResponsiveBehavior {
  SCALE = 'scale',
  REFLOW = 'reflow',
  HIDE = 'hide',
  STACK = 'stack'
}

// Default layout configuration
export const defaultLayoutConfiguration: LayoutConfiguration = {
  aspectRatio: {
    width: 16,
    height: 9,
    enforceStrict: true,
  },
  safeArea: {
    top: '5vh',
    right: '5vw',
    bottom: '5vh',
    left: '5vw',
    enforceMinimum: true,
  },
  gridSystem: {
    columns: 12,
    rows: 8,
    gap: 'clamp(1rem, 2.5vw, 1.5rem)',
    maxWidth: '1920px',
    centerContent: true,
  },
  layoutPatterns: [
    {
      name: 'Standard',
      type: 'standard',
      template: 'standard-layout.html',
      constraints: {
        contentOverflow: 'hidden',
      },
      responsiveBehavior: ResponsiveBehavior.SCALE,
      cssClasses: ['standard-layout'],
    },
    {
      name: 'Split',
      type: 'split',
      template: 'split-layout.html',
      constraints: {
        minWidth: '768px',
        contentOverflow: 'hidden',
      },
      responsiveBehavior: ResponsiveBehavior.STACK,
      cssClasses: ['split-layout'],
    },
    {
      name: 'Center',
      type: 'center',
      template: 'center-layout.html',
      constraints: {
        contentOverflow: 'hidden',
      },
      responsiveBehavior: ResponsiveBehavior.SCALE,
      cssClasses: ['center-layout'],
    },
    {
      name: 'Grid',
      type: 'grid',
      template: 'grid-layout.html',
      constraints: {
        minWidth: '640px',
        contentOverflow: 'hidden',
      },
      responsiveBehavior: ResponsiveBehavior.REFLOW,
      cssClasses: ['grid-layout'],
    },
  ],
};

// CSS custom properties generator
export function generateCSSCustomProperties(designSystem: DesignSystem): string {
  const properties: string[] = [':root {'];
  
  // Colors
  Object.entries(designSystem.colors.primary).forEach(([key, value]) => {
    properties.push(`  --color-primary-${key}: ${value};`);
  });
  
  Object.entries(designSystem.colors.secondary).forEach(([key, value]) => {
    properties.push(`  --color-secondary-${key}: ${value};`);
  });
  
  Object.entries(designSystem.colors.neutral).forEach(([key, value]) => {
    properties.push(`  --color-neutral-${key}: ${value};`);
  });
  
  // Typography
  Object.entries(designSystem.typography.fontSizes).forEach(([key, value]) => {
    properties.push(`  --font-size-${key}: ${value};`);
  });
  
  Object.entries(designSystem.typography.fontWeights).forEach(([key, value]) => {
    properties.push(`  --font-weight-${key}: ${value};`);
  });
  
  // Spacing
  Object.entries(designSystem.spacing).forEach(([key, value]) => {
    properties.push(`  --spacing-${key}: ${value};`);
  });
  
  // Effects
  Object.entries(designSystem.effects.shadows).forEach(([key, value]) => {
    properties.push(`  --shadow-${key}: ${value};`);
  });
  
  Object.entries(designSystem.effects.borderRadius).forEach(([key, value]) => {
    properties.push(`  --radius-${key}: ${value};`);
  });
  
  properties.push('}');
  
  return properties.join('\n');
}
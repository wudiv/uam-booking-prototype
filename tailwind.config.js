/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Uber "Black and White Duet" Palette
        "primary": "#000000",
        "on-primary": "#ffffff",
        "background": "#ffffff",
        "on-background": "#000000",
        "surface": "#ffffff",
        "on-surface": "#000000",
        "surface-variant": "#f6f6f6",
        "on-surface-variant": "#5e5e5e",
        "outline": "#e2e2e2",
        "outline-variant": "#eeeeee",
        
        // Semantic overrides (minimalist)
        "secondary": "#333333",
        "on-secondary": "#ffffff",
        "secondary-container": "#f6f6f6",
        "on-secondary-container": "#000000",
        
        // M3 Legacy Mapping (Redirected to Uber Palette)
        "surface-container-low": "#f6f6f6",
        "surface-container": "#eeeeee",
        "surface-container-high": "#e2e2e2",
        "surface-container-highest": "#d1d1d1",
        "surface-container-lowest": "#ffffff",
        "inverse-surface": "#000000",
        "inverse-on-surface": "#ffffff",
      },
      borderRadius: {
        'none': '0',
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px', // Uber Card Canonical
        '2xl': '24px',
        'pill': '999px', // Uber Signature
        'full': '9999px'
      },
      spacing: {
        'unit': '4px',
        'stack-lg': '32px', // Uber Section Padding
        'stack-md': '16px', // Uber Card Interior
        'stack-sm': '8px',  // Uber Sibling Gap
        'container-padding': '32px',
        'gutter': '12px',
        'safe': 'env(safe-area-inset-bottom, 16px)',
        'safe-top': 'env(safe-area-inset-top, 0px)',
        'safe-bottom': 'env(safe-area-inset-bottom, 16px)'
      },
      fontFamily: {
        "sans": ["Inter", "sans-serif"],
        "display": ["Inter", "sans-serif"],
        "body": ["Inter", "sans-serif"],
      },
      fontSize: {
        'display-xxl': ['52px', { lineHeight: '64px', letterSpacing: '0', fontWeight: '700' }],
        'display-xl': ['36px', { lineHeight: '44px', letterSpacing: '0', fontWeight: '700' }],
        'display-lg': ['32px', { lineHeight: '40px', letterSpacing: '0', fontWeight: '700' }],
        'display-md': ['24px', { lineHeight: '32px', letterSpacing: '0', fontWeight: '700' }],
        'display-sm': ['20px', { lineHeight: '28px', letterSpacing: '0', fontWeight: '700' }],
        'body-lg': ['18px', { lineHeight: '24px', fontWeight: '500' }],
        'body-md': ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'body-sm': ['14px', { lineHeight: '20px', fontWeight: '400' }],
        'label-lg': ['16px', { lineHeight: '20px', fontWeight: '500' }],
        'label-md': ['14px', { lineHeight: '18px', fontWeight: '500' }],
        'label-sm': ['12px', { lineHeight: '16px', fontWeight: '500' }],
      },
      boxShadow: {
        'uber-1': 'rgba(0, 0, 0, 0.12) 0px 4px 16px 0px', // Level 1 Subtle
        'uber-2': 'rgba(0, 0, 0, 0.16) 0px 4px 16px 0px', // Level 2 Card
        'uber-3': 'rgba(0, 0, 0, 0.16) 0px 2px 8px 0px',  // Level 3 Pill Float
      }
    },
  },
  plugins: [],
}

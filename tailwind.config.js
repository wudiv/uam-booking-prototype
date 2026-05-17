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
        // 低空科技配色 - 清爽、现代、不刺眼，适合长时间阅读
        "primary": "#0F5B66",          // 主色：低空蓝绿
        "primary-dark": "#123E46",     // 主色深色变体
        "primary-soft": "#E8F4F6",     // 主色浅色背景
        "on-primary": "#ffffff",       // 主色上的文字
        "accent": "#4A90A4",           // 航线/地图强调
        "background": "#F6F8FA",       // 页面背景
        "on-background": "#1F2933",    // 页面文字
        "surface": "#FFFFFF",          // 卡片/底板
        "on-surface": "#1F2933",       // 卡片文字
        "surface-variant": "#F6F8FA",  // 次要背景
        "on-surface-variant": "#667085", // 次要文字
        "outline": "#D7DEE8",          // 边框
        "outline-variant": "#E8EDF2",  // 淡边框
        
        // Semantic overrides
        "secondary": "#123E46",
        "on-secondary": "#ffffff",
        "secondary-container": "#E8F4F6",
        "on-secondary-container": "#0F5B66",
        
        // 状态色
        "success": "#2E7D59",          // 成功/出票
        "warning": "#B76F26",          // 提醒/规则
        
        // M3 Legacy Mapping (Redirected to New Palette)
        "surface-container-low": "#F6F8FA",
        "surface-container": "#FFFFFF",
        "surface-container-high": "#E8EDF2",
        "surface-container-highest": "#D7DEE8",
        "surface-container-lowest": "#FFFFFF",
        "inverse-surface": "#1F2933",
        "inverse-on-surface": "#F6F8FA",
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

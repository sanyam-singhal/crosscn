/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  darkMode: "class",                  
  theme: {
    extend: {
      colors: {
        background:        { light: '#FDFEFF', dark: '#090040' },
        foreground:        { light: '#090040', dark: '#F0F2F5' },
        card:              { light: '#FFFFFF', dark: '#1A1449' },
        'card-foreground': { light: '#090040', dark: '#F0F2F5' },
        popover:           { light: '#FFFFFF', dark: '#1A1449' },
        'popover-foreground': { light: '#090040', dark: '#F0F2F5' },
        sheet:             { light: '#FFFFFF', dark: '#1A1449' },
        'sheet-foreground': { light: '#090040', dark: '#F0F2F5' },
        primary: {
          DEFAULT:            '#FC6736',
          foreground:         '#FFFFFF',
          dark:               '#FF7A50',
          'dark-foreground':  '#090040',
        },
        secondary: {
          DEFAULT:            '#471396',
          foreground:         '#FFFFFF',
          dark:               '#B13BFF',
          'dark-foreground':  '#090040',
        },
        accent: {
          DEFAULT:            '#FFCC00',
          foreground:         '#090040',
          dark:               '#FFCC00',
          'dark-foreground':  '#090040',
        },
        destructive: {
          DEFAULT:            '#E53E3E',
          foreground:         '#FFFFFF',
          dark:               '#FC8181',
          'dark-foreground':  '#090040',
        },
        muted: {
          DEFAULT:            '#E3A5C7',
          foreground:         '#694F8E',
          dark:               '#3A315F',
          'dark-foreground':  '#B692C2',
        },
      },
      spacing: {
        px: '1px',
        '0': '0px',
        '1': '4px',    
        '2': '8px',    
        '3': '12px',   
        '4': '16px',   
        '5': '20px',   
        '6': '24px',   
        '8': '32px',
        '10':'40px',
        '12':'48px',
      },
      fontSize: {
        xs: ['12px', { lineHeight: '16px' }],  
        sm: ['14px', { lineHeight: '20px' }],
        base: ['16px', { lineHeight: '24px' }],
        lg: ['18px', { lineHeight: '28px' }],
        xl: ['20px', { lineHeight: '28px' }],
        '2xl': ['24px', { lineHeight: '32px' }],
        '3xl': ['30px', { lineHeight: '36px' }],
      },
      boxShadow: {
        sm: '0px 1px 2px rgba(0,0,0,0.05)',
        DEFAULT: '0px 1px 3px rgba(0,0,0,0.1)',
        md: '0px 4px 6px rgba(0,0,0,0.1)',
        lg: '0px 10px 15px rgba(0,0,0,0.1)',
        xl: '0px 20px 25px rgba(0,0,0,0.1)',
        '2xl':'0px 25px 50px rgba(0,0,0,0.25)'
      },
      borderRadius: {
        none: '0px',
        sm: '0.25rem',
        DEFAULT: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
      },
      borderWidth: {
        DEFAULT: '1px',
        0: '0px',
        2: '2px',
        4: '4px',
      },
      opacity: {
        10: '0.1',
        25: '0.25',
        50: '0.5',
        75: '0.75',
      },
      transitionDuration: {
        DEFAULT: '200ms',
        75: '75ms',
        150: '150ms',
        300: '300ms',
        500: '500ms',
      },
      letterSpacing: {
        tighter: '-0.02em',
        tight: '-0.01em',
        normal: '0em',
        wide: '0.01em',
        wider: '0.02em',
      },
      zIndex: {
        0: 0,
        10: 10,
        20: 20,
        30: 30,
        40: 40,
        50: 50,
      },
    },
  },
  plugins: [
    require('tailwindcss/plugin')(function ({ addUtilities }) {
      addUtilities({
        '.shadow-sm-native': {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.20,
          shadowRadius: 1.41,
          elevation: 2,
        },
        '.shadow-md-native': {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.23,
          shadowRadius: 2.62,
          elevation: 4,
        },
      });
    }),
  ],
};

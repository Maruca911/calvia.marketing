import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#007BFF',
          dark: '#0056b3',
          light: '#4da3ff',
        },
        accent: {
          DEFAULT: '#FF8C00',
          dark: '#cc7000',
          light: '#ffa333',
        },
        neutral: {
          black: '#000000',
          white: '#FFFFFF',
          grey: '#808080',
          'grey-light': '#f5f5f5',
          'grey-dark': '#4a4a4a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Montserrat', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'body': ['18px', { lineHeight: '1.7' }],
        'body-sm': ['16px', { lineHeight: '1.6' }],
        'title-sm': ['28px', { lineHeight: '1.3' }],
        'title-md': ['36px', { lineHeight: '1.2' }],
        'title-lg': ['48px', { lineHeight: '1.1' }],
        'title-xl': ['64px', { lineHeight: '1.1' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
    },
  },
  plugins: [
    typography,
  ],
};

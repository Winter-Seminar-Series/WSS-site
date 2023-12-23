/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        manrope: ['manrope', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#9d6d9b',
          100: '#20151f',
          200: '#402a3f',
          300: '#5f405e',
          400: '#7f557d',
          500: '#9d6d9b',
          600: '#b189af',
          700: '#c4a7c3',
          800: '#d8c4d7',
          900: '#ebe2eb',
        },
        secondary: {
          DEFAULT: '#342b4c',
          100: '#0a080f',
          200: '#14111e',
          300: '#1f192d',
          400: '#29223c',
          500: '#342b4c',
          600: '#55477d',
          700: '#7a68aa',
          800: '#a69ac6',
          900: '#d3cde3',
        },
      },
    },
  },
  plugins: [],
};

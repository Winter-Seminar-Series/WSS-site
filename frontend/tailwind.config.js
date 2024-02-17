/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        mobile: "url('../../public/source/mobile.png')",
        desktop: "url('../../public/source/Rectangle.png')",
        navbar: "url('../../public/source/Navbar.png')",
      },
      fontFamily: {
        sans: 'Manrope',
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
        selago: {
          DEFAULT: '#ebe8f2',
          100: '#f3f0f7',
          200: '#ebe8f2',
          300: '#d5cfe3',
          400: '#beb2d3',
          500: '#a593bf',
          600: '#9479ae',
          700: '#81679a',
          800: '#6c5681',
          900: '#59486a',
        },

        white: '#fff',
        darkslategray: {
          100: '#1f2b3d',
          200: 'rgba(10, 46, 79, 0.8)',
        },
        black: '#000',
        gray: {
          100: '#fafafa',
          200: 'rgba(255, 255, 255, 0.4)',
          300: 'rgba(255, 255, 255, 0.8)',
          400: 'rgba(255, 255, 255, 0.6)',
          500: 'rgba(255, 255, 255, 0.3)',
        },
        darkslateblue: '#0b3678',
        lightslategray: '#8a8998',
        whitesmoke: '#e8eaee',
        gainsboro: '#e2e7ef',
        dodgerblue: 'rgba(15, 122, 219, 0.8)',
        red: '#E04545',
      },
      listStyleType: {
        disc: 'disc',
        decimal: 'decimal',
        circle: 'circle',
      },
    },
  },
  plugins: [],
};

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
      colors: {
        white: "#fff",
        darkslategray: {
          "100": "#1f2b3d",
          "200": "rgba(10, 46, 79, 0.8)",
        },
        black: "#000",
        gray: {
          "100": "#fafafa",
          "200": "rgba(255, 255, 255, 0.4)",
          "300": "rgba(255, 255, 255, 0.8)",
          "400": "rgba(255, 255, 255, 0.6)",
          "500": "rgba(255, 255, 255, 0.3)",
        },
        darkslateblue: "#0b3678",
        lightslategray: "#8a8998",
        whitesmoke: "#e8eaee",
        gainsboro: "#e2e7ef",
        dodgerblue: "rgba(15, 122, 219, 0.8)",
      },
      spacing: {},
      fontFamily: {
        manrope: "Manrope",
      },
      borderRadius: {
        "77xl": "96px",
        "21xl": "40px",
        mid: "17px",
        "17xl": "36px",
      },
    },
    fontSize: {
      xl: "20px",
      lg: "18px",
      xs: "12px",
      "9xl": "28px",
      "13xl": "32px",
      "29xl": "48px",
      base: "16px",
      "41xl": "60px",
      "45xl": "64px",
      "33xl": "52px",
      sm: "14px",
      inherit: "inherit",
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};

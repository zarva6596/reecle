/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        accent: '#5F54F6',
        blackPrimary: '#333',
        blackSecondary: '#5A5A5A',
        red: '#EB4E3D',
        gray: {
          1: '#B7B7B7',
          2: '#E2E2E2',
          3: '#EAEAEA',
          4: '#F3F3F3',
          5: '#FAFAFA',
        },
        sail: '#B1D0F6',
        poloBlue: '#84A1C4',
      },
      fontFamily: {
        primary: 'Open Sans, sans-serif',
        secondary: 'Inter, sans-serif',
      },
    },
  },
  plugins: [],
};

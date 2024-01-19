/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors:{
        primary: '#f13a01',
        'cerulean-blue': {
          '50': '#ecf9ff',
          '100': '#d4efff',
          '200': '#b3e5ff',
          '300': '#7fd7ff',
          '400': '#43beff',
          '500': '#189dff',
          '600': '#007bff',
          '700': '#0063fb',
          '800': '#0353d3',
          '900': '#0a469e',
          '950': '#0c2b5f',
      },
      }
    },
  },
  plugins: [],
}

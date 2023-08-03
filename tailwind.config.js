/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: '#000DFF',
        'primary-darker': '#000acc',
        'primary-lighter': '#333dff',
        secondary: '#FFC107',
        'secondary-darker': '#e6ac00',
        'secondary-lighter': '#ffcc33',
        'primary-alt': '#3A42DA',
        'primary-alt-darker': '#252dc1',
        'primary-alt-lighter': '#545bde',
      },
    },
  },
  plugins: [],
};

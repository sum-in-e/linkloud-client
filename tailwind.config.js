/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: '#000DFF',
        'primary-darker': '#000acc',
        'primary-lighter': '#000acc',
        secondary: '#FFC107',
        'secondary-darker': '#e6ac00',
        'secondary-lighter': '#ffcc33',
      },
    },
  },
  plugins: [],
};

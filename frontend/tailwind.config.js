import colors from 'tailwindcss/colors';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        stone: colors.warmGray,
        slate: colors.slate,
        gray: colors.gray,
      },
    },
  },
  plugins: [],
};

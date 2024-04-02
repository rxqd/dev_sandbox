/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mine: {
          "primary": "#155e75",
          "secondary": "#0891b2",
          "accent": "#0069a6",
          "neutral": "#164e63",
          "base-100": "#e7e5e4",
          "info": "#0d9488",
          "success": "#155e75",
          "warning": "#fde047",
          "error": "#b91c1c",
        },
        mine_dark: {
          "primary": "#155e75",
          "secondary": "#0891b2",
          "accent": "#0069a6",
          "neutral": "#164e63",
          "base-100": "#20161f",
          "info": "#0d9488",
          "success": "#155e75",
          "warning": "#fde047",
          "error": "#b91c1c",
        },

      },
    ],
  },
}


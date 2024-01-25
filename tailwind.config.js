/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "370px",
      sm: "550px",
      md: "744px",
      lg: "950px",
      xl: "1128px",
      "2xl": "1640px",
      "3xl": "1880px",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "main-50": "#f2f6fd",
        "main-100": "#e4ebfa",
        "main-200": "#c2d5f5",
        "main-300": "#8db4ec",
        "main-400": "#508ee0",
        "main-500": "#2a70cd",
        "main-550": "#1d62ba",
        "main-600": "#1b55ae",
        "main-700": "#17448d",
        "main-800": "#173b75",
        "main-900": "#183362",
        "main-950": "#060c18",
      },
    },
  },
  plugins: [],
};

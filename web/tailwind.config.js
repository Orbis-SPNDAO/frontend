/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Configure your color palette here
        "custom-blue": "#F1F4F9",
        "table-header-blue": '#E6EDF9',
        "custom-purple": "#5D5FEF",
        "custom-border": "#B4B4B4",
        "custom-gray": "#828282",
        "error-red": "#FF0420"
      },
    },
  },
  plugins: [],
};

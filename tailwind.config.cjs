module.exports = {
  mode: "jit",
  purge: ["./src/**/*.svelte", "./src/**/*.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        iphone5: { max: "320px" },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("tailwindcss-textshadow")],
};

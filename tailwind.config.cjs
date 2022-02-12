module.exports = {
  content: ["./src/**/*.{svelte,html}"],
  theme: {
    extend: {
      colors: {
        theme: "#ef8ebe",
      },

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

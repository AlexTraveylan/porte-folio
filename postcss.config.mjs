/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
  },
  "postcss-preset-env": {},
  cssnano: {
    preset: "default",
  },
}

export default config

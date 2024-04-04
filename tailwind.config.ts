import typographyPlugin from "@tailwindcss/typography"
import daisyUIPlugin from "daisyui"
import defaultTheme from "tailwindcss/defaultTheme"
import { type Config } from "tailwindcss"

import typographyStyles from "./typography"

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    typography: typographyStyles,
    extend: {
      fontFamily: {
        serif: ['"Source Serif 4 Variable"', ...defaultTheme.fontFamily.serif],
        sans: ['"Inter Variable"', ...defaultTheme.fontFamily.sans],
        heading: ['"Fira Sans"', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        congress: {
          "50": "oklch(98.18% 0.03 157.40 / <alpha-value>)",
          "100": "oklch(96.12% 0.06 161.35 / <alpha-value>)",
          "200": "oklch(93.69% 0.10 163.88 / <alpha-value>)",
          "300": "oklch(90.84% 0.14 164.57 / <alpha-value>)",
          "400": "oklch(89.41% 0.17 169.51 / <alpha-value>)",
          "500": "oklch(90.06% 0.16 186.72 / <alpha-value>)",
          "600": "oklch(81.60% 0.15 216.50 / <alpha-value>)",
          "700": "oklch(69.81% 0.17 243.77 / <alpha-value>)",
          "800": "oklch(55.56% 0.18 253.81 / <alpha-value>)",
          "900": "oklch(39.56% 0.13 254.79 / <alpha-value>)",
          DEFAULT: "oklch(39.56% 0.13 254.79 / <alpha-value>)",
          "950": "oklch(29.91% 0.11 260.76 / <alpha-value>)",
        },
      },
    },
  },
  plugins: [
    typographyPlugin({
      className: "article",
    }),
    daisyUIPlugin,
  ],
} satisfies Config

import typographyPlugin from "@tailwindcss/typography"
import defaultTheme from "tailwindcss/defaultTheme"
import { type Config } from "tailwindcss"

import typographyStyles from "./typography"

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontSize: {
      xs: ["0.8125rem", { lineHeight: "1.5rem" }],
      sm: ["0.875rem", { lineHeight: "1.5rem" }],
      base: ["1rem", { lineHeight: "1.75rem" }],
      lg: ["1.125rem", { lineHeight: "1.75rem" }],
      xl: ["1.25rem", { lineHeight: "2rem" }],
      "2xl": ["1.5rem", { lineHeight: "2rem" }],
      "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
      "4xl": ["2rem", { lineHeight: "2.5rem" }],
      "5xl": ["3rem", { lineHeight: "3.5rem" }],
      "6xl": ["3.75rem", { lineHeight: "1" }],
      "7xl": ["4.5rem", { lineHeight: "1" }],
      "8xl": ["6rem", { lineHeight: "1" }],
      "9xl": ["8rem", { lineHeight: "1" }],
    },
    typography: typographyStyles,
    extend: {
      fontFamily: {
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
  plugins: [require("daisyui"), typographyPlugin],
} satisfies Config

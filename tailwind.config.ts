import typographyPlugin from "@tailwindcss/typography"
import daisyUIPlugin from "daisyui"
import defaultTheme from "tailwindcss/defaultTheme"
import { type Config } from "tailwindcss"

import type { PluginUtils } from "tailwindcss/types/config"

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  daisyui: {
    themes: [
      {
        light: {
          primary: "oklch(60% 0.15 165)",
          "primary-content": "oklch(95% 0.05 165)",
          secondary: "oklch(95% 0.01 165)",
          accent: "oklch(90% 0.17 150)",
          neutral: "oklch(30% 0.06 240)",
          "base-100": "oklch(98% 0.01 240)",
        },
      },
      {
        dark: {
          primary: "oklch(75% 0.15 165)",
          secondary: "oklch(80% 0.09 240)",
          accent: "oklch(75% 0.15 165)",
          neutral: "oklch(98% 0.01 240)",
          "base-100": "oklch(30% 0.06 240)",
        },
      },
    ],
  },
  theme: {
    extend: {
      typography: ({ theme }: PluginUtils) => ({
        DEFAULT: {
          css: {
            fontFamily: theme("fontFamily.serif").join(", "),
            fontSize: "1.075rem",
            textAlign: "justify",
            lineHeight: "1.6125rem",
          },
        },
      }),
      fontFamily: {
        serif: ['"Source Serif 4 Variable"', ...defaultTheme.fontFamily.serif],
        sans: ['"Inter Variable"', ...defaultTheme.fontFamily.sans],
        heading: ['"Fira Sans"', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        science: {
          "100": "#FFFFFF",
          "200": "#ECF0FF",
          "300": "#C5D4FF",
          "400": "#84AAFF",
          "500": "#498FFF",
          "600": "#007AF0",
          "700": "#0069D0",
          DEFAULT: "#0069D0",
          "800": "#0051A2",
          "900": "#003A79",
          "950": "#002451",
        },
      },
    },
  },
  plugins: [typographyPlugin, daisyUIPlugin],
} satisfies Config

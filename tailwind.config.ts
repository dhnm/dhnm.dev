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
          primary: "oklch(51.47% 0.091 183.77)",
          secondary: "oklch(95.66% 0.007 286.27)",
          accent: "oklch(66.08% 0.181 259.45)",
          neutral: "oklch(26.73% 0.017 280.2)",
          "base-100": "oklch(100% 0 0)",
        },
      },
      {
        dark: {
          primary: "oklch(72.65% 0.1 185.23)",
          secondary: "oklch(35.37% 0.022 285.2)",
          accent: "oklch(59.16% 0.199 255.62)",
          neutral: "oklch(95.66% 0.007 286.27)",
          "base-100": "oklch(26.73% 0.017 280.2)",
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
            fontSize: theme("fontSize.lg")[0],
            textAlign: "justify",
            lineHeight: theme("lineHeight.8"), // 2rem
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

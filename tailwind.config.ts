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
          primary: "#059669",
          "primary-content": "#ccfbf1",
          secondary: "#e0f2fe",
          accent: "#6ee7b7",
          neutral: "#082f49",
          "base-100": "#f0f9ff",
        },
      },
      {
        dark: {
          primary: "#34d399",
          secondary: "#0c4a6e",
          accent: "#34d399",
          neutral: "#f0f9ff",
          "base-100": "#082f49",
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

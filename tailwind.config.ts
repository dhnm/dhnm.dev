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
          primary: "#02786D",
          secondary: "#696979",
          accent: "#498FFF",
          neutral: "#24252E",
          "base-100": "#FFFFFF",
        },
      },
      {
        dark: {
          primary: "#50BBAF",
          secondary: "#AAAAB9",
          accent: "#007AF0",
          neutral: "#F0F0F5",
          "base-100": "#24252E",
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

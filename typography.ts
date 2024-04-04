import { type PluginUtils } from "tailwindcss/types/config"

export default function typographyStyles({ theme }: PluginUtils) {
  return {
    invert: {
      css: {
        "--tw-article-body": "var(--tw-article-invert-body)",
        "--tw-article-headings": "var(--tw-article-invert-headings)",
        "--tw-article-links": "var(--tw-article-invert-links)",
        "--tw-article-links-hover": "var(--tw-article-invert-links-hover)",
        "--tw-article-underline": "var(--tw-article-invert-underline)",
        "--tw-article-underline-hover":
          "var(--tw-article-invert-underline-hover)",
        "--tw-article-bold": "var(--tw-article-invert-bold)",
        "--tw-article-counters": "var(--tw-article-invert-counters)",
        "--tw-article-bullets": "var(--tw-article-invert-bullets)",
        "--tw-article-hr": "var(--tw-article-invert-hr)",
        "--tw-article-quote-borders": "var(--tw-article-invert-quote-borders)",
        "--tw-article-captions": "var(--tw-article-invert-captions)",
        "--tw-article-code": "var(--tw-article-invert-code)",
        "--tw-article-code-bg": "var(--tw-article-invert-code-bg)",
        "--tw-article-pre-code": "var(--tw-article-invert-pre-code)",
        "--tw-article-pre-bg": "var(--tw-article-invert-pre-bg)",
        "--tw-article-pre-border": "var(--tw-article-invert-pre-border)",
        "--tw-article-th-borders": "var(--tw-article-invert-th-borders)",
        "--tw-article-td-borders": "var(--tw-article-invert-td-borders)",
      },
    },
    DEFAULT: {
      css: {
        "--tw-article-body": theme("colors.stone.600"),
        "--tw-article-headings": theme("colors.stone.900"),
        "--tw-article-links": theme("colors.congress.800"),
        "--tw-article-links-hover": theme("colors.congress.900"),
        "--tw-article-underline": theme("colors.congress.800 / 0.2"),
        "--tw-article-underline-hover": theme("colors.congress.800"),
        "--tw-article-bold": theme("colors.stone.900"),
        "--tw-article-counters": theme("colors.stone.900"),
        "--tw-article-bullets": theme("colors.stone.900"),
        "--tw-article-hr": theme("colors.stone.100"),
        "--tw-article-quote-borders": theme("colors.stone.200"),
        "--tw-article-captions": theme("colors.stone.400"),
        "--tw-article-code": theme("colors.stone.700"),
        "--tw-article-code-bg": theme("colors.stone.300 / 0.2"),
        "--tw-article-pre-code": theme("colors.stone.100"),
        "--tw-article-pre-bg": theme("colors.stone.900"),
        "--tw-article-pre-border": "transparent",
        "--tw-article-th-borders": theme("colors.stone.200"),
        "--tw-article-td-borders": theme("colors.stone.100"),

        "--tw-article-invert-body": theme("colors.stone.400"),
        "--tw-article-invert-headings": theme("colors.stone.200"),
        "--tw-article-invert-links": theme("colors.congress.600"),
        "--tw-article-invert-links-hover": theme("colors.congress.500"),
        "--tw-article-invert-underline": theme("colors.congress.600 / 0.3"),
        "--tw-article-invert-underline-hover": theme("colors.congress.600"),
        "--tw-article-invert-bold": theme("colors.stone.200"),
        "--tw-article-invert-counters": theme("colors.stone.200"),
        "--tw-article-invert-bullets": theme("colors.stone.200"),
        "--tw-article-invert-hr": theme("colors.stone.700 / 0.4"),
        "--tw-article-invert-quote-borders": theme("colors.stone.500"),
        "--tw-article-invert-captions": theme("colors.stone.500"),
        "--tw-article-invert-code": theme("colors.stone.300"),
        "--tw-article-invert-code-bg": theme("colors.stone.200 / 0.05"),
        "--tw-article-invert-pre-code": theme("colors.stone.100"),
        "--tw-article-invert-pre-bg": "rgb(0 0 0 / 0.4)",
        "--tw-article-invert-pre-border": theme("colors.stone.200 / 0.1"),
        "--tw-article-invert-th-borders": theme("colors.stone.700"),
        "--tw-article-invert-td-borders": theme("colors.stone.800"),

        // Base
        "> *": {
          marginTop: theme("spacing.10"),
          marginBottom: theme("spacing.10"),
        },
        p: {
          fontSize: theme("fontSize.lg")[0],
          fontFamily: theme("fontFamily.serif").join(", "),
          color: "var(--tw-article-body)",
          textAlign: "justify",
          lineHeight: theme("lineHeight.8"), // 2rem
          marginTop: theme("spacing.7"),
          marginBottom: theme("spacing.7"),
        },

        // Headings
        "h2, h3": {
          color: "var(--tw-article-headings)",
          fontWeight: theme("fontWeight.semibold"),
        },
        h2: {
          fontSize: theme("fontSize.2xl")[0],
          lineHeight: theme("lineHeight.9"),
          marginTop: theme("spacing.20"),
          marginBottom: theme("spacing.4"),
        },
        h3: {
          fontSize: theme("fontSize.xl")[0],
          lineHeight: theme("lineHeight.8"),
          marginTop: theme("spacing.16"),
          marginBottom: theme("spacing.4"),
        },
        ":is(h2, h3) + *": {
          marginTop: 0,
        },

        // Images
        img: {
          borderRadius: theme("borderRadius.3xl"),
        },

        // Inline elements
        a: {
          color: "var(--tw-article-links)",
          fontWeight: theme("fontWeight.semibold"),
          textDecoration: "underline",
          textDecorationColor: "var(--tw-article-underline)",
          transitionProperty: "color, text-decoration-color",
          transitionDuration: theme("transitionDuration.150"),
          transitionTimingFunction: theme("transitionTimingFunction.in-out"),
        },
        "a:hover": {
          color: "var(--tw-article-links-hover)",
          textDecorationColor: "var(--tw-article-underline-hover)",
        },
        strong: {
          color: "var(--tw-article-bold)",
          fontWeight: theme("fontWeight.semibold"),
        },
        code: {
          display: "inline-block",
          color: "var(--tw-article-code)",
          fontSize: theme("fontSize.base")[0],
          fontWeight: theme("fontWeight.semibold"),
          backgroundColor: "var(--tw-article-code-bg)",
          borderRadius: theme("borderRadius.lg"),
          paddingLeft: theme("spacing.1"),
          paddingRight: theme("spacing.1"),
        },
        "a code": {
          color: "inherit",
        },
        ":is(h2, h3) code": {
          fontWeight: theme("fontWeight.bold"),
        },

        // Quotes
        blockquote: {
          paddingLeft: theme("spacing.6"),
          borderLeftWidth: theme("borderWidth.2"),
          borderLeftColor: "var(--tw-article-quote-borders)",
          fontStyle: "italic",
        },

        // Figures
        figcaption: {
          color: "var(--tw-article-captions)",
          fontSize: theme("fontSize.base")[0],
          lineHeight: theme("lineHeight.6"),
          marginTop: theme("spacing.3"),
        },
        "figcaption > p": {
          margin: 0,
        },

        // Lists
        ul: {
          listStyleType: "disc",
        },
        ol: {
          listStyleType: "decimal",
        },
        "ul, ol": {
          paddingLeft: theme("spacing.6"),
        },
        li: {
          marginTop: theme("spacing.6"),
          marginBottom: theme("spacing.6"),
          paddingLeft: theme("spacing[3.5]"),
        },
        "li::marker": {
          fontSize: theme("fontSize.base")[0],
          fontWeight: theme("fontWeight.semibold"),
        },
        "ol > li::marker": {
          color: "var(--tw-article-counters)",
        },
        "ul > li::marker": {
          color: "var(--tw-article-bullets)",
        },
        "li :is(ol, ul)": {
          marginTop: theme("spacing.4"),
          marginBottom: theme("spacing.4"),
        },
        "li :is(li, p)": {
          marginTop: theme("spacing.3"),
          marginBottom: theme("spacing.3"),
        },

        // Code blocks
        pre: {
          color: "var(--tw-article-pre-code)",
          fontSize: theme("fontSize.base")[0],
          fontWeight: theme("fontWeight.medium"),
          backgroundColor: "var(--tw-article-pre-bg)",
          borderRadius: theme("borderRadius.3xl"),
          padding: theme("spacing.8"),
          overflowX: "auto",
          border: "1px solid",
          borderColor: "var(--tw-article-pre-border)",
        },
        "pre code": {
          display: "inline",
          color: "inherit",
          fontSize: "inherit",
          fontWeight: "inherit",
          backgroundColor: "transparent",
          borderRadius: 0,
          padding: 0,
        },

        // Horizontal rules
        hr: {
          marginTop: theme("spacing.20"),
          marginBottom: theme("spacing.20"),
          borderTopWidth: "1px",
          borderColor: "var(--tw-article-hr)",
          "@screen lg": {
            marginLeft: `calc(${theme("spacing.12")} * -1)`,
            marginRight: `calc(${theme("spacing.12")} * -1)`,
          },
        },

        // Tables
        table: {
          width: "100%",
          tableLayout: "auto",
          textAlign: "left",
          fontSize: theme("fontSize.base")[0],
        },
        thead: {
          borderBottomWidth: "1px",
          borderBottomColor: "var(--tw-article-th-borders)",
        },
        "thead th": {
          color: "var(--tw-article-headings)",
          fontWeight: theme("fontWeight.semibold"),
          verticalAlign: "bottom",
          paddingBottom: theme("spacing.2"),
        },
        "thead th:not(:first-child)": {
          paddingLeft: theme("spacing.2"),
        },
        "thead th:not(:last-child)": {
          paddingRight: theme("spacing.2"),
        },
        "tbody tr": {
          borderBottomWidth: "1px",
          borderBottomColor: "var(--tw-article-td-borders)",
        },
        "tbody tr:last-child": {
          borderBottomWidth: 0,
        },
        "tbody td": {
          verticalAlign: "baseline",
        },
        tfoot: {
          borderTopWidth: "1px",
          borderTopColor: "var(--tw-article-th-borders)",
        },
        "tfoot td": {
          verticalAlign: "top",
        },
        ":is(tbody, tfoot) td": {
          paddingTop: theme("spacing.2"),
          paddingBottom: theme("spacing.2"),
        },
        ":is(tbody, tfoot) td:not(:first-child)": {
          paddingLeft: theme("spacing.2"),
        },
        ":is(tbody, tfoot) td:not(:last-child)": {
          paddingRight: theme("spacing.2"),
        },
      },
    },
  }
}

import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["var(--font-heading)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      colors: {
        bg: "rgb(var(--color-bg) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        "surface-raised": "rgb(var(--color-surface-raised) / <alpha-value>)",
        border: "rgb(var(--color-border) / <alpha-value>)",
        text: "rgb(var(--color-text) / <alpha-value>)",
        "text-muted": "rgb(var(--color-text-muted) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
        line: {
          "enterprise-integration": "rgb(var(--line-enterprise-integration) / <alpha-value>)",
          mulesoft: "rgb(var(--line-mulesoft) / <alpha-value>)",
          "cloud-integration": "rgb(var(--line-cloud-integration) / <alpha-value>)",
          "sap-btp": "rgb(var(--line-sap-btp) / <alpha-value>)",
          "data-engineering": "rgb(var(--line-data-engineering) / <alpha-value>)",
          "data-engineering-cloud": "rgb(var(--line-data-engineering-cloud) / <alpha-value>)",
          postgresql: "rgb(var(--line-postgresql) / <alpha-value>)",
          "implementation-engineer": "rgb(var(--line-implementation-engineer) / <alpha-value>)",
          "forward-deployed": "rgb(var(--line-forward-deployed) / <alpha-value>)",
          "ai-engineer": "rgb(var(--line-ai-engineer) / <alpha-value>)",
          "anthropic-training": "rgb(var(--line-anthropic-training) / <alpha-value>)",
        },
      },
      borderRadius: {
        station: "var(--radius-station)",
      },
    },
  },
  plugins: [],
};

export default config;

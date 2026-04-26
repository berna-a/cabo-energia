import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        sm: "100%",
        md: "100%",
        lg: "1120px",
        xl: "1200px",
        "2xl": "1200px",
      },
    },
    extend: {
      fontFamily: {
      display: ['Montserrat', 'system-ui', 'sans-serif'],
      sans: ['Montserrat', 'system-ui', 'sans-serif'],
    },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        brand: {
          green: "hsl(var(--brand-green))",
          "green-deep": "hsl(var(--brand-green-deep))",
          "green-soft": "hsl(var(--brand-green-soft))",
          yellow: "hsl(var(--brand-yellow))",
          "yellow-deep": "hsl(var(--brand-yellow-deep))",
        },
        surface: {
          DEFAULT: "hsl(var(--surface))",
          muted: "hsl(var(--surface-muted))",
          dark: "hsl(var(--surface-dark))",
        },
        ink: {
          DEFAULT: "hsl(var(--ink))",
          soft: "hsl(var(--ink-soft))",
          muted: "hsl(var(--ink-muted))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        pill: "var(--radius-pill)",
      },
      maxWidth: {
        prose: "680px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        ignite: {
          "0%":   { backgroundPosition: "100% 50%", boxShadow: "0 8px 24px -12px hsl(var(--brand-green-deep)/0.6), inset 0 0 0 0 hsl(var(--brand-yellow)/0)" },
          "35%":  { backgroundPosition: "0% 50%",   boxShadow: "0 0 0 6px hsl(var(--brand-yellow)/0.25), 0 18px 48px -16px hsl(var(--brand-yellow)/0.55), inset 0 0 24px 0 hsl(var(--brand-yellow)/0.45)" },
          "70%":  { backgroundPosition: "0% 50%",   boxShadow: "0 0 0 10px hsl(var(--brand-yellow)/0.0),  0 14px 36px -14px hsl(var(--brand-yellow)/0.45), inset 0 0 18px 0 hsl(var(--brand-yellow)/0.25)" },
          "100%": { backgroundPosition: "100% 50%", boxShadow: "0 8px 24px -12px hsl(var(--brand-green-deep)/0.6), inset 0 0 0 0 hsl(var(--brand-yellow)/0)" },
        },
        "spark-sweep": {
          "0%":   { transform: "translateX(-120%) skewX(-18deg)", opacity: "0" },
          "20%":  { opacity: "1" },
          "100%": { transform: "translateX(220%) skewX(-18deg)",  opacity: "0" },
        },
        "lights-on": {
          "0%":   { opacity: "0.15" },
          "60%":  { opacity: "1" },
          "100%": { opacity: "0.85" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in-up": "fade-in-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        shimmer: "shimmer 2.4s linear infinite",
        ignite: "ignite 900ms cubic-bezier(0.22, 1, 0.36, 1)",
        "spark-sweep": "spark-sweep 900ms cubic-bezier(0.22, 1, 0.36, 1)",
        "lights-on": "lights-on 600ms ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

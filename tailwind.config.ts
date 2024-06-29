import type { Config } from "tailwindcss";
const plugin = require("tailwindcss/plugin");

const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./templates/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      "3xl": { max: "1579px" },
      // => @media (max-width: 1579px) { ... }
      "2xl": { max: "1419px" },
      // => @media (max-width: 1419px) { ... }
      xl: { max: "1259px" },
      // => @media (max-width: 1259px) { ... }
      lg: { max: "1023px" },
      // => @media (max-width: 1023px) { ... }
      md: { max: "767px" },
      // => @media (max-width: 767px) { ... }
      sm: { max: "480px" },
      // => @media (max-width: 480px) { ... }
    },
    extend: {
      colors: {
        "theme-on-surface-1": "var(--on-surface-1)",
        "theme-on-surface-2": "var(--on-surface-2)",
        "theme-on-surface-3": "var(--on-surface-3)",
        "theme-on-surface": "var(--on-surface)",
        "theme-surface-dark": "var(--on-surface-dark)",
        "theme-surface-pure": "var(--on-surface-pure)",
        "theme-stroke": "var(--stroke)",
        "theme-primary": "var(--primary)",
        "theme-primary-fixed": "var(--primary-fixed)",
        "theme-secondary": "var(--secondary)",
        "theme-tertiary": "var(--tertiary)",
        "theme-white-fixed": "var(--white-fixed)",
        "theme-light": "var(--light)",
        "theme-n-8": "var(--n-8)",
        "theme-brand-100": "var(--brand-100)",
        "theme-red-100": "var(--red-100)",
        "theme-green-100": "var(--green-100)",
        "theme-border-brand": "var(--border-brand)",
        "theme-yellow-100": "var(--yellow-100)",
        "theme-purple-100": "var(--purple-100)",
        "theme-purple-300": "var(--purple-300)",
        "theme-yellow-50": "var(--yellow-50)",
        "theme-dune": "var(--dune)",
        "theme-green": "var(--green)",
        "theme-red": "var(--red)",
        "theme-purple": "var(--purple)",
        "theme-yellow": "var(--yellow)",
        "theme-brand": "var(--brand)",
        n: {
          0: "#FFFFFF",
          1: "#FCFCFC",
          2: "#F4F4F4",
          3: "#EFEFEF",
          4: "#6F767E",
          5: "#33383F",
          6: "#272B30",
          7: "#1A1D1F",
          8: "#111315",
        },
        primary: {
          1: "#0C68E9",
          2: "#32AE60",
          3: "#F04D1A",
          4: "#B981DA",
          5: "#FBA94B",
        },
        secondary: {
          1: "#EF8869",
          2: "#FBE64D",
          3: "#7D5DFF",
          4: "#998AE2",
        },
        red: {
          50: "#FEF4EE",
          100: "#FDE6D7",
          200: "#FBCAAD",
          300: "#F8A479",
          400: "#F47543",
          500: "#F04D1A",
          600: "#E13815",
          700: "#BB2713",
          800: "#952117",
          900: "#781E16",
          950: "#410B09",
        },
        brand: {
          50: "#EEF9FF",
          100: "#D8F0FF",
          200: "#B9E5FF",
          300: "#89D6FF",
          400: "#52BFFF",
          500: "#2A9FFF",
          600: "#1380FD",
          700: "#0C68E9",
          800: "#1153BC",
          900: "#144994",
          950: "#112D5A",
        },
        green: {
          50: "#F1FCF5",
          100: "#DFF9E8",
          200: "#C1F1D2",
          300: "#91E4AF",
          400: "#5ACE84",
          500: "#32AE60",
          600: "#25944E",
          700: "#217440",
          800: "#1F5C36",
          900: "#1B4C2E",
          950: "#092A17",
        },
        levender: {
          50: "#FBF7FD",
          100: "#F5EDFA",
          200: "#ECDDF7",
          300: "#DDC3EF",
          400: "#C89CE4",
          500: "#B981DA",
          600: "#9E58C5",
          700: "#8844AC",
          800: "#713C8D",
          900: "#5D3172",
          950: "#3F1A51",
        },
        yellow: {
          50: "#FFF6EB",
          100: "#FEE6C7",
          200: "#FCCC8B",
          300: "#FBA94B",
          400: "#FA8D25",
          500: "#F4680C",
          600: "#D84707",
          700: "#B32C0A",
          800: "#91220F",
          900: "#771D10",
          950: "#450B03",
        },
      },
      zIndex: {
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
      },
      spacing: {
        0.25: "0.0625rem",
        0.75: "0.1875rem",
        4.5: "1.125rem",
        5.5: "1.375rem",
        6.5: "1.75rem",
        7.5: "1.875rem",
        8.5: "2.125rem",
        9.5: "2.375rem",
        13: "3.25rem",
        15: "3.75rem",
        17: "4.25rem",
        18: "4.5rem",
        19: "4.75rem",
        21: "5.25rem",
        22: "5.5rem",
        26: "6.5rem",
        30: "7.5rem",
        34: "8.5rem",
        38: "9.5rem",
        42: "10.5rem",
        46: "11.5rem",
        54: "13.5rem",
        58: "14.5rem",
        66: "16.5rem",
        76: "19rem",
      },
      transitionDuration: {
        DEFAULT: "200ms",
      },
      transitionTimingFunction: {
        DEFAULT: "linear",
      },
      borderWidth: {
        DEFAULT: "0.0625rem",
        0: "0",
        2: "0.125rem",
        4: "0.25rem",
        8: "0.5rem",
      },
      boxShadow: {
        "depth-1":
          "0px 0px 14px -4px rgba(0, 0, 0, 0.05), 0px 32px 48px -8px rgba(0, 0, 0, 0.10)",
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
        "inter-display": ["var(--font-inter-display)"],
      },
      fontSize: {
        0: ["0px", "0px"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar"),
    require("@headlessui/tailwindcss")({ prefix: "ui" }),
    plugin(function ({ addBase, addComponents, addUtilities }: any) {
      addBase({
        html: {
          "@apply text-[1rem]": {},
        },
      });
      addComponents({
        ".text-display": {
          "@apply font-inter-display text-[5rem] leading-none font-semibold -tracking-[.03em]":
            {},
        },
        ".text-h1": {
          "@apply font-inter-display text-[4rem] leading-none font-semibold -tracking-[.03em]":
            {},
        },
        ".text-h2": {
          "@apply font-inter-display text-[3rem] leading-[3.5rem] font-semibold -tracking-[.03em]":
            {},
        },
        ".text-h3": {
          "@apply font-inter-display text-[2.5rem] leading-[3rem] font-semibold -tracking-[.02em]":
            {},
        },
        ".text-h4": {
          "@apply font-inter-display text-[2rem] leading-[2.5rem] font-semibold -tracking-[.03em]":
            {},
        },
        ".text-h5": {
          "@apply font-inter-display text-[1.5rem] leading-[2rem] font-semibold":
            {},
        },
        ".text-title-1s": {
          "@apply font-inter-display text-[1.25rem] leading-[2rem] font-semibold -tracking-[.01em]":
            {},
        },
        ".text-title-1m": {
          "@apply font-inter-display text-[1.25rem] leading-[2rem] font-medium -tracking-[.02em]":
            {},
        },
        ".text-base-1s": {
          "@apply text-[0.9375rem] leading-[1.5rem] font-semibold -tracking-[.005em]":
            {},
        },
        ".text-base-1b": {
          "@apply text-[0.9375rem] leading-[1.5rem] font-bold -tracking-[.01em]":
            {},
        },
        ".text-base-2": {
          "@apply text-[0.875rem] leading-[1.5rem] font-semibold -tracking-[.01em]":
            {},
        },
        ".text-body-1m": {
          "@apply text-[0.9375rem] leading-[1.5rem] font-medium -tracking-[.015em]":
            {},
        },
        ".text-body-1s": {
          "@apply text-[0.9375rem] leading-[1.5rem] font-semibold -tracking-[.01em]":
            {},
        },
        ".text-body-2s": {
          "@apply text-[0.875rem] leading-[1.25rem] font-semibold": {},
        },
        ".text-caption-1": {
          "@apply text-[0.8125rem] leading-[1.25rem] font-semibold -tracking-[.01em]":
            {},
        },
        "text-caption-1m": {
          "@apply text-[0.8125rem] leading-[1.25rem] font-medium -tracking-[.01em]":
            {},
        },
        ".text-caption-2": {
          "@apply text-[0.75rem] leading-[1rem] font-bold -tracking-[.01em]":
            {},
        },
        ".text-caption-2m": {
          "@apply text-[0.75rem] leading-[1rem] font-medium": {},
        },
        ".text-button-1": {
          "@apply text-[0.9375rem] leading-[1.5rem] font-bold -tracking-[.01em]":
            {},
        },
        ".text-button-2": {
          "@apply font-inter-display text-[0.8125rem] leading-[1.5rem] font-bold":
            {},
        },
        ".btn": {
          "@apply inline-flex items-center justify-center h-12 px-5.5 border-2 border-transparent rounded-full text-button-1 text-theme-light fill-theme-light transition-colors disabled:pointer-events-none":
            {},
        },
        ".btn svg": {
          "@apply fill-inherit first:mr-2 last:ml-2": {},
        },
        ".btn-primary": {
          "@apply btn bg-theme-brand border-theme-brand hover:bg-brand-600 hover:border-brand-600 dark:text-n-1":
            {},
        },
        ".btn-secondary": {
          "@apply btn bg-theme-primary border-theme-primary hover:bg-[#313435] hover:border-[#313435] dark:hover:text-n-1 dark:hover:fill-n-1":
            {},
        },
        ".btn-gray": {
          "@apply btn bg-theme-on-surface-2 border-theme-on-surface-2 text-theme-secondary hover:bg-theme-primary hover:border-theme-primary hover:text-theme-light":
            {},
        },
        ".btn-red": {
          "@apply btn bg-theme-red border-theme-red text-white hover:bg-red-600 hover:border-red-600":
            {},
        },
        ".btn-stroke": {
          "@apply btn bg-transparent border-theme-stroke text-theme-primary hover:bg-theme-stroke":
            {},
        },
        ".btn-square": {
          "@apply inline-flex justify-center items-center w-10 h-10 border-2 border-theme-stroke rounded-xl text-0 fill-theme-secondary transition-colors hover:bg-theme-stroke hover:fill-theme-primary":
            {},
        },
        ".btn-square svg": {
          "@apply !w-4 !h-4 fill-inherit transition-colors": {},
        },
        ".card": {
          "@apply p-6 bg-theme-on-surface-1 rounded-2xl md:p-4": {},
        },
        ".card-sidebar": {
          "@apply card shrink-0 w-[21.25rem] ml-2 2xl:w-76 lg:w-full lg:ml-0 lg:mt-2":
            {},
        },
        ".crypto-logo": {
          "@apply opacity-100 rounded-full overflow-hidden dark:bg-theme-white-fixed dark:shadow-[0_0_0_0.0625rem_#6F767E]":
            {},
        },
      });
      addUtilities({
        ".tap-highlight-color": {
          "-webkit-tap-highlight-color": "rgba(0, 0, 0, 0)",
        },
        ".input-caret-color": {
          "caret-color": "#0C68E9",
        },
      });
    }),
  ],
};
export default config;

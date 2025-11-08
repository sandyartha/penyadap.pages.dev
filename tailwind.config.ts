import type { Config } from "tailwindcss";
import typography from '@tailwindcss/typography';
import plugin from 'tailwindcss/plugin';

export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
    "./node_modules/@nuxt/ui/dist/**/*.{mjs,js,vue,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f3f3ff',
          100: '#e9e9fe',
          200: '#d6d6fe',
          300: '#b9b8fd',
          400: '#9795fa',
          500: '#7b78f6',
          600: '#5d59eb',
          700: '#4e4ad3',
          800: '#413eab',
          900: '#373689',
          950: '#201f4d'
        }
      },
      boxShadow: {
        zoop: "rgba(102, 109, 128, 0.08) 0px 1.2672px 1.2672px 0px, rgba(102, 109, 128, 0.08) 0px 5.06879px 10.1376px 0px",
        zoopdark:
          "rgba(10, 10, 10, 0.2) 0px 1.2672px 1.2672px 0px, rgba(10, 10, 10, 0.2) 0px 5.06879px 10.1376px 0px",
      }
    },
    fontFamily: {
      sans: [
        "Inter",
        "Avenir Next",
        "Roboto",
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Ubuntu",
        '"Helvetica Neue"',
        "Arial",
        '"Noto Sans"',
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ],
      mono: [
        "Cascadia Code",
        "ui-monospace",
        "SFMono-Regular",
        "Menlo",
        "Monaco",
        "Consolas",
        "Liberation Mono",
        "Courier New",
        "monospace",
      ],
    },
  },
  darkMode: 'class',
  safelist: [
    'outline-primary',
    'bg-primary/40',
    'selection:bg-primary/40',
    {
      pattern: /^(outline|bg|text|border|after:bg|ring)-(primary)(-[0-9]+)?$/,
      variants: ['hover', 'dark', 'focus', 'disabled']
    }
  ],
  plugins: [
    typography,
    plugin(({ addBase, addComponents, addUtilities }) => {
      addComponents({
        '.outline-primary': {
          '@apply outline outline-2 outline-primary-500/50 outline-offset-2': {}
        }
      });
      addUtilities({
        '@layer utilities': {
          '.bg-primary\\/40': {
            'background-color': 'rgb(var(--color-primary-500) / 0.4)'
          },
          '.selection\\:bg-primary\\/40 *::selection': {
            'background-color': 'rgb(var(--color-primary-500) / 0.4)'
          },
          '.selection\\:bg-primary\\/40::selection': {
            'background-color': 'rgb(var(--color-primary-500) / 0.4)'
          }
        }
      });
      addBase({
        ':root': {
          '--color-primary-50': '243, 243, 255',
          '--color-primary-100': '233, 233, 254',
          '--color-primary-200': '214, 214, 254',
          '--color-primary-300': '185, 184, 253',
          '--color-primary-400': '151, 149, 250',
          '--color-primary-500': '123, 120, 246',
          '--color-primary-600': '93, 89, 235',
          '--color-primary-700': '78, 74, 211',
          '--color-primary-800': '65, 62, 171',
          '--color-primary-900': '55, 54, 137',
          '--color-primary-950': '32, 31, 77'
        }
      });
    })
  ],
} satisfies Config;

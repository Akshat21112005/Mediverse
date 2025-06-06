/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // This is crucial. Ensure these paths cover all your files
    // where you use Tailwind classes. For Next.js App Router:
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    // If you have a 'pages' directory (older Next.js or mixed app):
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    // For shared components:
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    // Add any other directories if you store components or UI files elsewhere
  ],
  theme: {
    extend: {
      // Define your custom colors here, mapping them to your CSS variables
      colors: {
        // Base and semantic colors from your global.css
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },
        // Specific gradient/background colors from your desired design
        // Make sure these match the variable names you defined in global.css
        emerald: {
          400: 'var(--emerald-400)',
        },
        blue: {
          500: 'var(--blue-500)',
        },
        purple: {
          400: 'var(--purple-400)', // If you use this
        },
        slate: {
          950: 'var(--slate-950)',
        },
        // Add your chart and sidebar colors if you want to use them with Tailwind classes
        // 'chart-1': 'var(--chart-1)',
        // 'chart-2': 'var(--chart-2)',
        // 'sidebar': 'var(--sidebar)',
      },
      // Extend font families if you are using custom fonts via CSS variables
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      // Extend border radius if you are using custom radii via CSS variables
      borderRadius: {
        'sm': 'var(--radius-sm)',
        'md': 'var(--radius-md)',
        'lg': 'var(--radius-lg)',
        'xl': 'var(--radius-xl)',
      },
      // Add other theme extensions if needed
    },
  },
  plugins: [
    // Using tailwindcss-animate for animations
    require('tailwindcss-animate'),
    // Add other Tailwind plugins here
  ],
}
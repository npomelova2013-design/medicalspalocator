import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
  			serif: ['var(--font-serif)', 'Georgia', 'serif'],
  		},
  		letterSpacing: {
  			editorial: '-0.06em',
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			'rose-gold': {
  				50: '#fdf2f4',
  				100: '#fbe5e9',
  				200: '#f8cdd5',
  				300: '#f2a4b3',
  				400: '#e8748b',
  				500: '#B76E79',
  				600: '#a25a64',
  				700: '#884a53',
  				800: '#6e3d44',
  				900: '#5c343b',
  			},
  			champagne: {
  				50: '#fdf9ed',
  				100: '#faf0d0',
  				200: '#f5e09e',
  				300: '#efcc6b',
  				400: '#e8b83e',
  				500: '#D4AF37',
  				600: '#b8912a',
  				700: '#996e24',
  				800: '#7d5724',
  				900: '#684822',
  			},
  			burgundy: {
  				50: '#fdf2f6',
  				100: '#fce7ef',
  				200: '#fbd0e1',
  				300: '#f8a9c7',
  				400: '#f273a2',
  				500: '#e8467e',
  				600: '#d4265d',
  				700: '#b71945',
  				800: '#5C1A33',
  				900: '#3d1122',
  			},
  			'warm-blush': '#F5E6E0',
  			'warm-cream': '#FFF8F0',
  			'dark-chocolate': '#2C1810',
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		boxShadow: {
  			'gold-glow': '0 0 30px rgba(212, 175, 55, 0.3)',
  			'gold-glow-lg': '0 0 50px rgba(212, 175, 55, 0.4)',
  			'rose-glow': '0 0 30px rgba(183, 110, 121, 0.3)',
  		},
  		animation: {
  			float: 'float 20s ease-in-out infinite',
  			'float-delayed': 'float 25s ease-in-out infinite 5s',
  			'float-slow': 'float 30s ease-in-out infinite 10s',
  			'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
  			shimmer: 'shimmer 3s linear infinite',
  			marquee: 'marquee 30s linear infinite',
  			'gold-pulse': 'goldPulse 4s ease-in-out infinite',
  			'gold-float': 'goldFloat 15s ease-in-out infinite',
  		},
  		keyframes: {
  			float: {
  				'0%, 100%': { transform: 'translate(0, 0) scale(1)' },
  				'33%': { transform: 'translate(30px, -30px) scale(1.05)' },
  				'66%': { transform: 'translate(-20px, 20px) scale(0.95)' },
  			},
  			pulseGlow: {
  				'0%, 100%': { opacity: '0.5' },
  				'50%': { opacity: '0.8' },
  			},
  			shimmer: {
  				'0%': { transform: 'translateX(-100%)' },
  				'100%': { transform: 'translateX(100%)' },
  			},
  			marquee: {
  				'0%': { transform: 'translateX(0)' },
  				'100%': { transform: 'translateX(-50%)' },
  			},
  			goldPulse: {
  				'0%, 100%': { transform: 'scale(1)', opacity: '0.4' },
  				'50%': { transform: 'scale(1.1)', opacity: '0.7' },
  			},
  			goldFloat: {
  				'0%': { transform: 'translateY(100%) translateX(0)', opacity: '0' },
  				'10%': { opacity: '0.6' },
  				'90%': { opacity: '0.6' },
  				'100%': { transform: 'translateY(-100vh) translateX(20px)', opacity: '0' },
  			},
  		},
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;

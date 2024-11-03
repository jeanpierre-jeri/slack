import forms from '@tailwindcss/forms'
import typography from '@tailwindcss/typography'
import type { Config } from 'tailwindcss'
import { purple, emerald, stone, white } from 'tailwindcss/colors'

const withAlphaValue = (varName: string) => `hsl(var(--${varName}) / <alpha-value>)`

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: ['class', '[data-theme="dark"]'],
	theme: {
		colors: {
			primary: purple,
			secondary: emerald,
			svelte: withAlphaValue('svelte-color'),
			copy: {
				base: withAlphaValue('copy-base-color'),
				muted: withAlphaValue('copy-muted-color'),
				contrast: withAlphaValue('copy-contrast-color'),
			},
			surface: {
				1: withAlphaValue('surface-1-color'),
				2: withAlphaValue('surface-2-color'),
				3: withAlphaValue('surface-3-color'),
				contrast: withAlphaValue('surface-contrast-color'),
			},
			emphasis: {
				DEFAULT: withAlphaValue('emphasis-color'),
				hover: withAlphaValue('emphasis-hover-color'),
			},
			gray: stone,
			white,
			transparent: 'transparent',
			current: 'currentColor',
			error: '#be123c',
		},
		boxShadow: {
			low: 'var(--shadow-elevation-low)',
			mid: 'var(--shadow-elevation-mid)',
			high: 'var(--shadow-elevation-high)',
		},
		container: {
			center: true,
		},
		fontFamily: {
			sans: 'var(--font-sans)',
		},
		extend: {},
	},

	plugins: [forms, typography],
} satisfies Config

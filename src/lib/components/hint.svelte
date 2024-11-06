<script lang="ts">
	import type { Snippet } from 'svelte'
	import { Tooltip, TooltipTrigger, TooltipContent } from './ui/tooltip'

	interface Props {
		label: string
		side?: 'top' | 'bottom' | 'left' | 'right'
		align?: 'start' | 'center' | 'end'
		children: Snippet<[]>
	}
	const { label, align, side, children }: Props = $props()
</script>

<Tooltip openDelay={50}>
	<TooltipTrigger>
		{@render children()}
	</TooltipTrigger>

	<TooltipContent {side} {align} class="border border-white/5 bg-black text-white">
		<p class="text-xs font-medium">{label}</p>
	</TooltipContent>
</Tooltip>

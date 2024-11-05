<script lang="ts">
	import { Button } from '@/lib/components/ui/button'
	import { cn } from '@/lib/utils'
	import type { Snippet } from 'svelte'

	interface Props {
		icon: Snippet<[{ className?: string }]>
		label: string
		isActive?: boolean
	}

	const { icon, label, isActive = false }: Props = $props()
</script>

<div class="group flex cursor-pointer flex-col items-center justify-center gap-y-0.5">
	<Button
		variant="transparent"
		class={cn('size-9 p-2 group-hover:bg-accent/20', isActive && 'bg-accent/20')}
	>
		{@render icon({ className: 'size-5 text-white group-hover:scale-110 transition-all' })}
	</Button>
	<span class="text-xs text-white group-hover:text-accent">
		{label}
	</span>
</div>

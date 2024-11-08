<script lang="ts">
	import Hint from '@/lib/components/hint.svelte'
	import FaCaretDown from '@/lib/components/icons/fa-caret-down.svelte'
	import { Button } from '@/lib/components/ui/button'
	import { cn } from '@/lib/utils'
	import { PlusIcon } from 'lucide-svelte'
	import type { Snippet } from 'svelte'

	interface Props {
		children: Snippet
		label: string
		hint: string
		onNew?: () => void
	}

	const { children, label, hint, onNew }: Props = $props()

	let on = $state(true)

	const toggle = () => {
		on = !on
	}
</script>

<div class="mt-3 flex flex-col px-2">
	<div class="group flex items-center px-3.5">
		<Button
			variant="transparent"
			class="size-6 shrink-0 p-0.5 text-sm text-[#f9edffcc]"
			onclick={toggle}
		>
			<FaCaretDown class={cn('size-4 transition-transform', { '-rotate-90': !on })} />
		</Button>
		<Button
			variant="transparent"
			size="sm"
			class="group h-[28px] items-center justify-start overflow-hidden px-1.5 text-sm text-[#f9edffcc]"
		>
			<span class="truncate">{label}</span>
		</Button>

		{#if onNew}
			<div class="ml-auto">
				<Hint label={hint} side="top" align="center">
					<Button
						onclick={onNew}
						variant="transparent"
						size="iconSm"
						class="size-6 shrink-0 p-0.5 text-sm text-[#f9edffcc] opacity-0 transition-opacity group-hover:opacity-100"
					>
						<PlusIcon class="size-5" />
					</Button>
				</Hint>
			</div>
		{/if}
	</div>
	{#if on}
		{@render children()}
	{/if}
</div>

<script lang="ts">
	import { page } from '$app/stores'
	import { Button } from '@/lib/components/ui/button'
	import { cn } from '@/lib/utils'
	import type { Snippet } from 'svelte'
	import { type VariantProps, tv } from 'tailwind-variants'

	const sidebarItemVariants = tv({
		base: 'flex items-center gap-1.5 justify-start font-normal h-7 px-[18px] text-sm overflow-hidden',
		variants: {
			variant: {
				default: 'text-[#f9edffcc]',
				active: 'text-[#481349] bg-white/90 hover:bg-white/90',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	})

	interface Props {
		label: string
		id: string
		icon: Snippet<[{ className?: string }]>
		variant?: VariantProps<typeof sidebarItemVariants>['variant']
	}

	const { icon, id, label, variant }: Props = $props()
</script>

<Button
	href={`/workspaces/${$page.params.id}/channels/${id}`}
	variant="transparent"
	size="sm"
	class={cn(sidebarItemVariants({ variant }))}
>
	{@render icon({ className: 'size-3.5 mr-1 shrink-0' })}
	<span class="truncate text-sm">{label}</span>
</Button>

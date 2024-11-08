<script lang="ts">
	import { Button } from '@/lib/components/ui/button'
	import { Avatar, AvatarFallback, AvatarImage } from '@/lib/components/ui/avatar'
	import { type VariantProps, tv } from 'tailwind-variants'
	import { cn } from '@/lib/utils'
	import { page } from '$app/stores'

	const userItemVariants = tv({
		base: 'flex items-center gap-1.5 justify-start font-normal h-7 px-4 text-sm overflow-hidden',
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
		id: string
		label?: string
		image?: string
		variant?: VariantProps<typeof userItemVariants>['variant']
	}

	const { id, label = 'Member', image, variant }: Props = $props()
</script>

<Button
	variant="transparent"
	class={cn(userItemVariants({ variant }))}
	size="sm"
	href={`/workspaces/${$page.params.id}/member/${id}`}
>
	<Avatar class="mr-1 size-5 rounded-md">
		<AvatarImage src={image} alt={label} class="rounded-md" />
		<AvatarFallback class="text-sx rounded-md bg-sky-500 text-xs">
			{label.charAt(0).toUpperCase()}
		</AvatarFallback>
	</Avatar>
	<span class="truncate text-sm">{label}</span>
</Button>

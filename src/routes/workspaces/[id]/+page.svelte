<script>
	import CreateChannelModal from '@/features/channels/components/create-channel-modal.svelte'
	import { channelModal } from '@/features/channels/store/use-create-workspace-channel.svelte'
	import { TriangleAlert } from 'lucide-svelte'

	const { data } = $props()
	const channels = $derived(data.channels)
	const member = $derived(data.member)

	$effect.pre(() => {
		if (channels.length === 0 && !channelModal.value && member.role === 'admin') {
			channelModal.value = true
		}
	})
</script>

<CreateChannelModal />

{#if member.role !== 'admin'}
	<div class="flex h-full flex-1 flex-col items-center justify-center gap-2">
		<TriangleAlert class="size-6 text-muted-foreground" />
		<p class="text-sm text-muted-foreground">No chanel found</p>
	</div>
{/if}

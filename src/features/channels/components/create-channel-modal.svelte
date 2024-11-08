<script lang="ts">
	import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/lib/components/ui/dialog'
	import { channelModal } from '@/features/channels/store/use-create-workspace-channel.svelte'
</script>

<Dialog
	open={channelModal.value}
	onOpenChange={(state) => {
		channelModal.value = state
	}}
>
	<DialogContent>
		<DialogHeader>
			<DialogTitle>Add a channel</DialogTitle>
		</DialogHeader>
	</DialogContent>
</Dialog>

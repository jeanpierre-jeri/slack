<script lang="ts">
	import {
		Dialog,
		DialogContent,
		DialogDescription,
		DialogHeader,
		DialogTitle,
	} from '@/lib/components/ui/dialog'
	import { workspaceModal } from '@/features/workspaces/store/use-create-workspace-modal.svelte'
</script>

<Dialog open={workspaceModal.value} onOpenChange={(state) => (workspaceModal.value = state)}>
	<DialogContent>
		<DialogHeader>
			<DialogTitle>Add a workspace</DialogTitle>
		</DialogHeader>
	</DialogContent>
</Dialog>

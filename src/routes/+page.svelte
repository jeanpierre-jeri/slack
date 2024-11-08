<script lang="ts">
	import UserButton from '@/features/auth/components/user-button.svelte'
	import { workspaceModal } from '@/features/workspaces/store/use-create-workspace-modal.svelte.js'

	const { data } = $props()
	const workspaces = $derived(data.workspaces)

	$effect(() => {
		if (workspaces.length === 0 && !workspaceModal.value) {
			workspaceModal.value = true
		}
	})
</script>

<svelte:head>
	<title>Slack</title>
</svelte:head>

<div>
	<UserButton />
</div>

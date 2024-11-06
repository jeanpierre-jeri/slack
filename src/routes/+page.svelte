<script lang="ts">
	import UserButton from '@/features/auth/components/user-button.svelte'
	import { workspaceModal } from '@/features/workspaces/store/use-create-workspace-modal.svelte.js'
	import { workspacesStore } from '@/features/workspaces/store/workspaces.svelte.js'

	const { data } = $props()
	const { workspaces: initialWorkspaces } = data

	workspacesStore.value = initialWorkspaces

	$effect(() => {
		if (workspacesStore.value.length === 0 && !workspaceModal.value) {
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

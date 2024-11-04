<script lang="ts">
	import '@/app.css'
	import CreateWorkspaceModal from '@/features/workspaces/api/components/create-workspace-modal.svelte'
	let { children, data } = $props()
</script>

<svelte:head>
	<title>Slack</title>
</svelte:head>
{@render children()}
<CreateWorkspaceModal />

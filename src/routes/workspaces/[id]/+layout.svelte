<script lang="ts">
	import { workspaceStore } from '@/stores/workspace.svelte'
	import Sidebar from './components/sidebar.svelte'
	import Toolbar from './components/toolbar.svelte'
	import { workspacesStore } from '@/stores/workspaces.svelte'

	let { children, data } = $props()

	$effect.pre(() => {
		workspaceStore.value = data.workspace
		workspacesStore.value = data.workspaces
	})
</script>

<div class="grid h-full grid-rows-[auto_1fr]">
	<Toolbar />
	<div class="grid h-full grid-cols-[70px_1fr]">
		<Sidebar />
		{@render children()}
	</div>
</div>

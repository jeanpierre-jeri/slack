<script lang="ts">
	import { workspace } from '@/stores/workspace.svelte'
	import Sidebar from './components/sidebar.svelte'
	import Toolbar from './components/toolbar.svelte'
	import { workspaces } from '@/stores/workspaces.svelte'

	let { children, data } = $props()

	$effect.pre(() => {
		workspace.value = data.workspace
		workspaces.value = data.workspaces
	})
</script>

<div class="grid h-full grid-rows-[auto_1fr]">
	<Toolbar />
	<div class="grid h-full grid-cols-[70px_1fr]">
		<Sidebar />
		{@render children()}
	</div>
</div>

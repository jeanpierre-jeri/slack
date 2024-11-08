<script lang="ts">
	import Sidebar from './components/sidebar.svelte'
	import Toolbar from './components/toolbar.svelte'
	import { ResizablePane, ResizablePaneGroup, ResizableHandle } from '@/lib/components/ui/resizable'
	import WorkspaceSidebar from './components/workspace-sidebar.svelte'

	let { children } = $props()
</script>

<div class="grid h-full grid-rows-[auto_1fr]">
	<Toolbar />
	<div class="grid h-full grid-cols-[70px_1fr]">
		<Sidebar />
		<ResizablePaneGroup direction="horizontal">
			<ResizablePane defaultSize={20} minSize={11} class="bg-[#5E2C5F]">
				<WorkspaceSidebar />
			</ResizablePane>

			<ResizableHandle withHandle />

			<ResizablePane minSize={20} defaultSize={100}>
				{@render children()}
			</ResizablePane>
		</ResizablePaneGroup>
	</div>
</div>

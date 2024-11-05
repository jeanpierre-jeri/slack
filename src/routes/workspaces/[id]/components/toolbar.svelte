<script lang="ts">
	import { Button } from '@/lib/components/ui/button'
	import { Info, Search } from 'lucide-svelte'

	import { workspace as workspaceStore } from '@/stores/workspace.svelte'

	const workspace = $derived(workspaceStore.value)
</script>

<nav class="flex h-10 items-center justify-between bg-[#481349] p-1.5">
	<div class="flex-1"></div>
	<div class="min-w-[280px] max-w-[642px] shrink grow-[2]">
		<Button size="sm" class="h-7 w-full justify-start bg-accent/25 px-2 hover:bg-accent/25">
			<Search class="mr-2 size-4 text-white" />
			<span class="text-sm text-white">Search {workspace.name}</span>
		</Button>
	</div>

	<div class="ml-auto flex flex-1 items-center justify-end">
		<Button variant="transparent" size="iconSm">
			<Info class="size-5 text-white" />
		</Button>
	</div>
</nav>

<script lang="ts">
	import { Button } from '@/lib/components/ui/button'
	import {
		DropdownMenu,
		DropdownMenuTrigger,
		DropdownMenuContent,
		DropdownMenuItem,
	} from '@/lib/components/ui/dropdown-menu'
	import { workspaceModal } from '@/features/workspaces/store/use-create-workspace-modal.svelte'
	import { goto } from '$app/navigation'
	import { Plus } from 'lucide-svelte'
	import { workspace as workspaceStore } from '@/stores/workspace.svelte'
	import { workspaces as workspacesStore } from '@/stores/workspaces.svelte'

	const workspace = $derived(workspaceStore.value)
	const workspaces = $derived(workspacesStore.value)
</script>

<DropdownMenu>
	<DropdownMenuTrigger>
		<Button
			class="relative size-9 overflow-hidden bg-[#ababad] text-xl font-semibold text-slate-800 hover:bg-[#ababad]/80"
		>
			{workspace.name.charAt(0).toUpperCase()}
		</Button>
	</DropdownMenuTrigger>
	<DropdownMenuContent side="bottom" align="start" class="w-64">
		<DropdownMenuItem
			class="flex cursor-pointer flex-col items-start justify-start capitalize"
			onclick={() => {
				goto(`/workspaces/${workspace.id}`)
			}}
		>
			{workspace.name}
			<span class="text-xs text-muted-foreground"> Active workspace </span>
		</DropdownMenuItem>

		{#each workspaces as { id, name }}
			<DropdownMenuItem
				class="cursor-pointer capitalize"
				onclick={() => {
					goto(`/workspaces/${id}`)
				}}
			>
				<div
					class="relative mr-2 flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-md bg-[#616061] text-lg font-semibold text-white"
				>
					{name.charAt(0).toUpperCase()}
				</div>
				<span class="truncate">
					{name}
				</span>
			</DropdownMenuItem>
		{/each}

		<DropdownMenuItem
			class="cursor-pointer"
			onclick={() => {
				workspaceModal.value = true
			}}
		>
			<div
				class="relative mr-2 flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-md bg-[#f2f2f2] text-lg font-semibold text-slate-800"
			>
				<Plus />
			</div>
			Create a new workspace
		</DropdownMenuItem>
	</DropdownMenuContent>
</DropdownMenu>

<script lang="ts">
	import { memberStore } from '@/features/members/store/member.svelte'
	import { workspaceStore } from '@/features/workspaces/store/workspace.svelte'
	import WorkspaceHeader from './workspace-header.svelte'

	const member = $derived(memberStore.value)
	const workspace = $derived(workspaceStore.value)
</script>

<div class="flex h-full flex-col bg-[#5E2C5F]">
	<WorkspaceHeader />
</div>

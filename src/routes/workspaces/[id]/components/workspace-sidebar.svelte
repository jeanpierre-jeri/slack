<script lang="ts">
	import { memberStore } from '@/features/members/store/member.svelte'
	import { workspaceStore } from '@/features/workspaces/store/workspace.svelte'
	import WorkspaceHeader from './workspace-header.svelte'
	import { MessageSquareText, SendHorizontal } from 'lucide-svelte'
	import SidebarItem from './sidebar-item.svelte'

	const member = $derived(memberStore.value)
	const workspace = $derived(workspaceStore.value)
</script>

{#snippet threads({ className }: { className?: string })}
	<MessageSquareText class={className} />
{/snippet}

{#snippet drafts({ className }: { className?: string })}
	<SendHorizontal class={className} />
{/snippet}

<div class="flex h-full flex-col bg-[#5E2C5F]">
	<WorkspaceHeader />

	<div class="mt-3 flex flex-col px-2">
		<SidebarItem label="Threads" icon={threads} id="threads" />
		<SidebarItem label="Drafts & Sent" icon={drafts} id="drafts" />
	</div>
</div>

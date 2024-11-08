<script lang="ts">
	import WorkspaceHeader from './workspace-header.svelte'
	import { MessageSquareText, SendHorizontal, HashIcon } from 'lucide-svelte'
	import SidebarItem from './sidebar-item.svelte'
	import { channelsStore } from '@/features/channels/store/channels.svelte'
	import WorkspaceSection from './workspace-section.svelte'

	const channels = $derived(channelsStore.value)
</script>

{#snippet threads({ className }: { className?: string })}
	<MessageSquareText class={className} />
{/snippet}

{#snippet drafts({ className }: { className?: string })}
	<SendHorizontal class={className} />
{/snippet}

{#snippet hash({ className }: { className?: string })}
	<HashIcon class={className} />
{/snippet}

<div class="flex h-full flex-col bg-[#5E2C5F]">
	<WorkspaceHeader />

	<div class="mt-3 flex flex-col px-2">
		<SidebarItem label="Threads" icon={threads} id="threads" />
		<SidebarItem label="Drafts & Sent" icon={drafts} id="drafts" />
	</div>
	<WorkspaceSection label="Channels" hint="New channel" onNew={() => {}}>
		{#each channels as { id, name } (id)}
			<SidebarItem label={name} icon={hash} {id} />
		{/each}
	</WorkspaceSection>
</div>

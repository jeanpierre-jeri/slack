<script lang="ts">
	import WorkspaceHeader from './workspace-header.svelte'
	import { MessageSquareText, SendHorizontal, HashIcon } from 'lucide-svelte'
	import SidebarItem from './sidebar-item.svelte'
	import WorkspaceSection from './workspace-section.svelte'
	import UserItem from './user-item.svelte'
	import { channelModal } from '@/features/channels/store/use-create-workspace-channel.svelte'
	import { page } from '$app/stores'

	const channels = $derived($page.data.channels)
	const members = $derived($page.data.members)
	const member = $derived($page.data.member)
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
	<WorkspaceSection
		label="Channels"
		hint="New channel"
		onNew={member.role === 'admin'
			? () => {
					channelModal.value = true
				}
			: undefined}
	>
		{#each channels as { id, name } (id)}
			<SidebarItem label={name} icon={hash} {id} />
		{/each}
	</WorkspaceSection>

	<WorkspaceSection label="Direct Messages" hint="New direct message" onNew={() => {}}>
		{#each members as { user } (user.id)}
			<UserItem id={user.id} label={user.name ?? undefined} image={user.image ?? undefined} />
		{/each}
	</WorkspaceSection>
</div>

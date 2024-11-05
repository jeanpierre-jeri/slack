<script lang="ts">
	import UserButton from '@/features/auth/components/user-button.svelte'
	import WorkspaceSwitcher from './workspace-switcher.svelte'
	import SidebarButton from './sidebar-button.svelte'
	import { Home, MessagesSquare, Bell, MoreHorizontal } from 'lucide-svelte'
	import { page } from '$app/stores'
</script>

{#snippet home({ className }: { className?: string })}
	<Home class={className} />
{/snippet}

{#snippet messageSquare({ className }: { className?: string })}
	<MessagesSquare class={className} />
{/snippet}

{#snippet bell({ className }: { className?: string })}
	<Bell class={className} />
{/snippet}

{#snippet moreHorizontal({ className }: { className?: string })}
	<MoreHorizontal class={className} />
{/snippet}

<aside class="flex flex-col items-center gap-y-4 bg-[#481349] pb-1 pt-2">
	<WorkspaceSwitcher />
	<SidebarButton icon={home} label="Home" isActive={$page.url.pathname.includes('/workspaces')} />
	<SidebarButton icon={messageSquare} label="DMs" />
	<SidebarButton icon={bell} label="Activity" />
	<SidebarButton icon={moreHorizontal} label="More" />
	<div class="mt-auto flex flex-col items-center justify-center gap-y-1">
		<UserButton />
	</div>
</aside>

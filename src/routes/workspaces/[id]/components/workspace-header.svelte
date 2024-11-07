<script lang="ts">
	import { Button } from '@/lib/components/ui/button'
	import {
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuItem,
		DropdownMenuSeparator,
		DropdownMenuTrigger,
	} from '@/lib/components/ui/dropdown-menu'

	import { workspaceStore } from '@/features/workspaces/store/workspace.svelte'
	import { ChevronDown } from 'lucide-svelte'
	import { memberStore } from '@/features/members/store/member.svelte'
	import { SquarePen, ListFilter } from 'lucide-svelte'
	import Hint from '@/lib/components/hint.svelte'
	import PreferencesModal from './preferences-modal.svelte'

	const workspace = $derived(workspaceStore.value)
	const member = $derived(memberStore.value)

	const isAdmin = $derived(memberStore.value.role === 'admin')

	let preferencesOpen = $state(false)

	const setPreferencesOpen = (value: boolean) => {
		preferencesOpen = value
	}
</script>

<PreferencesModal
	open={preferencesOpen}
	setOpen={setPreferencesOpen}
	initialValue={workspace.name}
/>

<div class="flex h-[49px] items-center justify-between gap-0.5 px-4">
	<DropdownMenu>
		<DropdownMenuTrigger asChild let:builder>
			<Button
				builders={[builder]}
				variant="transparent"
				class="w-auto overflow-hidden p-1.5 text-lg font-semibold"
			>
				<span class="truncate">{workspace.name}</span>
				<ChevronDown class="ml-1 size-4 shrink-0" />
			</Button>
		</DropdownMenuTrigger>
		<DropdownMenuContent side="bottom" align="start" class="w-64">
			<DropdownMenuItem class="cursor-pointer capitalize">
				<div
					class="relative mr-2 flex size-9 items-center justify-center overflow-hidden rounded-md bg-[#616061] text-xl font-semibold text-white"
				>
					{workspace.name.charAt(0).toUpperCase()}
				</div>
				<div class="flex flex-col items-start">
					<p class="font-bold">{workspace.name}</p>
					<p class="text-xs text-muted-foreground">Active workspace</p>
				</div>
			</DropdownMenuItem>

			{#if isAdmin}
				<DropdownMenuSeparator />

				<DropdownMenuItem class="cursor-pointer py-2" onclick={() => {}}>
					Invite people to {workspace.name}
				</DropdownMenuItem>

				<DropdownMenuSeparator />

				<DropdownMenuItem
					class="cursor-pointer py-2"
					onclick={() => {
						setPreferencesOpen(true)
					}}
				>
					Preferences
				</DropdownMenuItem>
			{/if}
		</DropdownMenuContent>
	</DropdownMenu>

	<div class="flex items-center gap-0.5">
		<Hint label="Filter conversations" side="bottom">
			<Button variant="transparent" size="iconSm">
				<ListFilter class="size-4" />
			</Button>
		</Hint>

		<Hint label="New message" side="bottom">
			<Button variant="transparent" size="iconSm">
				<SquarePen class="size-4" />
			</Button>
		</Hint>
	</div>
</div>

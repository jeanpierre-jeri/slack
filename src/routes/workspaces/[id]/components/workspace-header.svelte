<script lang="ts">
	import { Button, buttonVariants } from '@/lib/components/ui/button'
	import {
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuItem,
		DropdownMenuSeparator,
		DropdownMenuTrigger,
	} from '@/lib/components/ui/dropdown-menu'

	import { ChevronDown } from 'lucide-svelte'
	import { SquarePen, ListFilter } from 'lucide-svelte'
	import Hint from '@/lib/components/hint.svelte'
	import PreferencesModal from './preferences-modal.svelte'
	import { page } from '$app/stores'
	import InviteModal from './invite-modal.svelte'

	const { name } = $derived($page.data.workspace)
	const member = $derived($page.data.member)

	const isAdmin = $derived(member.role === 'admin')

	let preferencesOpen = $state(false)
	let inviteOpen = $state(false)

	const setPreferencesOpen = (value: boolean) => {
		preferencesOpen = value
	}

	const setInviteOpen = (value: boolean) => {
		inviteOpen = value
	}
</script>

<InviteModal open={inviteOpen} setOpen={setInviteOpen} />

<PreferencesModal open={preferencesOpen} setOpen={setPreferencesOpen} initialValue={name} />

<div class="flex h-[49px] items-center justify-between gap-0.5 px-4">
	<DropdownMenu>
		<DropdownMenuTrigger asChild let:builder>
			<Button
				builders={[builder]}
				variant="transparent"
				class="w-auto overflow-hidden p-1.5 text-lg font-semibold"
			>
				<span class="truncate">{name}</span>
				<ChevronDown class="ml-1 size-4 shrink-0" />
			</Button>
		</DropdownMenuTrigger>
		<DropdownMenuContent side="bottom" align="start" class="w-64">
			<DropdownMenuItem class="cursor-pointer capitalize">
				<div
					class="relative mr-2 flex size-9 items-center justify-center overflow-hidden rounded-md bg-[#616061] text-xl font-semibold text-white"
				>
					{name.charAt(0).toUpperCase()}
				</div>
				<div class="flex flex-col items-start">
					<p class="font-bold">{name}</p>
					<p class="text-xs text-muted-foreground">Active workspace</p>
				</div>
			</DropdownMenuItem>

			{#if isAdmin}
				<DropdownMenuSeparator />

				<DropdownMenuItem class="cursor-pointer py-2" onclick={() => setInviteOpen(true)}>
					Invite people to {name}
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
			<p class={buttonVariants({ variant: 'transparent', size: 'iconSm' })}>
				<ListFilter class="size-4" />
			</p>
		</Hint>

		<Hint label="New message" side="bottom">
			<p class={buttonVariants({ variant: 'transparent', size: 'iconSm' })}>
				<SquarePen class="size-4" />
			</p>
		</Hint>
	</div>
</div>

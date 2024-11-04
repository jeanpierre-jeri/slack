<script lang="ts">
	import { Avatar, AvatarFallback, AvatarImage } from '@/lib/components/ui/avatar'

	import {
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuItem,
		DropdownMenuTrigger,
	} from '@/lib/components/ui/dropdown-menu'

	import { LogOut, Loader } from 'lucide-svelte'

	import type { Session } from '@auth/sveltekit'
	import { signOut } from '@auth/sveltekit/client'

	interface Props {
		session: Session | null
	}

	const { session }: Props = $props()

	const avatarFallback = session?.user?.email?.charAt(0).toUpperCase() || 'A'
</script>

{#if session?.user}
	<DropdownMenu>
		<DropdownMenuTrigger class="relative outline-none">
			<Avatar class="size-10 transition hover:opacity-75">
				<AvatarImage alt={session.user.name} src={session.user.image} />
				<AvatarFallback class="bg-sky-500 text-white">{avatarFallback}</AvatarFallback>
			</Avatar>
		</DropdownMenuTrigger>
		<DropdownMenuContent align="center" class="w-60" side="right">
			<DropdownMenuItem onclick={() => signOut({ callbackUrl: '/auth' })} class="h-10">
				<LogOut class="mr-2 size-4" />
				Log out
			</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>
{:else}
	<Loader />
{/if}

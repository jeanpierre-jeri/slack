<script lang="ts">
	import type { Session } from '@auth/sveltekit'
	import { signOut } from '@auth/sveltekit/client'

	interface Props {
		session: Session | null
	}

	const { session }: Props = $props()
</script>

<header class="mb-2 bg-surface-2">
	<nav class="container flex w-full justify-between px-2 py-4 text-lg">
		<a href="/">JPify</a>
		{#if session}
			<a href="/profile">Profile</a>
		{:else}
			<a href="/login">Login</a>
		{/if}
	</nav>
</header>

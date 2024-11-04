<script lang="ts">
	import { signOut } from '@auth/sveltekit/client'

	const { data } = $props()

	const { session } = data
</script>

<main>
	<h1>Profile</h1>
	<p>You are logged in as <strong>{session?.user?.email}</strong></p>
	<button onclick={() => signOut({ callbackUrl: '/' })}>logout</button>
</main>

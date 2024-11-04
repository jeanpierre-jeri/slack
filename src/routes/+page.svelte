<script lang="ts">
	import Button from '@/lib/components/ui/button/button.svelte'
	import { signOut } from '@auth/sveltekit/client'

	const { data } = $props()
</script>

<svelte:head>
	<title>Slack</title>
</svelte:head>

<div>
	Logged in

	<Button onclick={() => signOut({ callbackUrl: '/auth' })}>Sign out</Button>
</div>

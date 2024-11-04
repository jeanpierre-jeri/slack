<script lang="ts">
	import { signIn } from '@auth/sveltekit/client'
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<div>
	<button onclick={() => signIn('github', { callbackUrl: '/profile' })} class="text-2xl">
		Login with github
	</button>
</div>

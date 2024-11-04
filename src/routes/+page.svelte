<script lang="ts">
	import { signIn } from '@auth/sveltekit/client'

	const { data } = $props()
</script>

<main class="flex grow flex-col items-center justify-center">
	<h1 class="text-6xl font-bold">Jpify</h1>
	<p class="text-xl">Level up your coding journey</p>
	<button onclick={() => signIn('github')}> Sign with github </button>
</main>

<script lang="ts">
	import SignInCard from './sign-in-card.svelte'
	import SignUpCard from './sign-up-card.svelte'
	import type { SignInFlow } from './types'

	let state = $state<SignInFlow>('signIn')

	const setState = (newState: SignInFlow) => {
		state = newState
	}
</script>

<div class="flex h-dvh grow flex-col items-center justify-center bg-[#5C3B58]">
	<div class="md:h-auto md:w-[420px]">
		{#if state === 'signIn'}
			<SignInCard {setState} />
		{:else}
			<SignUpCard {setState} />
		{/if}
	</div>
</div>

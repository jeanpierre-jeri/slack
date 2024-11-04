<script lang="ts">
	import AuthScreen from '@/features/auth/components/auth-screen.svelte'

	const { data } = $props()
</script>

<svelte:head>
	<title>Slack</title>
</svelte:head>

<AuthScreen />

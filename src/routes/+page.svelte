<script lang="ts">
	import UserButton from '@/features/auth/components/user-button.svelte'

	const { data } = $props()
	const { session } = data
</script>

<svelte:head>
	<title>Slack</title>
</svelte:head>

<div>
	<UserButton {session} />
</div>

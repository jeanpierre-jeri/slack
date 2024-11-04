<script lang="ts">
	import '@/app.css'
	let { children, data } = $props()
</script>

<svelte:head>
	<title>Slack</title>
</svelte:head>
{@render children()}

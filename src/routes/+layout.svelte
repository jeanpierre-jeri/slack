<script lang="ts">
	import '@fontsource-variable/inconsolata'
	import '@/app.css'
	import Header from '@/components/header.svelte'
	let { children, data } = $props()
</script>

<svelte:head>
	<title>JPify</title>
</svelte:head>
<Header session={data.session} />
{@render children()}

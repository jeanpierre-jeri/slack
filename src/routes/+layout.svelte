<script lang="ts">
	import '@fontsource-variable/inconsolata'
	import '@/app.css'
	import Header from '@/components/header.svelte'
	let { children } = $props()
</script>

<Header />
{@render children()}

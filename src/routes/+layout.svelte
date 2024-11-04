<script lang="ts">
	import '@fontsource-variable/inconsolata'
	import '@/app.css'
	import Header from '@/components/header.svelte'
	let { children, data } = $props()
</script>

<Header session={data.session} />
{@render children()}

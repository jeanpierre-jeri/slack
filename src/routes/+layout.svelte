<script lang="ts">
	import '@/app.css'
	import Modals from '@/lib/components/modals.svelte'
	import { Toaster } from '@/lib/components/ui/sonner'
	let { children } = $props()
</script>

<svelte:head>
	<title>Slack</title>
</svelte:head>
{@render children()}
<Toaster />
<Modals />

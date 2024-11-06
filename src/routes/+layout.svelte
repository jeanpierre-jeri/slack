<script lang="ts">
	import '@/app.css'
	import Modals from '@/lib/components/modals.svelte'
	import { Toaster } from '@/lib/components/ui/sonner'
	import { setContext } from 'svelte'
	let { children, data } = $props()

	setContext('session', data.session)
</script>

<svelte:head>
	<title>Slack</title>
</svelte:head>
{@render children()}
<Toaster />
<Modals />

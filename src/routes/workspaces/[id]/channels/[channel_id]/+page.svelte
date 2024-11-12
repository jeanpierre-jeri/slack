<script>
	import ChatInput from './components/chat-input.svelte'
	import Header from './components/header.svelte'

	const { data } = $props()
</script>

<div class="flex h-full flex-col">
	<Header />

	<div class="flex-1"></div>

	<ChatInput placeholder="Message # {data.channel.name}" />
</div>

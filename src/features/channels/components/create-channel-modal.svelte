<script lang="ts">
	import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/lib/components/ui/dialog'
	import { channelModal } from '@/features/channels/store/use-create-workspace-channel.svelte'
	import { Input } from '@/lib/components/ui/input'
	import { Button } from '@/lib/components/ui/button'
	import { toast } from 'svelte-sonner'
	import { page } from '$app/stores'
	import { goto, invalidateAll } from '$app/navigation'

	let isLoading = $state(false)

	const handleSubmit = async (
		event: SubmitEvent & {
			currentTarget: EventTarget & HTMLFormElement
		},
	) => {
		event.preventDefault()
		const formData = new FormData(event.currentTarget)
		const name = formData.get('name')

		if (!name) {
			return
		}

		isLoading = true

		try {
			const res = await fetch(`/api/workspaces/${$page.params.id}/channels`, {
				method: 'POST',
				body: JSON.stringify({ name }),
			})

			if (!res.ok) {
				const { message } = await res.json()
				console.log('Error creating channel', message)
				return
			}

			const { channelId } = await res.json()

			await invalidateAll()

			channelModal.value = false

			toast.success('Channel created')

			goto(`/workspaces/${$page.params.id}/channels/${channelId}`)
		} catch (error) {
			console.log('Error creating channel', error)
		} finally {
			isLoading = false
		}
	}
</script>

<Dialog
	open={channelModal.value}
	onOpenChange={(state) => {
		channelModal.value = state
	}}
>
	<DialogContent>
		<DialogHeader>
			<DialogTitle>Add a channel</DialogTitle>
		</DialogHeader>
		<form class="space-y-4" onsubmit={handleSubmit}>
			<Input
				name="name"
				disabled={isLoading}
				required
				minlength={3}
				maxlength={80}
				placeholder="e.g. plan-budget"
				oninput={(e) => {
					const value = e.currentTarget.value.toLowerCase()
					e.currentTarget.value = value.replace(/\s+/g, '-').replace(/-+/g, '-')
				}}
			/>

			<div class="flex justify-end">
				<Button disabled={isLoading} type="submit">Create</Button>
			</div>
		</form>
	</DialogContent>
</Dialog>

<script lang="ts">
	import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/lib/components/ui/dialog'
	import { workspaceModal } from '@/features/workspaces/store/use-create-workspace-modal.svelte'
	import { Input } from '@/lib/components/ui/input'
	import { Button } from '@/lib/components/ui/button'
	import { goto } from '$app/navigation'
	import { toast } from 'svelte-sonner'
	import { workspacesStore } from '../store/workspaces.svelte'

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
			const res = await fetch('/api/workspaces', {
				method: 'POST',
				body: JSON.stringify({ name }),
			})

			if (!res.ok) {
				const { message } = await res.json()
				console.log('Error creating workspace', message)
				return
			}

			const { workspaceId, joinCode } = await res.json()

			toast.success('Workspace created')

			workspacesStore.value.push({ id: workspaceId, name: String(name), joinCode })
			workspaceModal.value = false
			goto(`/workspaces/${workspaceId}`)
		} catch (error) {
			console.log('Error creating workspace', error)
		} finally {
			isLoading = false
		}
	}
</script>

<Dialog open={workspaceModal.value} onOpenChange={(state) => (workspaceModal.value = state)}>
	<DialogContent>
		<DialogHeader>
			<DialogTitle>Add a workspace</DialogTitle>
		</DialogHeader>

		<form class="space-y-4" onsubmit={handleSubmit}>
			<Input
				name="name"
				disabled={isLoading}
				required
				autofocus
				minlength={3}
				placeholder="Workspace name eg. 'Work', 'Personal', 'Home'"
			/>

			<div class="flex justify-end">
				<Button disabled={isLoading} type="submit">Create</Button>
			</div>
		</form>
	</DialogContent>
</Dialog>

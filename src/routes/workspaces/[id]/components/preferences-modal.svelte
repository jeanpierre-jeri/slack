<script lang="ts">
	import { invalidateAll } from '$app/navigation'
	import { page } from '$app/stores'
	import { Button } from '@/lib/components/ui/button'
	import {
		Dialog,
		DialogContent,
		DialogHeader,
		DialogTitle,
		DialogFooter,
	} from '@/lib/components/ui/dialog'
	import { Input } from '@/lib/components/ui/input'
	import { TrashIcon } from 'lucide-svelte'
	import { toast } from 'svelte-sonner'

	interface Props {
		open: boolean
		setOpen: (open: boolean) => void
		initialValue: string
	}

	const { initialValue, open, setOpen }: Props = $props()

	let isEditOpen = $state(false)
	let isUpdatingWorkspace = $state(false)
	let isDeletingWorkspace = $state(false)

	const handleSubmit = async (e: Event & { currentTarget: HTMLFormElement }) => {
		try {
			e.preventDefault()

			const formData = new FormData(e.currentTarget)
			const name = formData.get('name')

			if (!name) {
				return
			}

			isUpdatingWorkspace = true

			const res = await fetch(`/api/workspaces/${$page.params.id}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ name }),
			})

			if (!res.ok) {
				const { message } = await res.json()
				console.log('Error updating workspace', message)
				toast.warning(message)
				return
			}
			await invalidateAll()
			isEditOpen = false
		} catch (error) {
			console.log('Error updating workspace', error)
			toast.error('Error updating workspace')
		} finally {
			isUpdatingWorkspace = false
		}
	}

	const handleRemove = async () => {
		try {
			const confirmation = window.confirm('Are you sure you want to delete this workspace?')

			if (!confirmation) return

			isDeletingWorkspace = true
			const res = await fetch(`/api/workspaces/${$page.params.id}`, {
				method: 'DELETE',
			})

			if (!res.ok) {
				const { message } = await res.json()
				console.log('Error deleting workspace', message)
				toast.warning(message)
				return
			}
			await invalidateAll()
			setOpen(false)
		} catch (error) {
			console.log('Error deleting workspace', error)
			toast.error('Error deleting workspace')
		} finally {
			isDeletingWorkspace = false
		}
	}
</script>

<Dialog {open} onOpenChange={setOpen}>
	<DialogContent class="overflow-hidden bg-gray-50 p-0">
		<DialogHeader class="border-b bg-white p-4">
			<DialogTitle>Preferences</DialogTitle>
		</DialogHeader>

		<div class="flex flex-col gap-y-2 px-4 pb-4">
			<Dialog
				open={isEditOpen}
				onOpenChange={(open) => {
					isEditOpen = open
				}}
			>
				<button
					onclick={() => {
						isEditOpen = true
					}}
					class="flex cursor-pointer flex-col rounded-lg border bg-white px-5 py-4 hover:bg-gray-50"
				>
					<div class="flex w-full items-center justify-between">
						<h3 class="text-sm font-semibold">Workspace name</h3>

						<p class="text-sm font-semibold text-[#1264a3] hover:underline">Edit</p>
					</div>

					<p class="text-sm">{initialValue}</p>
				</button>

				<DialogContent>
					<DialogHeader>
						<DialogTitle>Rename this workspace</DialogTitle>
					</DialogHeader>

					<form class="space-y-4" onsubmit={handleSubmit}>
						<Input
							value={initialValue}
							disabled={isUpdatingWorkspace}
							name="name"
							required
							autofocus
							minlength={3}
							maxlength={80}
							placeholder="Workspace name e.g. 'Work', 'Personal', 'Home'"
						/>
						<DialogFooter>
							<Button
								onclick={() => {
									isEditOpen = false
								}}
								variant="outline"
								disabled={isUpdatingWorkspace}
								type="button"
							>
								Cancel
							</Button>

							<Button disabled={isUpdatingWorkspace} type="submit">Save</Button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>

			<button
				disabled={isDeletingWorkspace}
				onclick={handleRemove}
				class="flex items-center gap-x-2 rounded-lg border bg-white px-5 py-4 text-rose-600 hover:bg-rose-50"
			>
				<TrashIcon class="size-4" />
				<span class="text-sm font-semibold">Delete workspace</span>
			</button>
		</div>
	</DialogContent>
</Dialog>

<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation'
	import { page } from '$app/stores'
	import ConfirmModal from '@/lib/components/confirm-modal.svelte'
	import FaChevronDown from '@/lib/components/icons/fa-chevron-down.svelte'
	import { Button } from '@/lib/components/ui/button'
	import {
		Dialog,
		DialogTrigger,
		DialogContent,
		DialogHeader,
		DialogTitle,
		DialogFooter,
	} from '@/lib/components/ui/dialog'
	import { Input } from '@/lib/components/ui/input'
	import { TrashIcon } from 'lucide-svelte'
	import { toast } from 'svelte-sonner'

	const { name } = $derived($page.data.channel)
	const member = $derived($page.data.member)

	let editOpen = $state(false)
	let isLoading = $state(false)

	let confirmModalComponent: ReturnType<typeof ConfirmModal>

	const handleSubmit = async (
		e: SubmitEvent & {
			currentTarget: EventTarget & HTMLFormElement
		},
	) => {
		e.preventDefault()
		try {
			isLoading = true

			const formData = new FormData(e.currentTarget)
			const name = formData.get('name')

			if (!name) {
				return
			}

			const res = await fetch(
				`/api/workspaces/${$page.params.id}/channels/${$page.params.channel_id}`,
				{
					method: 'PATCH',
					body: JSON.stringify({ name }),
				},
			)

			if (!res.ok) {
				const { message } = await res.json()
				console.log('Error updating channel', message)
				toast.error(message)
				return
			}

			await invalidateAll()

			editOpen = false
			toast.success('Channel updated')
		} catch (error) {
		} finally {
			isLoading = false
		}
	}

	const deleteChannel = async () => {
		try {
			if (member.role !== 'admin') {
				toast.error('You are not authorized to delete this channel')
				return
			}

			const ok = await confirmModalComponent.confirm()

			if (!ok) return
			isLoading = true

			const res = await fetch(
				`/api/workspaces/${$page.params.id}/channels/${$page.params.channel_id}`,
				{
					method: 'DELETE',
				},
			)

			if (!res.ok) {
				const { message } = await res.json()
				console.log('Error deleting channel', message)
				toast.error(message)
				return
			}

			await invalidateAll()

			toast.success('Channel deleted')
			goto(`/workspaces/${$page.params.id}`)
		} catch (error) {
			console.log('Error deleting channel', error)
			toast.error('Error deleting channel')
		} finally {
			isLoading = false
		}
	}
</script>

<div class="flex h-[49px] items-center overflow-hidden border-b bg-white px-4">
	<Dialog>
		<DialogTrigger asChild let:builder>
			<Button
				builders={[builder]}
				variant="ghost"
				class="w-auto overflow-hidden px-2 text-lg font-semibold"
				size="sm"
			>
				<span class="truncate"># {name}</span>
				<FaChevronDown class="ml-2 size-2.5" />
			</Button>
		</DialogTrigger>

		<DialogContent class="overflow-auto bg-gray-50 p-0">
			<DialogHeader class="border-b bg-white p-4">
				<DialogTitle>
					# {name}
				</DialogTitle>
			</DialogHeader>

			<div class="flex flex-col gap-y-2 px-4 pb-4">
				<Dialog
					open={editOpen}
					onOpenChange={(state) => {
						editOpen = state
					}}
				>
					<DialogTrigger disabled={member.role !== 'admin'}>
						<div class="cursor-pointer rounded-lg border bg-white px-5 py-4 hover:bg-gray-50">
							<div class="flex items-center justify-between">
								<p class="text-sm font-semibold">Channel name</p>
								{#if member.role === 'admin'}
									<p class="text-sm font-semibold text-[#1264a3] hover:underline">Edit</p>
								{/if}
							</div>
							<p class="text-left text-sm"># {name}</p>
						</div>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Rename this channel</DialogTitle>
						</DialogHeader>

						<form class="space-y-4" onsubmit={handleSubmit}>
							<Input
								name="name"
								disabled={isLoading}
								required
								autofocus
								minlength={3}
								maxlength={80}
								placeholder="e.g. plan-budget"
								oninput={(e) => {
									const value = e.currentTarget.value.toLowerCase()
									e.currentTarget.value = value.replace(/\s+/g, '-').replace(/-+/g, '-')
								}}
							/>

							<DialogFooter>
								<Button
									onclick={() => {
										editOpen = false
									}}
									variant="outline"
									disabled={isLoading}
								>
									Cancel
								</Button>

								<Button disabled={isLoading} type="submit">Save</Button>
							</DialogFooter>
						</form>
					</DialogContent>
				</Dialog>

				<button
					onclick={deleteChannel}
					class="flex items-center gap-x-2 rounded-lg border bg-white px-5 py-4 text-rose-600 hover:bg-gray-50"
					disabled={isLoading}
				>
					<TrashIcon class="size-4" />
					<span class="text-sm font-semibold">Delete channel</span>
				</button>
			</div>
		</DialogContent>
	</Dialog>
</div>

<ConfirmModal
	title="Delete this channel?"
	message="You are about to delete this channel. This action is irreversible."
	bind:this={confirmModalComponent}
/>

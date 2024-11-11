<script lang="ts">
	import { page } from '$app/stores'
	import { Button } from '@/lib/components/ui/button'
	import ConfirmModal from '@/lib/components/confirm-modal.svelte'
	import {
		Dialog,
		DialogContent,
		DialogHeader,
		DialogTitle,
		DialogFooter,
		DialogClose,
	} from '@/lib/components/ui/dialog'
	import DialogDescription from '@/lib/components/ui/dialog/dialog-description.svelte'
	import { CopyIcon, RefreshCcw } from 'lucide-svelte'
	import { toast } from 'svelte-sonner'

	interface Props {
		open: boolean
		setOpen: (value: boolean) => void
	}

	const { open, setOpen }: Props = $props()
	const { id, name } = $derived($page.data.workspace)

	let joinCode = $state($page.data.workspace.joinCode)
	let regeneratingJoinCode = $state(false)

	let confirmModalComponent: ReturnType<typeof ConfirmModal>

	const handleCopy = () => {
		const inviteLink = `${window.location.origin}/join/${id}`

		navigator.clipboard.writeText(inviteLink).then(() => {
			toast.success('Invite link copied to clipboard')
		})
	}

	const handleNewCode = async () => {
		try {
			const ok = await confirmModalComponent.confirm()

			if (!ok) return

			regeneratingJoinCode = true
			const res = await fetch(`/api/workspaces/${id}/regenerate-join-code`, {
				method: 'PATCH',
			})

			if (!res.ok) {
				const { message } = await res.json()
				console.log('Error regenerating join code', message)
				toast.warning(message)
				return
			}

			const data = await res.json()
			joinCode = data.joinCode
			toast.success('New join code generated')
		} catch (error) {
			console.log('Error regenerating join code', error)
			toast.error('Error regenerating join code')
		} finally {
			regeneratingJoinCode = false
		}
	}
</script>

<Dialog {open} onOpenChange={setOpen}>
	<DialogContent>
		<DialogHeader>
			<DialogTitle>Invite people to {name}</DialogTitle>
			<DialogDescription>Use the code below to invite people to your workspace.</DialogDescription>
		</DialogHeader>

		<div class="flex flex-col items-center justify-center gap-y-2 py-10">
			<p class="text-4xl font-bold uppercase tracking-widest">{joinCode}</p>
			<Button variant="ghost" size="sm" onclick={handleCopy}>
				Copy link
				<CopyIcon class="ml-2 size-4" />
			</Button>
		</div>

		<div class="flex w-full items-center justify-between">
			<Button
				disabled={regeneratingJoinCode}
				onclick={handleNewCode}
				variant="outline"
				type="button"
			>
				New Code
				<RefreshCcw class="ml-2 size-4" />
			</Button>

			<Button onclick={() => setOpen(false)}>Close</Button>
		</div>
	</DialogContent>
</Dialog>

<ConfirmModal
	title="Are you sure?"
	message="This will deactivate the current invite code and generate a new one."
	bind:this={confirmModalComponent}
/>

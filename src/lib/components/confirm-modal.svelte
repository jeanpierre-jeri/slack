<script lang="ts">
	import { Button } from './ui/button'
	import {
		Dialog,
		DialogContent,
		DialogDescription,
		DialogFooter,
		DialogHeader,
		DialogTitle,
	} from './ui/dialog'

	interface Props {
		title: string
		message: string
	}

	const { message, title }: Props = $props()

	let promise = $state<{ resolve: (value: boolean) => void } | null>(null)

	export const confirm = () =>
		new Promise((resolve) => {
			promise = { resolve }
		})

	const handleClose = () => {
		promise = null
	}

	const handleCancel = () => {
		promise?.resolve(false)
		handleClose()
	}

	const handleConfirm = () => {
		promise?.resolve(true)
		handleClose()
	}
</script>

<Dialog open={promise !== null}>
	<DialogContent>
		<DialogHeader>
			<DialogTitle>
				{title}
			</DialogTitle>
			<DialogDescription>
				{message}
			</DialogDescription>
		</DialogHeader>

		<DialogFooter class="pt-2">
			<Button onclick={handleCancel} variant="outline">Cancel</Button>
			<Button onclick={handleConfirm} variant="outline">Confirm</Button>
		</DialogFooter>
	</DialogContent>
</Dialog>

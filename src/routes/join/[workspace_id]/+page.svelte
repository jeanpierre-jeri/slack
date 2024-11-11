<script lang="ts">
	import { page } from '$app/stores'
	import { Button } from '@/lib/components/ui/button'
	import { OTPInput, OTPRoot } from '@jimmyverburgt/svelte-input-otp'
	import Minus from 'lucide-svelte/icons/minus'
	import { toast } from 'svelte-sonner'

	const workspaceId = $page.params.workspace_id
	const { data } = $props()
	const workspace = data.workspace

	async function handleOtpComplete(otp: string) {
		try {
			const res = await fetch(`/api/workspaces/${workspaceId}/join`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					joinCode: otp.toLowerCase(),
				}),
			})

			if (!res.ok) {
				const { message } = await res.json()
				console.log('Error joining workspace', message)
				toast.error(message)
				return
			}

			toast.success('Joined workspace')
		} catch (error) {
			console.log('Error joining workspace', error)
			toast.error('Error joining workspace')
		}
	}
</script>

<div
	class="flex h-full flex-col items-center justify-center gap-y-8 rounded-lg bg-white p-8 shadow-md"
>
	<img src="/logo.svg" alt="Logo" width="60" height="60" />

	<div class="flex max-w-md flex-col items-center justify-center gap-y-4">
		<div class="flex flex-col items-center justify-center gap-y-2">
			<h1 class="text-2xl font-bold">Join {workspace.name}</h1>
			<p class="text-md text-muted-foreground">Enter the workspace code to join</p>
		</div>

		<OTPRoot
			maxLength={6}
			pattern="digitsAndChars"
			autoFocus
			onComplete={handleOtpComplete}
			className="flex items-center gap-2 uppercase"
		>
			<div class="flex items-center">
				<OTPInput
					index={0}
					className="relative flex h-20 w-16 items-center justify-center border-y border-r border-input text-3xl transition-all first:rounded-l-md first:border-l last:rounded-r-md"
					focusClassName="z-10 ring-2 ring-ring ring-offset-background"
				/>
				<OTPInput
					index={1}
					className="relative flex h-20 w-16 items-center justify-center border-y border-r border-input text-3xl transition-all first:rounded-l-md first:border-l last:rounded-r-md"
					focusClassName="z-10 ring-2 ring-ring ring-offset-background"
				/>
				<OTPInput
					index={2}
					className="relative flex h-20 w-16 items-center justify-center border-y border-r border-input text-3xl transition-all first:rounded-l-md first:border-l last:rounded-r-md"
					focusClassName="z-10 ring-2 ring-ring ring-offset-background"
				/>
			</div>
			<div class="mx-1">
				<Minus />
			</div>
			<div class="flex items-center">
				<OTPInput
					index={3}
					className="relative flex h-20 w-16 items-center justify-center border-y border-r border-input text-3xl transition-all first:rounded-l-md first:border-l last:rounded-r-md"
					focusClassName="z-10 ring-2 ring-ring ring-offset-background"
				/>
				<OTPInput
					index={4}
					className="relative flex h-20 w-16 items-center justify-center border-y border-r border-input text-3xl transition-all first:rounded-l-md first:border-l last:rounded-r-md"
					focusClassName="z-10 ring-2 ring-ring ring-offset-background"
				/>
				<OTPInput
					index={5}
					className="relative flex h-20 w-16 items-center justify-center border-y border-r border-input text-3xl transition-all first:rounded-l-md first:border-l last:rounded-r-md"
					focusClassName="z-10 ring-2 ring-ring ring-offset-background"
				/>
			</div>
		</OTPRoot>

		<div class="flex gap-x-4">
			<Button size="lg" variant="outline" href="/">Back to home</Button>
		</div>
	</div>
</div>

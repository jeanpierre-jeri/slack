<script lang="ts">
	import GithubIcon from '@/lib/components/icons/github-icon.svelte'
	import GoogleIcon from '@/lib/components/icons/google-icon.svelte'
	import Button from '@/lib/components/ui/button/button.svelte'
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle,
	} from '@/lib/components/ui/card'
	import Input from '@/lib/components/ui/input/input.svelte'
	import Separator from '@/lib/components/ui/separator/separator.svelte'
	import type { SignInFlow } from './types'
	import { signIn } from '@auth/sveltekit/client'

	interface Props {
		setState: (state: SignInFlow) => void
	}

	let pending = $state(false)

	const handleOauth = async (provider: 'github' | 'google') => {
		pending = true
		await signIn(provider, { callbackUrl: '/' })
	}

	const handleSignIn = async (
		e: SubmitEvent & {
			currentTarget: EventTarget & HTMLFormElement
		},
	) => {
		pending = true
		e.preventDefault()
		const form = e.currentTarget
		const data = new FormData(form)
		const email = data.get('email')
		await signIn('nodemailer', { email, callbackUrl: '/' })
	}
</script>

<Card class="h-full w-full p-8">
	<CardHeader class="px-0 pt-0">
		<CardTitle>Login to continue</CardTitle>
		<CardDescription>Use your email or another service to continue</CardDescription>
	</CardHeader>
	<CardContent class="space-y-5 px-0 pb-0">
		<form class="space-y-2.5" onsubmit={handleSignIn}>
			<Input name="email" disabled={pending} placeholder="Email" type="email" required />

			<Button type="submit" class="w-full" size="lg" disabled={pending}>Continue</Button>
		</form>

		<Separator />

		<div class="flex flex-col gap-y-2.5">
			<Button
				disabled={pending}
				onclick={() => handleOauth('google')}
				variant="outline"
				class="grid w-full grid-cols-[auto_1fr]"
			>
				<GoogleIcon class="size-5" />
				Continue with Google
			</Button>

			<Button
				disabled={pending}
				onclick={() => handleOauth('github')}
				variant="outline"
				class="grid w-full grid-cols-[auto_1fr]"
			>
				<GithubIcon class="size-5" />
				Continue with Github
			</Button>
		</div>
	</CardContent>
</Card>

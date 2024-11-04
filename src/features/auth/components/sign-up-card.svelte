<script lang="ts">
	import GithubIcon from '@/lib/components/icons/github-icon.svelte'
	import GoogleIcon from '@/lib/components/icons/google-icon.svelte'
	import Button from '@/lib/components/ui/button/button.svelte'
	import CardContent from '@/lib/components/ui/card/card-content.svelte'
	import CardDescription from '@/lib/components/ui/card/card-description.svelte'
	import CardHeader from '@/lib/components/ui/card/card-header.svelte'
	import CardTitle from '@/lib/components/ui/card/card-title.svelte'
	import Card from '@/lib/components/ui/card/card.svelte'
	import Input from '@/lib/components/ui/input/input.svelte'
	import Separator from '@/lib/components/ui/separator/separator.svelte'
	import type { SignInFlow } from './types'
	import { signIn } from '@auth/sveltekit/client'

	interface Props {
		setState: (state: SignInFlow) => void
	}

	let { setState }: Props = $props()
</script>

<Card class="h-full w-full p-8">
	<CardHeader class="px-0 pt-0">
		<CardTitle>Sign up to continue</CardTitle>
		<CardDescription>Use your email or another service to continue</CardDescription>
	</CardHeader>
	<CardContent class="space-y-5 px-0 pb-0">
		<form class="space-y-2.5">
			<Input name="email" disabled={false} placeholder="Email" type="email" required />

			<Input name="password" disabled={false} placeholder="Password" type="password" required />

			<Input
				name="confirmPassword"
				disabled={false}
				placeholder="Confirm Password"
				type="password"
				required
			/>

			<Button type="submit" class="w-full" size="lg" disabled={false}>Continue</Button>
		</form>

		<Separator />

		<div class="flex flex-col gap-y-2.5">
			<Button
				disabled={false}
				onclick={() => {}}
				variant="outline"
				class="grid w-full grid-cols-[auto_1fr]"
			>
				<GoogleIcon class="size-5" />
				Continue with Google
			</Button>

			<Button
				disabled={false}
				onclick={() => signIn('github', { callbackUrl: '/' })}
				variant="outline"
				class="grid w-full grid-cols-[auto_1fr]"
			>
				<GithubIcon class="size-5" />
				Continue with Github
			</Button>
		</div>

		<p class="text-xs text-muted-foreground">
			Already have an account?
			<button
				class="cursor-pointer text-sky-700 hover:underline"
				onclick={() => setState('signIn')}
			>
				Sign in
			</button>
		</p>
	</CardContent>
</Card>

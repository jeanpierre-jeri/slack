<script lang="ts">
	import UserButton from '@/features/auth/components/user-button.svelte'
	import WorkspaceSwitcher from './workspace-switcher.svelte'
</script>

<aside class="flex flex-col items-center gap-y-4 bg-[#481349] pb-1 pt-2">
	<WorkspaceSwitcher />
	<div class="mt-auto flex flex-col items-center justify-center gap-y-1">
		<UserButton />
	</div>
</aside>

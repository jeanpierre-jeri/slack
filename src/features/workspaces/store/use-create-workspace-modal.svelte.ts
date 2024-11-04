export const workspaceModal = createWorkspaceModalStore(false)

function createWorkspaceModalStore(initial: boolean) {
	let open = $state(initial)

	return {
		get open() {
			return open
		},
		set open(state: boolean) {
			open = state
		},
	}
}

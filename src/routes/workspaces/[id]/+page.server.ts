import { redirect } from '@sveltejs/kit'

export const load = async ({ locals, parent, params }) => {
	const { auth } = locals
	const session = await auth()

	const userId = session?.user?.id

	if (!userId) {
		throw redirect(307, '/auth')
	}

	const workspaceId = params.id
	const { channels } = await parent()

	if (channels.length !== 0) {
		throw redirect(307, `/workspaces/${workspaceId}/channels/${channels[0].id}`)
	}

	return {
		channels,
	}
}

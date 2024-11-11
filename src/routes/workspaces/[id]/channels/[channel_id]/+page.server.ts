import { redirect } from '@sveltejs/kit'

export const load = async ({ locals, params, parent }) => {
	const { auth } = locals
	const session = await auth()

	const userId = session?.user?.id

	if (!userId) {
		throw redirect(307, '/auth')
	}

	const workspaceId = params.id
	const channelId = params.channel_id

	const { channels } = await parent()

	const channel = channels.find((c) => c.id === channelId)
	if (channels.length === 0 || !channel) {
		throw redirect(307, `/workspaces/${workspaceId}`)
	}

	return {
		channel,
	}
}

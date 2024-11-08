import { getWorkspaces } from '@/services/db/workspaces'
import type { LayoutServerLoad } from './$types'
import { redirect } from '@sveltejs/kit'
import { getMemberByWorkspaceIdAndUserId, getMembersByWorkspaceId } from '@/services/db/members'
import { getChannelsByWorkspaceIdAndUserId } from '@/services/db/channels'

export const load: LayoutServerLoad = async ({ locals, params }) => {
	const { auth } = locals
	const session = await auth()

	const userId = session?.user?.id

	if (!userId) {
		throw redirect(307, '/auth')
	}

	const [workspaces, member, channels, members] = await Promise.all([
		getWorkspaces({ userId }),
		getMemberByWorkspaceIdAndUserId({ userId, workspaceId: params.id }),
		getChannelsByWorkspaceIdAndUserId({ userId, workspaceId: params.id }),
		getMembersByWorkspaceId({ workspaceId: params.id }),
	])

	const workspace = workspaces.find((w) => w.id === params.id)

	if (!workspace || !member) {
		throw redirect(307, '/')
	}

	return {
		workspaces: workspaces.filter((w) => w.id !== params.id),
		workspace,
		member,
		channels,
		members,
	}
}

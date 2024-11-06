import { getWorkspaces } from '@/services/db/workspaces'
import type { LayoutServerLoad } from './$types'
import { redirect } from '@sveltejs/kit'
import { getMemberByWorkspaceIdAndUserId } from '@/services/db/members'

export const load: LayoutServerLoad = async ({ locals, params }) => {
	const { auth } = locals
	const session = await auth()

	const userId = session?.user?.id

	if (!userId) {
		throw redirect(307, '/auth')
	}

	const [workspaces, member] = await Promise.all([
		getWorkspaces({ userId }),
		getMemberByWorkspaceIdAndUserId({ userId, workspaceId: params.id }),
	])

	const workspace = workspaces.find((w) => w.id === params.id)

	if (!workspace || !member) {
		throw redirect(307, '/')
	}

	return {
		workspaces: workspaces.filter((w) => w.id !== params.id),
		workspace,
		member,
	}
}

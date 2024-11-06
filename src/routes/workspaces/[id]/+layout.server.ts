import { getWorkspaces } from '@/services/db/workspaces'
import type { LayoutServerLoad } from './$types'
import { redirect } from '@sveltejs/kit'

export const load: LayoutServerLoad = async ({ locals, params }) => {
	const { auth } = locals
	const session = await auth()

	if (!session?.user?.id) {
		throw redirect(307, '/auth')
	}

	const workspaces = await getWorkspaces({ userId: session.user.id })

	const workspace = workspaces.find((w) => w.id === params.id)

	if (!workspace) {
		throw redirect(307, '/')
	}

	return {
		workspaces: workspaces.filter((w) => w.id !== params.id),
		workspace,
	}
}

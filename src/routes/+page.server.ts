import { getWorkspaces } from '@/features/workspaces/api/use-get-workspaces'
import type { PageServerLoad } from './$types'
import { redirect } from '@sveltejs/kit'

export const load: PageServerLoad = async (event) => {
	const { auth } = event.locals
	const session = await auth()

	if (!session?.user) {
		throw redirect(303, '/auth')
	}

	const workspaces = await getWorkspaces({ userId: Number(session.user.id ?? '') })

	return {
		workspaces,
	}
}

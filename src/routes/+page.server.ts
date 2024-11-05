import { getWorkspaces } from '@/services/db/workspaces'
import type { PageServerLoad } from './$types'
import { redirect } from '@sveltejs/kit'

export const load: PageServerLoad = async (event) => {
	const { auth } = event.locals
	const session = await auth()

	if (!session?.user) {
		throw redirect(303, '/auth')
	}

	const workspaces = await getWorkspaces({ userId: Number(session.user.id ?? '') })

	if (workspaces.length) {
		throw redirect(303, `/workspaces/${workspaces[0].id}`)
	}

	return {
		workspaces,
	}
}

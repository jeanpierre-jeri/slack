import { getWorkspaces } from '@/services/db/workspaces'
import { redirect } from '@sveltejs/kit'

export const load = async (event) => {
	const { auth } = event.locals
	const session = await auth()

	const userId = session?.user?.id

	if (!userId) {
		throw redirect(303, '/auth')
	}

	const workspaces = await getWorkspaces({ userId })

	if (workspaces.length) {
		throw redirect(303, `/workspaces/${workspaces[0].id}`)
	}

	return {
		workspaces,
	}
}

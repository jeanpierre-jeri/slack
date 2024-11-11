import { getWorkspaceByIdPublic } from '@/services/db/workspaces'
import { redirect } from '@sveltejs/kit'

export const load = async ({ locals, params }) => {
	const { auth, client } = locals
	const session = await auth()

	const userId = session?.user?.id

	if (!userId) {
		throw redirect(303, '/auth')
	}

	const workspaceId = params.workspace_id

	const workspace = await getWorkspaceByIdPublic({ id: workspaceId })

	if (!workspace) {
		throw redirect(303, '/')
	}

	const { rows } = await client.query({
		text: 'SELECT 1 FROM members WHERE "workspaceId" = $1 AND "userId" = $2',
		values: [workspaceId, userId],
	})

	if (rows.length > 0) {
		throw redirect(303, `/workspaces/${workspaceId}`)
	}

	return {
		workspace,
	}
}

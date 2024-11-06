import { getMemberByWorkspaceIdAndUserId, getMembersByWorkspaceId } from '@/services/db/members'
import { json } from '@sveltejs/kit'

export async function GET({ locals, params, url }) {
	try {
		const { auth } = locals
		const session = await auth()

		const userId = session?.user?.id

		if (!userId) {
			return json({ message: 'Unauthorized' }, { status: 401 })
		}

		const allMembers = url.searchParams.get('allMembers') === 'true'

		const fn = allMembers ? getMembersByWorkspaceId : getMemberByWorkspaceIdAndUserId
		const response = await fn({ userId, workspaceId: params.id })

		return json(response)
	} catch (error) {
		console.log('Error fethcing workspace members:', error)
		return json({ message: 'Error fethcing workspace members' }, { status: 500 })
	}
}

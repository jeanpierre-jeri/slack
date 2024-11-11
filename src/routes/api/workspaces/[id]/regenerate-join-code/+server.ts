import { generateCode } from '@/lib/utils.js'
import { json } from '@sveltejs/kit'

export async function PATCH({ params, locals }) {
	try {
		const workspaceId = params.id
		const { auth, client } = locals
		const session = await auth()
		const userId = session?.user?.id

		if (!userId) {
			throw json({ message: 'Unauthorized' }, { status: 401 })
		}

		const { rows } = await client.query<{ role: 'admin' | 'member' }>({
			text: 'SELECT role FROM members WHERE "userId" = $1 AND "workspaceId" = $2',
			values: [userId, workspaceId],
		})

		const member = rows[0]

		if (!member || member.role !== 'admin') {
			return json({ message: 'Unauthorized' }, { status: 401 })
		}

		const joinCode = generateCode()

		await client.query({
			text: 'UPDATE workspaces SET "joinCode" = $1 WHERE id = $2',
			values: [joinCode, workspaceId],
		})

		return json({ message: 'Join code regenerated', joinCode }, { status: 200 })
	} catch (error) {
		console.log('Error regenerating join code', error)
		return json({ message: 'Error regenerating join code' }, { status: 500 })
	}
}

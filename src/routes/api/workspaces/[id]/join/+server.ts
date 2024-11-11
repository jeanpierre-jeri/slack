import { json } from '@sveltejs/kit'
import { z } from 'zod'

const schema = z.object({
	joinCode: z
		.string()
		.length(6)
		.transform((value) => value.toLowerCase()),
})

export async function POST({ locals, params, request }) {
	try {
		const body = await request.json()
		const parsed = await schema.spa(body)

		if (!parsed.success) {
			throw json({ message: 'Invalid join code' }, { status: 400 })
		}

		const { joinCode } = parsed.data

		const { auth, client } = locals
		const workspaceId = params.id
		const session = await auth()

		const userId = session?.user?.id

		if (!userId) {
			throw json({ message: 'Unauthorized' }, { status: 401 })
		}

		const { rows } = await client.query({
			text: 'SELECT "joinCode" FROM workspaces WHERE id = $1',
			values: [workspaceId],
		})

		const workspace = rows[0]

		if (workspace.joinCode !== joinCode) {
			throw json({ message: 'Invalid join code' }, { status: 401 })
		}

		const { rows: members } = await client.query({
			text: 'SELECT 1 FROM members WHERE "userId" = $1 AND "workspaceId" = $2  ',
			values: [userId, workspaceId],
		})

		if (members.length > 0) {
			throw json({ message: 'Already a member of this workspace' }, { status: 401 })
		}

		await client.query({
			text: 'INSERT INTO members ("userId", "workspaceId", "role") VALUES ($1, $2, $3)',
			values: [userId, workspaceId, 'member'],
		})

		return json({ message: 'Joined workspace' }, { status: 200 })
	} catch (error) {
		console.log('Error joining workspace', error)
		return json({ message: 'Error joining workspace' }, { status: 500 })
	}
}

import { json } from '@sveltejs/kit'
import { z } from 'zod'

const schema = z.object({
	name: z.string().min(3).max(80),
})

export async function PATCH({ locals, params, request }) {
	try {
		const { auth, client } = locals

		const session = await auth()

		const userId = session?.user?.id

		if (!userId) {
			throw json({ message: 'Unauthorized' }, { status: 401 })
		}

		const { rows } = await client.query<{ role: 'admin' | 'member' }>({
			text: 'SELECT role FROM members WHERE "userId" = $1 AND "workspaceId" = $2',
			values: [userId, params.id],
		})

		const member = rows[0]

		if (!member || member.role !== 'admin') {
			return json({ message: 'Unauthorized' }, { status: 401 })
		}

		const body = await request.json()

		const parsed = await schema.spa(body)

		if (!parsed.success) {
			return json(
				{
					message: parsed.error.issues.map((i) => i.message).join(', '),
					issues: parsed.error.issues,
				},
				{ status: 400 },
			)
		}

		const { name } = parsed.data

		await client.query({
			text: 'UPDATE workspaces SET name = $1 WHERE id = $2',
			values: [name, params.id],
		})

		return json({ message: 'Workspace updated', id: params.id }, { status: 200 })
	} catch (error) {
		console.log('Error updating workspace', error)
		return json({ message: 'Error updating workspace' }, { status: 500 })
	}
}

export async function DELETE({ locals, params }) {
	try {
		const { auth, client } = locals

		const session = await auth()

		const userId = session?.user?.id

		if (!userId) {
			throw json({ message: 'Unauthorized' }, { status: 401 })
		}

		const { rows } = await client.query<{ role: 'admin' | 'member' }>({
			text: 'SELECT role FROM members WHERE "userId" = $1 AND "workspaceId" = $2',
			values: [userId, params.id],
		})

		const member = rows[0]

		if (!member || member.role !== 'admin') {
			return json({ message: 'Unauthorized' }, { status: 401 })
		}

		await client.query({
			text: 'DELETE FROM workspaces WHERE id = $1',
			values: [params.id],
		})

		return json({ message: 'Workspace deleted', id: params.id }, { status: 200 })
	} catch (error) {
		console.log('Error deleting workspace', error)
		return json({ message: 'Error deleting workspace' }, { status: 500 })
	}
}

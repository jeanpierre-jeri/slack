import { json } from '@sveltejs/kit'
import { z } from 'zod'

const schema = z.object({
	name: z.string().min(3),
})

export async function POST({ request, locals }) {
	try {
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

		const { auth, client } = locals
		const session = await auth()

		if (!session?.user?.id) {
			return json({ message: 'Unauthorized' }, { status: 401 })
		}

		//TODO: Create proper method later
		const joinCode = '123456'

		const { name } = parsed.data

		const { rows } = await client.query({
			text: 'INSERT INTO workspaces (name, "userId", "joinCode") VALUES ($1, $2, $3) RETURNING id',
			values: [name, session.user.id, joinCode],
		})

		return json({ workspaceId: rows[0].id }, { status: 200 })
	} catch (error) {
		console.log('Error creating workspace', error)
		return json({ message: 'Error creating workspace' }, { status: 500 })
	}
}

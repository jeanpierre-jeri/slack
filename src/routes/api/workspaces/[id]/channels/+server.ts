import { json } from '@sveltejs/kit'
import { z } from 'zod'

const schema = z.object({
	name: z
		.string()
		.min(3)
		.max(80)
		.transform((name) => {
			return name.toLowerCase().replace(/\s+/g, '-').replace(/-+/g, '-')
		}),
})

export async function POST({ request, locals, params }) {
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

		const userId = session?.user?.id

		if (!userId) {
			return json({ message: 'Unauthorized' }, { status: 401 })
		}

		const { rows } = await client.query({
			text: 'SELECT role FROM members WHERE "userId" = $1 AND "workspaceId" = $2',
			values: [userId, params.id],
		})

		if (!rows.length || rows[0].role !== 'admin') {
			return json({ message: 'Unauthorized' }, { status: 401 })
		}

		const { name } = parsed.data

		const result = await client.query({
			text: `
        INSERT INTO channels (workspace_id, name) 
        VALUES ($1, $2) 
        RETURNING id
      `,
			values: [params.id, name],
		})

		const channelId = result.rows[0].id

		return json({ channelId }, { status: 200 })
	} catch (error) {
		console.log('Error creating workspace', error)
		return json({ message: 'Error creating workspace' }, { status: 500 })
	}
}

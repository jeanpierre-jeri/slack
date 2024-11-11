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

export async function PATCH({ locals, params, request }) {
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

		await client.query({
			text: `
        UPDATE channels
        SET name = $1
        WHERE id = $2
      `,
			values: [name, params.channel_id],
		})

		return json({ channelId: params.channel_id, message: 'Channel updated' }, { status: 200 })
	} catch (error) {
		console.log('Error updating channel', error)
		return json({ message: 'Error updating channel' }, { status: 500 })
	}
}

export async function DELETE({ locals, params }) {
	try {
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

		await client.query({
			text: `
          DELETE FROM channels
          WHERE id = $1
        `,
			values: [params.channel_id],
		})

		return json({ message: 'Channel deleted' }, { status: 200 })
	} catch (error) {
		console.log('Error deleting channel', error)
		return json({ message: 'Error deleting channel' }, { status: 500 })
	}
}

import { pool } from '@/db'

export interface Channel {
	id: string
	name: string
}

export async function getChannelsByWorkspaceIdAndUserId({
	userId,
	workspaceId,
}: {
	userId: string
	workspaceId: string
}) {
	try {
		const client = await pool.connect()
		const query = {
			text: `
        SELECT 
          c.id,
          c.name
        FROM members m
        JOIN channels c ON c.workspace_id = m."workspaceId"
        WHERE m."workspaceId" = $1
          AND m."userId" = $2
      `,
			values: [workspaceId, userId],
		}

		const { rows } = await client.query<Channel>(query)

		client.release()

		return rows
	} catch (error) {
		console.error('Error fetching workspace members:', error)
		return []
	}
}

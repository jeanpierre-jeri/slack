import { pool } from '@/db'

export interface Member {
	id: string
	role: string
	workspaceId: string
}

export async function getMemberByWorkspaceIdAndUserId({
	userId,
	workspaceId,
}: {
	userId: string
	workspaceId: string
}) {
	try {
		const client = await pool.connect()
		const query = {
			text: 'SELECT id, role, "workspaceId" FROM members WHERE "workspaceId" = $1 AND "userId" = $2',
			values: [workspaceId, userId],
		}

		const { rows } = await client.query<Member>(query)

		client.release()
		return rows[0]
	} catch (error) {
		console.error('Error fetching workspace members:', error)
		return null
	}
}

export async function getMembersByWorkspaceId({ workspaceId }: { workspaceId: string }) {
	try {
		const client = await pool.connect()
		const query = {
			text: 'SELECT id, role, "workspaceId" FROM members WHERE "workspaceId" = $1',
			values: [workspaceId],
		}

		const { rows } = await client.query<Member>(query)

		client.release()
		return rows
	} catch (error) {
		console.error('Error fetching workspace members:', error)
		return []
	}
}

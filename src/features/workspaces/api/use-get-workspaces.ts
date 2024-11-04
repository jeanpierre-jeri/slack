import { pool } from '@/db'

export interface Workspace {
	id: string
	name: string
	joinCode: string
}

export async function getWorkspaces({ userId }: { userId: number }) {
	const client = await pool.connect()
	try {
		const { rows } = await client.query<Workspace>({
			text: `SELECT id, name, "joinCode" FROM workspaces WHERE "userId" = $1`,
			values: [userId],
		})

		return rows
	} catch (error) {
		console.error('Error fetching workspaces:', error)
		return []
	} finally {
		client.release()
	}
}

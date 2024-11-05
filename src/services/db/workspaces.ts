import { pool } from '@/db'

export interface Workspace {
	id: string
	name: string
	joinCode: string
}

export async function getWorkspaces({ userId }: { userId: number }) {
	try {
		const client = await pool.connect()
		const { rows } = await client.query<Workspace>({
			text: `SELECT id, name, "joinCode" FROM workspaces WHERE "userId" = $1`,
			values: [userId],
		})

		client.release()
		return rows
	} catch (error) {
		console.error('Error fetching workspaces:', error)
		return []
	}
}

export async function getWorkspaceById({ id, userId }: { id: string; userId: string }) {
	try {
		const client = await pool.connect()
		const { rows } = await client.query<Workspace>({
			text: `SELECT id, name, "joinCode" FROM workspaces WHERE id = $1 AND "userId" = $2`,
			values: [id, userId],
		})

		client.release()
		return rows[0]
	} catch (error) {
		console.error('Error fetching workspaces:', error)
		return null
	}
}

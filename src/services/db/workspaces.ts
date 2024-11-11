import { pool } from '@/db'

export interface Workspace {
	id: string
	name: string
	joinCode: string
}

export async function getWorkspaces({ userId }: { userId: string }) {
	try {
		const client = await pool.connect()
		const { rows } = await client.query<Workspace>({
			text: `
				SELECT 
					w.id, 
					w.name, 
					w."joinCode" 
				FROM members m
				JOIN workspaces w ON m."workspaceId" = w.id
				WHERE m."userId" = $1`,
			values: [userId],
		})

		client.release()
		return rows
	} catch (error) {
		console.error('Error fetching workspaces:', error)
		return []
	}
}

export async function getWorkspaceById({ id }: { id: string }) {
	try {
		const client = await pool.connect()
		const { rows } = await client.query<Workspace>({
			text: `SELECT id, name, "joinCode" FROM workspaces WHERE id = $1`,
			values: [id],
		})

		client.release()
		return rows[0]
	} catch (error) {
		console.error('Error fetching workspaces:', error)
		return null
	}
}

export async function getWorkspaceByIdPublic({ id }: { id: string }) {
	try {
		const client = await pool.connect()
		const { rows } = await client.query<{ name: string }>({
			text: `SELECT name FROM workspaces WHERE id = $1`,
			values: [id],
		})

		client.release()
		return rows[0]
	} catch (error) {
		console.error('Error fetching workspaces:', error)
		return null
	}
}

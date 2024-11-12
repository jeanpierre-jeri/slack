import { pool } from '@/db'

export interface Member {
	userId: string
	user: {
		id: string
		name: string | null
		image: string | null
	}
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
			text: `
				SELECT 
					m."userId", 
					m.role, 
					m."workspaceId",
					JSON_BUILD_OBJECT(
						'id', u.id,
						'name', u.name,
						'image', u.image
					) AS user
				FROM members m
				JOIN users u ON u.id = m."userId" 
				WHERE m."workspaceId" = $1 
					AND m."userId" = $2
			`,
			values: [workspaceId, userId],
		}

		const { rows } = await client.query<Member>(query)

		client.release()
		return rows[0]
	} catch (error) {
		console.error('Error fetching workspace member:', error)
		return null
	}
}

export async function getMembersByWorkspaceId({ workspaceId }: { workspaceId: string }) {
	try {
		const client = await pool.connect()
		const query = {
			text: `
				SELECT 
					"userId", 
					role, 
					"workspaceId",
					JSON_BUILD_OBJECT(
						'id', u.id,
						'name', u.name,
						'image', u.image
					) AS user
				FROM members m
				JOIN users u ON u.id = m."userId"
				WHERE m."workspaceId" = $1
			`,
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

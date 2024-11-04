import { env } from '$env/dynamic/private'
import type { Handle } from '@sveltejs/kit'
import pg from 'pg'

export const pool = new pg.Pool({
	connectionString: env.DATABASE_URL,
	max: 20,
	idleTimeoutMillis: 30000,
	connectionTimeoutMillis: 2000,
})

export const handle = (async ({ event, resolve }) => {
	const client = await pool.connect()

	event.locals = {
		...event.locals,
		client,
	}

	const response = await resolve(event)

	client.release()

	return response
}) satisfies Handle

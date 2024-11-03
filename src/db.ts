import { env } from '$env/dynamic/private'
import type { Handle } from '@sveltejs/kit'
import postgres from 'postgres'

export const sql = postgres(env.DATABASE_URL, {
	idle_timeout: 30,
	max_lifetime: 60 * 30,
	connect_timeout: 20,
	max: 20,
})

export const handle = (async ({ event, resolve }) => {
	event.locals = {
		...event.locals,
		sql,
	}

	const response = await resolve(event)

	return response
}) satisfies Handle

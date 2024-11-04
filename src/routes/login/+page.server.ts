import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load = (async ({ locals, url }) => {
	const { auth } = locals
	const session = await auth()

	if (session) {
		throw redirect(303, '/profile')
	}

	return {
		url: url.origin,
	}
}) satisfies PageServerLoad

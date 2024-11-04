import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load = (async ({ locals }) => {
	const { auth } = locals
	const session = await auth()

	if (!session) {
		throw redirect(303, '/')
	}
}) satisfies PageServerLoad

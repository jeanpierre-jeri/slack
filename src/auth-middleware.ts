import type { Handle } from '@sveltejs/kit'

const PUBLIC_PAGES = ['/auth']

export const handle = (async ({ event, resolve }) => {
	const { locals, url } = event
	const { auth } = locals
	const { pathname } = url
	const session = await auth()

	if (!PUBLIC_PAGES.includes(pathname) && !session) {
		return new Response(null, { status: 302, headers: { Location: '/auth' } })
	}

	if (PUBLIC_PAGES.includes(pathname) && session) {
		return new Response(null, { status: 302, headers: { Location: '/' } })
	}

	const response = await resolve(event)

	return response
}) satisfies Handle

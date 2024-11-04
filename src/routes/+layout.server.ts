import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async (event) => {
	const { auth } = event.locals
	const session = await auth()

	return {
		session,
	}
}

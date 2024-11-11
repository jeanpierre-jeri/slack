export const load = async (event) => {
	const { auth } = event.locals
	const session = await auth()

	return {
		session,
	}
}

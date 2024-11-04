import PostgresAdapter from '@auth/pg-adapter'
import { SvelteKitAuth } from '@auth/sveltekit'
import { pool } from './db'
import GitHub from '@auth/sveltekit/providers/github'

export const { handle, signIn, signOut } = SvelteKitAuth({
	adapter: PostgresAdapter(pool),
	providers: [GitHub],
	trustHost: true,
	callbacks: {
		session: async ({ session, user }) => {
			const { id, name, image, email } = user
			const { expires } = session

			return {
				user: {
					id,
					name,
					image,
					email,
				},
				expires,
			}
		},
	},
})

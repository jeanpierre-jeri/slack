import PostgresAdapter from '@auth/pg-adapter'
import { SvelteKitAuth } from '@auth/sveltekit'
import { pool } from './db'
import GitHub from '@auth/sveltekit/providers/github'
import Google from '@auth/sveltekit/providers/google'

export const { handle, signIn, signOut } = SvelteKitAuth({
	adapter: PostgresAdapter(pool),
	providers: [
		GitHub({ allowDangerousEmailAccountLinking: true }),
		Google({ allowDangerousEmailAccountLinking: true }),
	],
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

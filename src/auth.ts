import PostgresAdapter from '@auth/pg-adapter'
import { SvelteKitAuth } from '@auth/sveltekit'
import { pool } from './db'
import GitHub from '@auth/sveltekit/providers/github'
import Google from '@auth/sveltekit/providers/google'
import Nodemailer from '@auth/sveltekit/providers/nodemailer'
import { env } from '$env/dynamic/private'

export const { handle, signIn, signOut } = SvelteKitAuth({
	adapter: PostgresAdapter(pool),
	providers: [
		GitHub({ allowDangerousEmailAccountLinking: true }),
		Google({ allowDangerousEmailAccountLinking: true }),
		Nodemailer({
			server: {
				service: 'gmail',
				auth: {
					user: env.EMAIL_FROM,
					pass: env.EMAIL_PASSWORD,
				},
			},
			from: env.EMAIL_FROM,
		}),
	],
	trustHost: true,

	// callbacks: {
	// 	session: async ({ session, user }) => {
	// 		const { id, name, image, email } = user
	// 		const { expires } = session

	// 		return {
	// 			user: {
	// 				id,
	// 				name,
	// 				image,
	// 				email,
	// 			},
	// 			expires,
	// 		}
	// 	},
	// },
})

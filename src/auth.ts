import PostgresAdapter from '@auth/pg-adapter'
import { SvelteKitAuth } from '@auth/sveltekit'
import { sql } from './db'

export const { handle } = SvelteKitAuth({
	adapter: PostgresAdapter(sql),
	providers: [],
})

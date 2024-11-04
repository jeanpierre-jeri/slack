import type { PoolClient } from 'pg'
declare global {
	namespace App {
		interface Locals {
			client: PoolClient
		}

		// interface Error {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {}

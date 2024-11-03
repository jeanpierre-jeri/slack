import type { Sql } from 'postgres'
declare global {
	namespace App {
		interface Locals {
			sql: Sql
		}

		// interface Error {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {}

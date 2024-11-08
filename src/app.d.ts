import type { PoolClient } from 'pg'
import type { Workspace } from './services/db/workspaces'
import type { Member } from './services/db/members'
import type { Channel } from './services/db/channels'
declare global {
	namespace App {
		interface Locals {
			client: PoolClient
		}

		// interface Error {}
		interface PageData {
			workspaces: Workspace[]
			workspace: Workspace
			member: Member
			channels: Channel[]
			members: Member[]
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {}

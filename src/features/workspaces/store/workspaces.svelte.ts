import { ref } from '@/lib/utils.svelte'
import type { Workspace } from '@/services/db/workspaces'

export const workspacesStore = ref<Workspace[]>([])

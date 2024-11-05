import { ref } from '@/lib/utils.svelte'
import type { Workspace } from '@/services/db/workspaces'

export const workspace = ref<Workspace>({ id: '', name: '', joinCode: '' })

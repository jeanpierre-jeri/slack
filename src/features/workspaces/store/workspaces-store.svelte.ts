import { ref } from '@/lib/utils.svelte'
import type { Workspace } from '../api/use-get-workspaces'

export const workspaces = ref<Workspace[]>([])

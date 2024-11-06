import { ref } from '@/lib/utils.svelte'
import type { Member } from '@/services/db/members'

export const memberStore = ref<Member>({ userId: '', role: '', workspaceId: '' })

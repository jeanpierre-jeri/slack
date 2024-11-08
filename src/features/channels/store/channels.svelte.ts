import { ref } from '@/lib/utils.svelte'
import type { Channel } from '@/services/db/channels'

export const channelsStore = ref<Channel[]>([])

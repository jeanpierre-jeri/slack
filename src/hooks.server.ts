import { sequence } from '@sveltejs/kit/hooks'

import { handle as authHandle } from './auth'
import { handle as dbHandle } from './db'

export const handle = sequence(dbHandle, authHandle)

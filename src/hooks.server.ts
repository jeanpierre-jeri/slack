import { sequence } from '@sveltejs/kit/hooks'

import { handle as authHandle } from './auth'
import { handle as dbHandle } from './db'
import { handle as authMiddlewareHandle } from './auth-middleware'

export const handle = sequence(dbHandle, authHandle, authMiddlewareHandle)

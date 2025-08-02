const { DEV, VITE_LOCAL } = import.meta.env

import { userService as local } from './user.service.local'
import { userService as remote } from './user.service.remote'

function getEmptyUser() {
    return {
        username: '',
        password: '',
        fullname: ''
    }
}

const service = VITE_LOCAL === 'true' ? local : remote
export const userService = { ...service, getEmptyUser }

if (DEV) window.userService = userService
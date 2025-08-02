import { userService } from '../../services/user'
import { socketService } from '../../services/socket.service'
import { store } from '../store'

import { showErrorMsg } from '../../services/event-bus.service'
import { CLOSE_LOGIN_MODAL, LOADING_DONE, LOADING_START } from '../system.reducer'
import { REMOVE_USER, SET_USER, SET_USERS, SET_WATCHED_USER } from '../user/user.reducer'

export async function loadUsers() {
    try {
        store.dispatch({ type: LOADING_START })
        const users = await userService.getUsers()
        store.dispatch({ type: SET_USERS, users })
    } catch (err) {
        console.log('UserActions: err in loadUsers', err)
    } finally {
        store.dispatch({ type: LOADING_DONE })
    }
}

export async function loadQuickLoginUsers() {
    try {
        const users = await userService.getUsers()
        const quickLoginUsers = users.filter(user => user.quickLogin)
        return quickLoginUsers
    } catch (err) {
        console.error('Failed to load quick login users:', err)
        throw err
    }
}

export async function removeUser(userId) {
    try {
        await userService.remove(userId)
        store.dispatch({ type: REMOVE_USER, userId })
    } catch (err) {
        console.log('UserActions: err in removeUser', err)
    }
}

export async function login(credentials) {
    try {
        const user = await userService.login(credentials)
        store.dispatch({
            type: SET_USER,
            user
        })
        socketService.login(user._id)
        return user
    } catch (err) {
        console.log('Cannot login', err)
        throw err
    }
}

export async function signup(credentials) {
    try {
        const user = await userService.signup(credentials)
        store.dispatch({
            type: SET_USER,
            user
        })
        socketService.login(user)
        return user
    } catch (err) {
        console.log('Cannot signup', err)
        throw err
    }
}

export async function logout() {
    try {
        await userService.logout()
        store.dispatch({
            type: SET_USER,
            user: null
        })
        socketService.logout()
    } catch (err) {
        console.log('Cannot logout', err)
        throw err
    }
}

export async function loadUser(userId) {
    try {
        const user = await userService.getById(userId)
        store.dispatch({ type: SET_USER, user })
    } catch (err) {
        showErrorMsg('Cannot load user')
        console.log('Cannot load user', err)
    }
}

export async function loadWatchedUser(userId) {
    try {
        const user = await userService.getById(userId)
        store.dispatch({ type: SET_WATCHED_USER, user })
    } catch (err) {
        showErrorMsg('Cannot load user')
        console.error('Cannot load watched user', err)
    }
}

export async function updateUser(user) {
    try {
        const updatedUser = await userService.update(user)
        store.dispatch({ type: SET_USER, user: updatedUser })
    } catch (err) {
        showErrorMsg('Cannot update user')
        console.error('Cannot change user', err)
        throw err
    }
}

export async function loginWithGoogle(credential) {
    try {
        const user = await userService.googleLogin(credential)
        store.dispatch({ type: SET_USER, user })
        socketService.login(user._id)
        store.dispatch({ type: CLOSE_LOGIN_MODAL })
        return user
    } catch (err) {
        console.log('Google login failed', err)
        throw err
    }
}

export async function quickLogin(username) {
    try {
        const user = await userService.quickLogin(username)
        store.dispatch({ type: SET_USER, user })
        socketService.login(user._id)
        store.dispatch({ type: CLOSE_LOGIN_MODAL })
        return user
    } catch (err) {
        console.log('Quick login failed', err)
        throw err
    }
}



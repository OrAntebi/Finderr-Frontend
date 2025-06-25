import { storageService } from '../async-storage.service'
import users from '../data/users.json' assert { type: 'json' }
import { saveToStorage } from '../util.service'

const USER_KEY = 'userDB'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getUsers,
    getById,
    remove,
    update,
    getLoggedinUser,
}

_initUserDB()

function _initUserDB() {
    const stored = JSON.parse(localStorage.getItem(USER_KEY))
    if (!stored || !stored.length) saveToStorage(USER_KEY, users)
}

async function getUsers() {
    const users = await storageService.query(USER_KEY)
    return users
}

async function getById(userId) {
    return await storageService.get(USER_KEY, userId)
}

function remove(userId) {
    return storageService.remove(USER_KEY, userId)
}

async function update({ _id, score }) {
    const user = await storageService.get(USER_KEY, _id)
    user.score = score
    await storageService.put(USER_KEY, user)

    // When admin updates other user's details, do not update loggedinUser
    const loggedinUser = getLoggedinUser()
    if (loggedinUser._id === user._id) _saveLocalUser(user)

    return user
}

async function login(userCred) {
    const users = await storageService.query(USER_KEY)
    const user = users.find(user => user.username === userCred.username)
    
    if (user) return _saveLocalUser(user)
}

async function signup(userCred) {
    if (!userCred.imgUrl && !userCred.fullname) userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'

    console.log('userCred: ', userCred)
    const user = await storageService.post(USER_KEY, userCred)
    return _saveLocalUser(user)
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function _saveLocalUser(user) {
    user = {
        _id: user._id,
        fullname: user.fullname,
        imgUrl: user.imgUrl,
    }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

import { storageService } from '../async-storage.service'
import { userService } from '../user/user.service.local'
import { saveToStorage } from '../util.service'
import orders from '../data/order.json' assert { type: 'json' }

const ORDER_KEY = 'orderDB'

export const orderService = {
    query,
    getById,
    save,
}

window.cs = orderService

_initOrderDB()

function _initOrderDB() {
    const stored = JSON.parse(localStorage.getItem(ORDER_KEY))
    if (!stored || !stored.length) saveToStorage(ORDER_KEY, orders)
}

async function query() {
    const loggedUser = userService.getLoggedinUser()

    if (!loggedUser) return []

    const orders = await storageService.query(ORDER_KEY)
    return orders.filter(order =>
        order.seller._id === loggedUser._id || order.buyer._id === loggedUser._id
    )
}

async function getById(orderId) {
    return await storageService.get(ORDER_KEY, orderId)
}

async function save(order) {
    let savedOrder
    if (order._id) {
        savedOrder = await storageService.put(ORDER_KEY, order)
    } else {
        savedOrder = await storageService.post(ORDER_KEY, order)
    }
    return savedOrder
}
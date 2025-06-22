import { storageService } from '../async-storage.service'
import { userService } from '../user/user.service.local'

const ORDER_KEY = 'orderDB'


export const orderService = {
    query,
    getById,
    save,
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
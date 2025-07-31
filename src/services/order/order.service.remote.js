import { httpService } from '../http.service'
import { userService } from '../user/user.service.local'


export const orderService = {
    query,
    getById,
    save,
}

async function query(filterBy = {}) {
    return await httpService.get('order', filterBy)
}

async function getById(orderId) {
    return await httpService.get(`order/${orderId}`)
}

async function save(order) {
    if (order._id) {
        return await httpService.put(`order/${order._id}`, order)
    } else {
        return await httpService.post('order', order)
    }
}
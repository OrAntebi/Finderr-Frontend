import { orderService } from '../../services/order'

import { store } from '../../store/store.js'
import { SET_ORDERS, UPDATE_ORDER } from '../order/order.reducer.js';


export async function loadOrders() {
    try {
        let orders = await orderService.query()
        store.dispatch({ type: SET_ORDERS, orders })
    } catch (err) {
        console.log('Cannot load orders', err)
        throw err
    }
}

export async function updateOrder(order) {
    try {
        const savedOrder = await orderService.save(order)
        store.dispatch({ type: UPDATE_ORDER, savedOrder })
    } catch (err) {
        console.log('Cannot save gig', err)
        throw err 
    }
}

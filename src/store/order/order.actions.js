import { orderService } from '../../services/order'

import { store } from '../../store/store.js'
import { SET_ORDERS } from '../order/order.reducer.js';


export async function loadOrders() {
    try {
        let orders = await orderService.query()


        store.dispatch({
            type: SET_ORDERS,
            orders
        })
    } catch (err) {
        console.log('Cannot load orders', err)
        throw err
    }
}
import { orderService } from '../../services/order'

import { store } from '../../store/store.js'
import { SET_ORDERS, SET_ORDER, UPDATE_ORDER } from '../order/order.reducer.js';


export async function loadOrders(filterBy = {}) {
    try {
        let orders = await orderService.query(filterBy)
        store.dispatch({ type: SET_ORDERS, orders })
    } catch (err) {
        console.log('Cannot load orders', err)
        throw err
    }
}


export async function loadOrder(orderId) {
    try {
        const order = await orderService.getById(orderId)
        store.dispatch(getCmdSetOrder(order))
        return order
    } catch (err) {
        console.log('Cannot load order', err)
        throw err
    }
}

export async function addOrder(order) {
    try {
        const savedOrder = await orderService.save(order)
        store.dispatch({ type: SET_ORDER, order: savedOrder })
        return savedOrder
    } catch (err) {
        console.error('Cannot save order', err)
        throw err
    }
}


export async function updateOrder(order) {
    try {
        const savedOrder = await orderService.save(order)
        store.dispatch({ type: UPDATE_ORDER, savedOrder })
    } catch (err) {
        console.log('Cannot save order', err)
        throw err
    }
}


function getCmdSetOrder(order) {
    return {
        type: SET_ORDER,
        order
    }
}

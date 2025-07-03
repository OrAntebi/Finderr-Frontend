export const SET_ORDERS = 'SET_ORDERS'
export const SET_ORDER = 'SET_ORDER'
export const UPDATE_ORDER = 'UPDATE_ORDER'

const initialState = {
    orders: [],
    order: null,
}

export function orderReducer(state = initialState, action) {
    var newState = state
    switch (action.type) {
        case SET_ORDERS:
            newState = { ...state, orders: action.orders }
            break
        case SET_ORDER:
            newState = { ...state, order: action.order }
            break
        case UPDATE_ORDER:
            return {
                ...state,
                orders: state.orders.map(order =>
                    order._id === action.savedOrder._id ? action.savedOrder : order
                )
            }
        default:
    }
    return newState
}
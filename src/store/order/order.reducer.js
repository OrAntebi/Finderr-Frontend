export const SET_ORDERS = 'SET_ORDERS'
export const UPDATE_ORDER = 'UPDATE_ORDER'

const initialState = {
    orders: [],
}

export function orderReducer(state = initialState, action) {
    var newState = state
    switch (action.type) {
        case SET_ORDERS:
            newState = { ...state, orders: action.orders }
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
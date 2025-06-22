export const SET_ORDERS = 'SET_ORDERS'

const initialState = {
    orders: [],
}

export function orderReducer(state = initialState, action) {
    var newState = state
    switch (action.type) {
        case SET_ORDERS:
            newState = { ...state, orders: action.orders }
            break
        default:
    }
    return newState
}
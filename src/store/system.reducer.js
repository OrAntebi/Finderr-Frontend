export const LOADING_START = 'LOADING_START'
export const LOADING_DONE = 'LOADING_DONE'
export const SHOW_BACKDROP = 'SHOW_BACKDROP'
export const HIDE_BACKDROP = 'HIDE_BACKDROP'

const initialState = {
    isLoading: false,
    isBackdropOpen: false,
}

export function systemReducer(state = initialState, action = {}) {
    switch (action.type) {
        case LOADING_START:
            return { ...state, isLoading: true }
        case LOADING_DONE:
            return { ...state, isLoading: false }
        case SHOW_BACKDROP:
            return { ...state, isBackdropOpen: true }
        case HIDE_BACKDROP:
            return { ...state, isBackdropOpen: false }
        default:
            return state
    }
}

export const LOADING_START = 'LOADING_START'
export const LOADING_DONE = 'LOADING_DONE'
export const SHOW_BACKDROP = 'SHOW_BACKDROP'
export const HIDE_BACKDROP = 'HIDE_BACKDROP'
export const OPEN_LOGIN_MODAL = 'OPEN_LOGIN_MODAL'
export const CLOSE_LOGIN_MODAL = 'CLOSE_LOGIN_MODAL'

const initialState = {
    isLoading: false,
    isBackdropOpen: false,
    loginModal: { isOpen: false, content: 'signin' }
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
        case OPEN_LOGIN_MODAL:
            return { ...state, loginModal: { isOpen: true, content: action.modalContent || 'signin' } }
        case CLOSE_LOGIN_MODAL:
            return { ...state, loginModal: { isOpen: false } }
        default:
            return state
    }
}

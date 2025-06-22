import { orderService } from "../../services/gig"

export const SET_GIGS = 'SET_GIGS'


const initialState = {
    gigs: [],
    gig: null,
    filterBy: gigService.getDefaultFilter()
}

export function gigReducer(state = initialState, action) {
    var newState = state
    switch (action.type) {
        case SET_GIGS:
            newState = { ...state, gigs: action.gigs }
            break
        default:
    }
    return newState
}
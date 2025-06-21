import { gigservice } from "../../services/gig"

export const SET_GIGS = 'SET_GIGS'
export const SET_GIG = 'SET_GIG'
export const REMOVE_GIG = 'REMOVE_GIG'
export const ADD_GIG = 'ADD_GIG'
export const UPDATE_GIG = 'UPDATE_GIG'
export const ADD_GIG_MSG = 'ADD_GIG_MSG'
export const SET_GIG_FILTER = 'SET_GIG_FILTER'



const initialState = {
    gigs: [],
    gig: null,
    filterBy: gigservice.getDefaultFilter()
}

export function gigReducer(state = initialState, action) {
    var newState = state
    var gigs
    switch (action.type) {
        case SET_GIGS:
            newState = { ...state, gigs: action.gigs }
            break
        case SET_GIG:
            newState = { ...state, gig: action.gig }
            break
        case REMOVE_GIG:
            const lastRemovedGig = state.gigs.find(gig => gig._id === action.gigId)
            gigs = state.gigs.filter(gig => gig._id !== action.gigId)
            newState = { ...state, gigs, lastRemovedGig }
            break
        case ADD_GIG:
            newState = { ...state, gigs: [...state.gigs, action.gig] }
            break
        case UPDATE_GIG:
            gigs = state.gigs.map(gig => (gig._id === action.gig._id) ? action.gig : gig)
            newState = { ...state, gigs }
            break
        case ADD_GIG_MSG:
            newState = { ...state, gig: { ...state.gig, msgs: [...state.gig.msgs || [], action.msg] } }
            break
        case SET_GIG_FILTER:
            return { ...state, filterBy: { ...state.filterBy, ...action.filterBy } }
        default:
    }
    return newState
}

// unitTestReducer()

// function unitTestReducer() {
//     var state = initialState
//     const gig1 = { _id: 'b101', vendor: 'Gig ' + parseInt(Math.random() * 10), msgs: [] }
//     const gig2 = { _id: 'b102', vendor: 'Gig ' + parseInt(Math.random() * 10), msgs: [] }

//     state = gigReducer(state, { type: SET_GIGS, gigs: [gig1] })
//     console.log('After SET_GIGS:', state)

//     state = gigReducer(state, { type: ADD_GIG, gig: gig2 })
//     console.log('After ADD_GIG:', state)

//     state = gigReducer(state, { type: UPDATE_GIG, gig: { ...gig2, vendor: 'Good' } })
//     console.log('After UPDATE_GIG:', state)

//     state = gigReducer(state, { type: REMOVE_GIG, gigId: gig2._id })
//     console.log('After REMOVE_GIG:', state)

//     const msg = { id: 'm' + parseInt(Math.random() * 100), txt: 'Some msg' }
//     state = gigReducer(state, { type: ADD_GIG_MSG, gigId: gig1._id, msg })
//     console.log('After ADD_GIG_MSG:', state)

//     state = gigReducer(state, { type: REMOVE_GIG, gigId: gig1._id })
//     console.log('After REMOVE_GIG:', state)
// }


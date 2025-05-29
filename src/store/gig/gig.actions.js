import { gigservice } from '../../services/gig/gig.service.local'
import { store } from '../store'
import { ADD_GIG, REMOVE_GIG, SET_GIGS, SET_GIG, UPDATE_GIG, ADD_GIG_MSG } from './gig.reducer'

export async function loadGigs(filterBy) {
    try {
        const gigs = await gigservice.query(filterBy)
        store.dispatch(getCmdSetGigs(gigs))
    } catch (err) {
        console.log('Cannot load gigs', err)
        throw err
    }
}

export async function loadGig(gigId) {
    try {
        const gig = await gigservice.getById(gigId)
        store.dispatch(getCmdSetGig(gig))
    } catch (err) {
        console.log('Cannot load gig', err)
        throw err
    }
}


export async function removeGig(gigId) {
    try {
        await gigservice.remove(gigId)
        store.dispatch(getCmdRemoveGig(gigId))
    } catch (err) {
        console.log('Cannot remove gig', err)
        throw err
    }
}

export async function addGig(gig) {
    try {
        const savedGig = await gigservice.save(gig)
        store.dispatch(getCmdAddGig(savedGig))
        return savedGig
    } catch (err) {
        console.log('Cannot add gig', err)
        throw err
    }
}

export async function updateGig(gig) {
    try {
        const savedGig = await gigservice.save(gig)
        store.dispatch(getCmdUpdateGig(savedGig))
        return savedGig
    } catch (err) {
        console.log('Cannot save gig', err)
        throw err
    }
}

export async function addGigMsg(gigId, txt) {
    try {
        const msg = await gigservice.addGigMsg(gigId, txt)
        store.dispatch(getCmdAddGigMsg(msg))
        return msg
    } catch (err) {
        console.log('Cannot add gig msg', err)
        throw err
    }
}

// Command Creators:
function getCmdSetGigs(gigs) {
    return {
        type: SET_GIGS,
        gigs
    }
}
function getCmdSetGig(gig) {
    return {
        type: SET_GIG,
        gig
    }
}
function getCmdRemoveGig(gigId) {
    return {
        type: REMOVE_GIG,
        gigId
    }
}
function getCmdAddGig(gig) {
    return {
        type: ADD_GIG,
        gig
    }
}
function getCmdUpdateGig(gig) {
    return {
        type: UPDATE_GIG,
        gig
    }
}
function getCmdAddGigMsg(msg) {
    return {
        type: ADD_GIG_MSG,
        msg
    }
}

// unitTestActions()
async function unitTestActions() {
    await loadGigs()
    await addGig(gigservice.getEmptyGig())
    await updateGig({
        _id: 'm1oC7',
        title: 'Gig-Good',
    })
    await removeGig('m1oC7')
    // TODO unit test addGigMsg
}

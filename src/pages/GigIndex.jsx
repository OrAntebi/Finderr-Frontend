import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { loadGigs, addGig, updateGig, removeGig, addGigMsg } from '../store/gig/gig.actions'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { gigservice } from '../services/gig/'
import { userService } from '../services/user'

import { GigList } from '../cmps/GigList'
import { GigFilter } from '../cmps/GigFilter'

export function GigIndex() {

    // const [filterBy, setFilterBy] = useState(gigservice.getDefaultFilter())
    const filterBy = useSelector(storeState => storeState.gigModule.filterBy)
    
    const gigs = useSelector(storeState => storeState.gigModule.gigs)

    useEffect(() => {
        loadGigs(filterBy)
    }, [filterBy])

    function onSetFilterBy(filterBy) {
        setFilterBy(prevFilterBy => ({ ...prevFilterBy, ...filterBy }))
    }

    async function onRemoveGig(gigId) {
        try {
            await removeGig(gigId)
            showSuccessMsg('Gig removed')
        } catch (err) {
            showErrorMsg('Cannot remove gig')
        }
    }

    async function onAddGig() {
        const gig = gigservice.getEmptyGig()
        gig.vendor = prompt('Vendor?')
        try {
            const savedGig = await addGig(gig)
            showSuccessMsg(`Gig added (id: ${savedGig._id})`)
        } catch (err) {
            showErrorMsg('Cannot add gig')
        }
    }

    async function onUpdateGig(gig) {
        const speed = +prompt('New speed?', gig.speed)
        if (!speed) return
        const gigToSave = { ...gig, speed }
        try {
            const savedGig = await updateGig(gigToSave)
            showSuccessMsg(`Gig updated, new speed: ${savedGig.speed}`)
        } catch (err) {
            showErrorMsg('Cannot update gig')
        }
    }

    return (
        <main className="gig-index">
            <header>
                <h2>Gigs</h2>
                {userService.getLoggedinUser() && <button onClick={onAddGig}>Add a Gig</button>}
            </header>
            <GigFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
            <GigList
                gigs={gigs}
                onRemoveGig={onRemoveGig}
                onUpdateGig={onUpdateGig} />
        </main>
    )
}
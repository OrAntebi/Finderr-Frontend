import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { loadGigs, addGig, updateGig, removeGig, setGigFilter } from '../store/gig/gig.actions'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { gigservice } from '../services/gig/'

import { BreadCrumbs } from '../cmps/BreadCrumbs'
import { GigList } from '../cmps/GigList'
import { GigFilter } from '../cmps/GigFilter'
import { Loader } from '../cmps/Loader'

export function GigIndex() {
    const [searchParams] = useSearchParams()
    const categoryFromParams = searchParams.get('category')

    const filterBy = useSelector(storeState => storeState.gigModule.filterBy)
    const gigs = useSelector(storeState => storeState.gigModule.gigs)

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (categoryFromParams) {
            setGigFilter({ ...filterBy, categories: [categoryFromParams] })
        } else {
            setGigFilter({ ...filterBy, categories: [] })
        }
    }, [categoryFromParams])

    useEffect(() => {
        setIsLoading(true)
        loadGigs(filterBy)
            .finally(() => setIsLoading(false))
    }, [filterBy])

    function onSetFilterBy(filterBy) {
        setGigFilter(filterBy)
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

    function getTitle() {
        return categoryFromParams
            ? gigservice.getCategoryTitleFromPath(categoryFromParams)
            : 'Categories'
    }

    return (
        <main className="gig-index">
            <BreadCrumbs />
            <h1>{getTitle()}</h1>
            <GigFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
            {isLoading ? (
                <Loader />
            ) : (
                <GigList
                    gigs={gigs}
                    onRemoveGig={onRemoveGig}
                    onUpdateGig={onUpdateGig}
                />
            )}
        </main>
    )
}

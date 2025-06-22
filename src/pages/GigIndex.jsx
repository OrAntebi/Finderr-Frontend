import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { loadGigs, updateGig, removeGig } from '../store/gig/gig.actions'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { gigService } from '../services/gig'
import { useGigFilterQuery } from '../customHooks/useGigFilterQuery'

import { BreadCrumbs } from '../cmps/BreadCrumbs'
import { GigList } from '../cmps/GigList'
import { GigFilter } from '../cmps/GigFilter'
import { Loader } from '../cmps/Loader'
import { NoGigsFound } from '../cmps/NoGigsFound'

export function GigIndex() {
    const { filter } = useGigFilterQuery()
    const gigs = useSelector(state => state.gigModule.gigs)

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true)
        loadGigs(filter)
            .finally(() => setIsLoading(false))
    }, [filter])

    async function onRemoveGig(gigId) {
        try {
            await removeGig(gigId)
            showSuccessMsg('Gig removed')
        } catch {
            showErrorMsg('Cannot remove gig')
        }
    }

    async function onUpdateGig(gig) {
        const speed = +prompt('New speed?', gig.speed)
        if (!speed) return
        try {
            const savedGig = await updateGig({ ...gig, speed })
            showSuccessMsg(`Gig updated, new speed: ${savedGig.speed}`)
        } catch {
            showErrorMsg('Cannot update gig')
        }
    }


    function getTitle() {
        return filter.category
            ? gigService.getCategoryTitleFromPath(filter.category)
            : 'Categories'
    }

    if (isLoading) return <Loader />

    return (
        <main className="gig-index">
            {gigs.length === 0 ? (
                <NoGigsFound />
            ) : (
                <>
                    <BreadCrumbs />
                    <h1>{getTitle()}</h1>
                    <GigFilter filter={filter} />
                    <GigList
                        gigs={gigs}
                        onRemoveGig={onRemoveGig}
                        onUpdateGig={onUpdateGig}
                    />
                </>
            )}
        </main>
    )
}

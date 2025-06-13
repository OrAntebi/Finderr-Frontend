import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useSearchParams } from 'react-router-dom'
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
    const currentPage = useLocation().pathname

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

    function getTotalGigsCount() {
        return gigs.length ? `${gigs.length.toLocaleString()}+ results` : ''
    }

    return (
        <main className={`gig-index ${currentPage === "/categories" ? 'categories-page-shown' : ''}`}>
            <BreadCrumbs />

            <h1>{getTitle()}</h1>

            <GigFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />

            <section>
                <span>{getTotalGigsCount()}</span>
            </section>

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

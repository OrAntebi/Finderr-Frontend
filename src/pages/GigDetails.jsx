import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useScreenSize } from '../customHooks/useScreenSize'


import { loadGig } from '../store/gig/gig.actions'
import { OwnerDetails } from '../cmps/OwnerDetails'
import { PricingPackages } from '../cmps/PricingPackages'
import { BreadCrumbs } from '../cmps/BreadCrumbs'
import { Loader } from '../cmps/Loader'

export function GigDetails() {
    const { gigId } = useParams()
    const gig = useSelector(storeState => storeState.gigModule.gig)
    const [isLoading, setIsLoading] = useState(true)
    const screenWidth = useScreenSize()

    useEffect(() => {
        setIsLoading(true)
        loadGig(gigId)
            .finally(() => setIsLoading(false))
    }, [gigId])

    const { owner } = gig || {}
    if (isLoading || !gig) return <Loader />

    const renderMainContent = () => (
        <>
            <BreadCrumbs />
            <h1 className="gig-title">{gig.title}</h1>
            <OwnerDetails owner={owner} isLarge={false} />
            <img className="gig-image" src={gig.imgUrls[0]} alt="gig image" />
            {screenWidth < 964 && <PricingPackages gig={gig} screenWidth={screenWidth} />}
            <h2>About this gig</h2>
            <p>{gig.description}</p>
            <h2>Get to know {owner.fullname}</h2>
            <OwnerDetails owner={owner} isLarge={true} />
        </>
    )

    return (
        <section className={`gig-details${screenWidth < 964 ? ' full main-container' : ''}`}>
            {screenWidth >= 964 ? (
                <div className="gig-content">
                    {renderMainContent()}
                </div>
            ) : (
                renderMainContent()
            )}
            {screenWidth >= 964 && <PricingPackages gig={gig} />}
        </section>
    )
}

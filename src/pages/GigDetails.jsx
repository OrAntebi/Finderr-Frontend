import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useScreenSize } from '../customHooks/useScreenSize'
import { loadGig } from '../store/gig/gig.actions'
import { OwnerDetails } from '../cmps/OwnerDetails'
import { PricingPackages } from '../cmps/PricingPackages'
import { BreadCrumbs } from '../cmps/BreadCrumbs'
import { Loader } from '../cmps/Loader'
import { GigSlider } from '../cmps/GigSlider'

import hamburgerSvg from '../assets/img/hamburger-icon.svg'
import heartSvg from '../assets/img/heart-full-icon.svg'
import shareSvg from '../assets/img/share-icon.svg'
import dotsSvg from '../assets/img/three-btns-icon.svg'

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
            <GigSlider gig={gig} showThumbnails={true} />
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
            {screenWidth >= 964 && (
                <>
                    <div className="like-and-share flex align-center">
                        <div className="collect-wrapper flex align-center justify-center">
                            <div className="like-wrapper flex align-center justify-center">
                                <button><span><img src={hamburgerSvg} alt="hamburger-icon" /></span></button>
                                <button><span><img src={heartSvg} alt="heart-icon" /></span></button>
                            </div>
                            <span className="collect-count">38</span>
                        </div>
                        <button className="share-dots"><img src={shareSvg} alt="share-icon" /></button>
                        <button className="share-dots"><img src={dotsSvg} alt="dots-icon" /></button>
                    </div>
                    <PricingPackages gig={gig} />
                </>
            )}
        </section>
    )
}

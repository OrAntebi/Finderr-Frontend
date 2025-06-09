import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'import { useParams } from 'react-router-dom'
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
    // const starSvg =
    //     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#222325" viewBox="0 0 16 16">
    //         <path fillRule="evenodd" d="M16 6.2c0 .182-.125.353-.25.484l-3.49 3.57.826 5.04c.01.07.01.131.01.202 0 .262-.115.504-.394.504a.76.76 0 0 1-.385-.121L8 13.499l-4.317 2.38a.8.8 0 0 1-.385.121c-.279 0-.404-.242-.404-.504 0-.07.01-.131.02-.202l.826-5.04-3.5-3.57C.125 6.554 0 6.382 0 6.2c0-.302.298-.423.538-.463L5.365 5 7.53.413C7.615.222 7.779 0 8 0s.385.222.471.413l2.164 4.588 4.826.736c.231.04.539.16.539.463" clipRule="evenodd" />
    //     </svg>

    if (isLoading || !gig) return <Loader />
    return (
        <section className="gig-details">
            <div className="main-content">
                <BreadCrumbs />
                <h1 className="gig-title">{gig.title}</h1>
                <OwnerDetails owner={owner} isLarge={false} />

                <img className="gig-image" src={gig.imgUrls[0]} alt="gig image" />
                {screenWidth < 900 && <PricingPackages gig={gig} />}

                <h2>About this gig</h2>
                <p>{gig.description}</p>

                <h2>Get to know {owner.fullname} </h2>
                <OwnerDetails owner={owner} isLarge={true} />
            </div>
            {screenWidth >= 900 && <PricingPackages gig={gig} />}
            {/* <button onClick={() => { onAddGigMsg(gig._id) }}>Add gig msg</button> */}
        </section>
    )
}
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import { useScreenSize } from '../customHooks/useScreenSize'
import { loadGig } from '../store/gig/gig.actions'
import { OwnerDetails } from '../cmps/OwnerDetails'
import { PricingPackages } from '../cmps/PricingPackages'
import { BreadCrumbs } from '../cmps/BreadCrumbs'
import { Loader } from '../cmps/Loader'
import { GigSlider } from '../cmps/GigSlider'
import { icons } from '../assets/icons/icons'


export function GigDetails() {
    const { gigId } = useParams()
    const gig = useSelector(storeState => storeState.gigModule.gig)
    const [isLoading, setIsLoading] = useState(true)
    const screenWidth = useScreenSize()
    const [isModalOpen, setIsModalOpen] = useState(false)

    function handleContinueClick(ev) {
        ev.stopPropagation()
        setIsModalOpen(true)
    }

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
            {<GigSlider gig={gig} showThumbnails={screenWidth >= 664} />}
            {screenWidth < 964 && gig?.packages && <PricingPackages gig={gig} screenWidth={screenWidth} icons={icons} onContinueClick={handleContinueClick} />}
            <h2>About this gig</h2>
            <p className="gig-description">{gig.description}</p>
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
            {screenWidth >= 964 && gig?.packages && (
                <PricingPackages gig={gig} screenWidth={screenWidth} icons={icons} onContinueClick={handleContinueClick} />
            )}
            {isModalOpen &&
                <dialog className="modal-payment flex column">
                    <div className="modal-title flex align-center justify-between">
                        <span>Order options</span>
                        <button className="close-modal-btn" onClick={() => setIsModalOpen(false)}>
                            <img src={icons.close} alt="close-icon" />
                        </button>
                    </div>
                    <div className="modal-details-container">
                        <div className="modal-description flex column">
                            <li>
                                <div className="package-and-price flex justify-between">
                                    <p className="current-package">Standard</p>
                                    <p className="amount">23$</p>
                                </div>
                                <div className="gig-description-text">
                                    <span>Standard </span>
                                    <span>{gig.title}</span>
                                </div>
                            </li>
                        </div>
                        <div className="modal-price">
                            <div className="price-container flex column">
                                <span>23$</span>
                                <span>Single order</span>
                            </div>
                            <ul className="modal-delivery-info flex column">
                                <div className="delivery-time flex align-center">
                                    <span><img src={icons.clock} alt="" /></span>
                                    <span>2-day delivery</span>
                                </div>
                                <div className="revisions flex align-center">
                                    <span><img src={icons.round} alt="" /></span>
                                    <span>1 Revision</span>
                                </div>
                            </ul>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="continue-btn flex align-center justify-center">
                            <span>Continue</span>
                            <span>(23$)</span>
                        </button>
                        <div className="flex align-center justify-center">
                            <span>You won't be charged yet</span>
                        </div>
                    </div>
                </dialog>
            }
        </section>
    )
}

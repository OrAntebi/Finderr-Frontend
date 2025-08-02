import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { useScreenSize } from '../customHooks/useScreenSize'

import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { loadGig } from '../store/gig/gig.actions'
import { loadReviews } from '../store/review/review.actions'

import { OwnerDetails } from '../cmps/OwnerDetails'
import { PricingPackages } from '../cmps/PricingPackages'
import { BreadCrumbs } from '../cmps/BreadCrumbs'
import { Loader } from '../cmps/Loader'
import { GigSlider } from '../cmps/GigSlider'
import { PaymentModal } from '../cmps/PaymentModal'
import { icons } from '../assets/icons/icons'
import { ReviewIndex } from '../pages/ReviewIndex'
import { OPEN_LOGIN_MODAL } from '../store/system.reducer'

export function GigDetails() {
    const { gigId } = useParams()
    const navigate = useNavigate()
    const gig = useSelector(storeState => storeState.gigModule.gig)
    const loggedUser = useSelector(storeState => storeState.userModule.user)
    const screenWidth = useScreenSize()
    const reviews = useSelector(storeState => storeState.reviewModule.reviews)
    const reviewsRef = useRef()
    const dispatch = useDispatch()

    const [selectedPackage, setSelectedPackage] = useState('standard')
    const [isLoading, setIsLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        loadGig(gigId)
            .catch(() => showErrorMsg('Failed to load gig data'))
            .finally(() => setIsLoading(false))
    }, [gigId])

    useEffect(() => {
        loadReviews({ gigId })
            .catch(() => {
                showErrorMsg('Cannot load reviews')
                console.error('Failed to load reviews')
            })
    }, [])

    useEffect(() => {
        if (!gig?.packages) return
        const availablePackages = Object.keys(gig.packages)
        const fallback = availablePackages.includes('standard') ? 'standard' : availablePackages[0]
        setSelectedPackage(fallback)
    }, [gig])

    if (isLoading || !gig) return <Loader />

    const { owner } = gig

    const selectedPack = {
        ...gig.packages?.[selectedPackage],
        packageName: selectedPackage,
        packageNameCapitalized: selectedPackage.charAt(0).toUpperCase() + selectedPackage.slice(1)
    }

    const getRevisionText = () => {
        switch (selectedPack.packageName) {
            case 'premium': return 'Unlimited Revisions'
            case 'standard': return '3 Revisions'
            case 'basic': return '1 Revision'
            default: return '1 Revision'
        }
    }

    async function onProceedToPayment() {
        if (!loggedUser || !loggedUser._id) {
            setIsModalOpen(false)
            dispatch({ type: OPEN_LOGIN_MODAL })
            return
        }

        if (loggedUser._id === owner._id) {
            showErrorMsg(`Oops! You can't buy your own service`)
            setIsModalOpen(false)
            return
        }

        navigate(`/checkout/${gigId}/${selectedPackage}`)
    }

    function onRemoveReview() {
        return null
    }

    function scrollToReviews() {
        if (reviewsRef.current) {
            reviewsRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }

    const renderMainContent = () => (
        <>
            <BreadCrumbs />
            <h1 className="gig-title">{gig.title}</h1>
            <OwnerDetails owner={owner} isLarge={false} scrollToReviews={scrollToReviews} />
            <GigSlider gig={gig} showThumbnails={screenWidth >= 664} />

            {screenWidth < 964 && (
                <PricingPackages
                    gig={gig}
                    screenWidth={screenWidth}
                    icons={icons}
                    selectedPack={selectedPack}
                    onSelectPackage={setSelectedPackage}
                    getRevisionText={getRevisionText}
                    onContinueClick={() => setIsModalOpen(true)}
                />
            )}

            <h2>About this gig</h2>
            <div className="gig-description" dangerouslySetInnerHTML={{ __html: normalizeDescription(gig.description) }} />


            <h2>Get to know {owner.fullname}</h2>
            <OwnerDetails owner={owner} isLarge={true} scrollToReviews={scrollToReviews} />

            <h2 ref={reviewsRef} className="reviews-title">Reviews</h2>
            <ReviewIndex gigId={gigId} />
        </>
    )

    return (
        <section className={`gig-details${screenWidth < 964 ? ' full main-container' : ''} ${isModalOpen ? 'modal-open' : ''}`}>
            {isModalOpen && <div className="modal-overlay" onClick={() => setIsModalOpen(false)}></div>}

            {screenWidth >= 964
                ? <div className="gig-content">{renderMainContent()}</div>
                : renderMainContent()
            }

            {screenWidth >= 964 && gig?.packages && (
                <PricingPackages
                    gig={gig}
                    screenWidth={screenWidth}
                    icons={icons}
                    selectedPack={selectedPack}
                    onSelectPackage={setSelectedPackage}
                    getRevisionText={getRevisionText}
                    onContinueClick={() => setIsModalOpen(true)}
                />
            )}

            <PaymentModal
                isModalOpen={isModalOpen}
                onCloseModal={() => setIsModalOpen(false)}
                selectedPack={selectedPack}
                gig={gig}
                onProceedToPayment={onProceedToPayment}
                getRevisionText={getRevisionText}
            />
        </section>
    )
}

function normalizeDescription(description = '') {
    const isWrappedWithP = description.trim().startsWith('<p') && description.trim().endsWith('</p>')
    return isWrappedWithP ? description : `<p>${description}</p>`
}


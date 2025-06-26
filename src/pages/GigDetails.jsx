import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { useScreenSize } from '../customHooks/useScreenSize'

import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { loadGig } from '../store/gig/gig.actions'

import { OwnerDetails } from '../cmps/OwnerDetails'
import { PricingPackages } from '../cmps/PricingPackages'
import { BreadCrumbs } from '../cmps/BreadCrumbs'
import { Loader } from '../cmps/Loader'
import { GigSlider } from '../cmps/GigSlider'
import { PaymentModal } from '../cmps/PaymentModal'
import { icons } from '../assets/icons/icons'

export function GigDetails() {
    const { gigId } = useParams()
    const navigate = useNavigate()
    const gig = useSelector(storeState => storeState.gigModule.gig)
    const loggedUser = useSelector(storeState => storeState.userModule.user)
    const [selectedPackage, setSelectedPackage] = useState('standard')
    const [isLoading, setIsLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const screenWidth = useScreenSize()

    useEffect(() => {
        setIsLoading(true)
        loadGig(gigId).finally(() => setIsLoading(false))
    }, [gigId])


    if (isLoading || !gig) return <Loader />

    const { owner } = gig
    
    const selectedPack = {
        ...gig.packages[selectedPackage],
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
            showErrorMsg('You must be logged in to purchase services.')
            navigate('/login')
            return
        }

        if (loggedUser._id === owner._id) {
            showErrorMsg(`Oops! You can't buy your own service`)
            setIsModalOpen(false)
            return
        }
        
        navigate(`/checkout/${gigId}/${selectedPackage}`)
    }

    const renderMainContent = () => (
        <>
            <BreadCrumbs />
            <h1 className="gig-title">{gig.title}</h1>
            <OwnerDetails owner={owner} isLarge={false} />
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
            <p className="gig-description">{gig.description}</p>
            <h2>Get to know {owner.fullname}</h2>
            <OwnerDetails owner={owner} isLarge={true} />
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

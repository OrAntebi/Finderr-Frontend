import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import { useScreenSize } from '../customHooks/useScreenSize'

import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { orderService } from '../services/order/order.service.local'

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
    const gig = useSelector(storeState => storeState.gigModule.gig)
    const user = useSelector(storeState => storeState.userModule.user)
    const [selectedPackage, setSelectedPackage] = useState('standard')
    const [isLoading, setIsLoading] = useState(true)
    const screenWidth = useScreenSize()
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isModalOpen])

    useEffect(() => {
        setIsLoading(true)
        loadGig(gigId)
            .finally(() => setIsLoading(false))
    }, [gigId])

    const { owner } = gig || {}
    if (isLoading || !gig) return <Loader />

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

    function handleContinueClick(ev) {
        ev.stopPropagation()
        setIsModalOpen(true)
    }

    async function onPurchaseOrder() {
        if (!user || !user._id) {
            setIsModalOpen(false)
            showErrorMsg('You must be logged in to place an order.')
            return
        } 

        try {
            const orderToSave = {
                buyer: {
                    _id: user._id,
                    fullname: user.fullname
                },
                seller: {
                    _id: gig.owner._id,
                    fullname: gig.owner.fullname
                },
                gig: {
                    _id: gig._id,
                    title: gig.title
                },
                price: selectedPack.packPrice,
                packageName: selectedPack.packageName,
                status: "pending",
                createdAt: Date.now(),
            }

            await orderService.save(orderToSave)

            setIsModalOpen(false)
            showSuccessMsg('Your order was placed successfully!')
        } catch (err) {
            console.error('Failed to place order', err)
            showErrorMsg('Something went wrong while placing your order.')
        }
    }

    const renderMainContent = () => (
        <>
            <BreadCrumbs />
            <h1 className="gig-title">{gig.title}</h1>
            <OwnerDetails owner={owner} isLarge={false} />
            {<GigSlider gig={gig} showThumbnails={screenWidth >= 664} />}
            {screenWidth < 964 && gig?.packages && <PricingPackages
                gig={gig}
                screenWidth={screenWidth}
                icons={icons}
                selectedPack={selectedPack}
                onSelectPackage={setSelectedPackage}
                getRevisionText={getRevisionText}
                onContinueClick={handleContinueClick}
            />}
            <h2>About this gig</h2>
            <p className="gig-description">{gig.description}</p>
            <h2>Get to know {owner.fullname}</h2>
            <OwnerDetails owner={owner} isLarge={true} />
        </>
    )

    return (
        <section className={`gig-details${screenWidth < 964 ? ' full main-container' : ''} ${isModalOpen ? 'modal-open' : ''}`}>
            {isModalOpen && <div className="modal-overlay" onClick={() => setIsModalOpen(false)}></div>}

            {screenWidth >= 964 ? (
                <div className="gig-content">
                    {renderMainContent()}
                </div>
            ) : (
                renderMainContent()
            )}
            {screenWidth >= 964 && gig?.packages && (
                <PricingPackages
                    gig={gig}
                    screenWidth={screenWidth}
                    icons={icons}
                    selectedPack={selectedPack}
                    onSelectPackage={setSelectedPackage}
                    getRevisionText={getRevisionText}
                    onContinueClick={handleContinueClick}
                />)
            }
            <PaymentModal
                isModalOpen={isModalOpen}
                onCloseModal={() => setIsModalOpen(false)}
                selectedPack={selectedPack}
                gig={gig}
                onPurchaseOrder={onPurchaseOrder}
                getRevisionText={getRevisionText}
            />
        </section>
    )
}
import { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { getRandomDemoUser } from "../services/util.service"
import { loadWatchedUser } from '../store/user/user.actions'
import { loadOrders, updateOrder } from '../store/order/order.actions'
import { loadGigs, removeGig } from '../store/gig/gig.actions'
import { loadReviews } from '../store/review/review.actions'
import { updateUser } from '../store/user/user.actions'

import { uploadService } from '../services/upload.service'
import { GigList } from '../cmps/GigList'
import { UserDetails } from '../cmps/UserDetails'
import { UserGigList } from '../cmps/UserGigList'
import { Loader } from '../cmps/Loader'
import { OrderModal } from '../cmps/OrderModal'
import { UserOrderList } from '../cmps/UserOrderList'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { ReviewIndex } from './ReviewIndex'

export function UserIndex() {
    const { id: userIdFromParams } = useParams()
    const userInfo = useRef(getRandomDemoUser()).current

    const [isLoading, setIsLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedOrder, setSelectedOrder] = useState(null)

    const [statusDropdownOpen, setStatusDropdownOpen] = useState(null)

    const userGigs = useSelector(store => store.gigModule.gigs)
    const loggedInUser = useSelector(store => store.userModule.user)
    const watchedUser = useSelector(store => store.userModule.watchedUser)
    const orders = useSelector(store => store.orderModule.orders)
    const isOwnProfile = loggedInUser?._id === userIdFromParams
    const dropdownRefs = useRef({})

    useEffect(() => {
        setIsLoading(true)
        Promise.all([
            loadWatchedUser(userIdFromParams),
            loadGigs({ userId: userIdFromParams }),
            loadOrders(),
            loadReviews({ userId: userIdFromParams })
        ])
            .catch(() => {
                showErrorMsg('Failed to load user data')
            })
            .finally(() => {
                setIsLoading(false)
            })

    }, [userIdFromParams, loggedInUser?.imgUrl])

    useEffect(() => {
        function handleClickOutside(ev) {
            const openRef = dropdownRefs.current[statusDropdownOpen]
            if (openRef && !openRef.contains(ev.target)) {
                setStatusDropdownOpen(null)
            }
        }

        if (statusDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [statusDropdownOpen])


    function getFullUserProfile() {
        const baseUser = isOwnProfile ? loggedInUser : watchedUser
        return { ...baseUser, ...userInfo }
    }

    function handleOrderClicked(order, ev) {
        ev.stopPropagation()
        setSelectedOrder(order)
        setIsModalOpen(true)
    }

    function handleCloseModal() {
        setIsModalOpen(false)
        setSelectedOrder(null)
    }

    function onRemoveGig(ev, gigId) {
        ev.stopPropagation()

        removeGig(gigId)
            .then(() => {
                showSuccessMsg(`Gig removed successfully!`)
            })
            .catch(err => {
                console.log('Problems removing gig:', err)
                showErrorMsg(`Having problems removing gig!`)
            })
    }

    function toggleStatusDropdown(ev, orderId) {
        ev.stopPropagation()
        setStatusDropdownOpen(prev => prev === orderId ? null : orderId)
    }

    function updateOrderStatus(ev, order, newStatus) {
        ev.stopPropagation()
        const updatedOrder = { ...order, status: newStatus }

        updateOrder(updatedOrder)
            .then(() => showSuccessMsg(`Order status updated successfully!`))
            .catch(err => {
                console.log('Problems updating order status:', err)
                showErrorMsg(`Having problems updating order status!`)
            })
            .finally(() => {
                setStatusDropdownOpen(null)
            })
    }

    async function onChangeImg(ev) {
        try {
            const { secure_url: imgUrl } = await uploadService.uploadImg(ev)
            if (!imgUrl) return
            console.log(loggedInUser)
            await updateUser({ ...loggedInUser, imgUrl })
        } catch (err) {
            console.error('Failed to upload image:', err)
        }
    }

    if (isLoading || !watchedUser) return <Loader />

    const userToShow = getFullUserProfile()
    const ordersSold = orders.filter(order => order?.seller?._id === userIdFromParams)
        .sort((a, b) => b.createdAt - a.createdAt)

        console.log('orders', orders)
    return (
        <main className="user-index user-profile-grid">
            <UserDetails user={userToShow} isOwnProfile={isOwnProfile} onChangeImg={onChangeImg} />

            <section className="user-dashboard flex column">
                {!isOwnProfile ?
                    <>
                        <GigList gigs={userGigs} />
                        <h2 className="reviews-title">Reviews</h2>
                        <ReviewIndex userId={userIdFromParams} isProfile={true} />
                    </>
                    :
                    <>
                        <h2>Manage Orders</h2>
                        {ordersSold.length === 0 ? (
                            <h3 className="empty-msg">You have no orders yet.</h3>
                        ) : (
                            <section className={`user-orders card ${isModalOpen ? 'modal-open' : ''}`}>
                                <>
                                    <UserOrderList
                                        orders={ordersSold}
                                        handleOrderClicked={handleOrderClicked}
                                        statusDropdownOpen={statusDropdownOpen}
                                        toggleStatusDropdown={toggleStatusDropdown}
                                        updateOrderStatus={updateOrderStatus}
                                        dropdownRefs={dropdownRefs}
                                    />
                                    <OrderModal
                                        order={selectedOrder}
                                        userSeller={true}
                                        closeModal={handleCloseModal}
                                    />
                                    {isModalOpen && <div className="modal-overlay" onClick={handleCloseModal}></div>}
                                </>
                            </section>
                        )}

                        <h2>All Gigs</h2>
                        {userGigs.length === 0 ? (
                            <h3 className="empty-msg">You have no gigs yet.</h3>
                        ) : (
                            <section className="user-gigs card">

                                <UserGigList
                                    gigs={userGigs}
                                    onRemoveGig={onRemoveGig}
                                />
                            </section>
                        )}
                    </>
                }
            </section>
        </main>
    )
}
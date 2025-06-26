import { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { gigService } from '../services/gig'
import { getRandomDemoUser } from "../services/util.service"
import { loadWatchedUser } from '../store/user/user.actions'
import { loadOrders } from '../store/order/order.actions'
import { loadGigs } from '../store/gig/gig.actions'
import { removeGig } from '../store/gig/gig.actions'

import { GigList } from '../cmps/GigList'
import { UserDetails } from '../cmps/UserDetails'
import { UserGigList } from '../cmps/UserGigList'
import { Loader } from '../cmps/Loader'
import { OrderModal } from '../cmps/OrderModal'
import { UserOrderList } from '../cmps/UserOrderList'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'

export function UserIndex() {
    const { id: userIdFromParams } = useParams()
    const userInfo = useRef(getRandomDemoUser()).current

    const [isLoading, setIsLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedOrder, setSelectedOrder] = useState(null)

    const userGigs = useSelector(store => store.gigModule.gigs)
    const loggedInUser = useSelector(store => store.userModule.user)
    const watchedUser = useSelector(store => store.userModule.watchedUser)
    const orders = useSelector(store => store.orderModule.orders)

    const navigate = useNavigate()

    useEffect(() => {
        async function loadData() {
            setIsLoading(true)

            try {
                await Promise.all([
                    loadWatchedUser(userIdFromParams),
                    loadOrders(),
                    loadGigs({ userId: userIdFromParams })
                ])
            } catch (err) {
                navigate('/')
                showErrorMsg('Failed to load user data')
            } finally {
                setIsLoading(false)
            }
        }

        loadData()
    }, [userIdFromParams])

    function handleOrderClicked(order, ev) {
        ev.stopPropagation()
        setSelectedOrder(order)
        setIsModalOpen(true)
    }

    function handleCloseModal() {
        setIsModalOpen(false)
        setSelectedOrder(null)
    }

    async function onRemoveGig(ev, gigId) {
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


    if (isLoading || !watchedUser) return <Loader />

    const detailedUser = {
        ...watchedUser,
        ...userInfo
    }
    const isOwnProfile = loggedInUser?._id === userIdFromParams
    const ordersSold = orders.filter(order => order?.seller?._id === userIdFromParams)

    return (
        <main className="user-index user-profile-grid">
            <UserDetails user={detailedUser} />

            <section className="user-dashboard flex column">
                {!isOwnProfile ?
                    <GigList gigs={userGigs} />
                    :
                    <>
                        <h2>Manage Orders</h2>
                        {ordersSold.length === 0 ? (
                            <h3 className="empty-msg">You have no orders yet.</h3>
                        ) : (
                            <section className={`user-orders card ${isModalOpen ? 'modal-open' : ''}`}>
                                <>
                                    <UserOrderList orders={ordersSold} handleOrderClicked={handleOrderClicked} />
                                    <OrderModal order={selectedOrder} userSeller={true} closeModal={handleCloseModal} />
                                    {isModalOpen && <div className="modal-overlay" onClick={handleCloseModal}></div>}
                                </>
                            </section>
                        )}

                        <h2>All Gigs</h2>
                        {userGigs.length === 0 ? (
                            <h3 className="empty-msg">You have no gigs yet.</h3>
                        ) : (
                            <section className="user-gigs card">

                                <UserGigList gigs={userGigs} onRemoveGig={onRemoveGig} />
                            </section>
                        )}
                    </>
                }
            </section>
        </main>
    )
}
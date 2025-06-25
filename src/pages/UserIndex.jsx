import { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { getRandomDemoUser } from "../services/util.service"
import { loadWatchedUser } from '../store/user/user.actions'
import { loadOrders } from '../store/order/order.actions'
import { loadGigs } from '../store/gig/gig.actions'

import { OrderList } from '../cmps/OrderList'
import { GigList } from '../cmps/GigList'
import { UserDetails } from '../cmps/UserDetails'
import { UserGigList } from '../cmps/UserGigList'
import { Loader } from '../cmps/Loader'

export function UserIndex() {
    const { id: userIdFromParams } = useParams()
    const userInfo = useRef(getRandomDemoUser()).current

    const [isLoading, setIsLoading] = useState(true)

    const userGigs = useSelector(store => store.gigModule.gigs)
    const loggedInUser = useSelector(store => store.userModule.user)
    const watchedUser = useSelector(store => store.userModule.watchedUser)
    const orders = useSelector(store => store.orderModule.orders)

    useEffect(() => {
        setIsLoading(true)
        loadWatchedUser(userIdFromParams)
        loadOrders()
        loadGigs({ userId: userIdFromParams })
            .finally(() => setIsLoading(false))
    }, [userIdFromParams])

    if (isLoading) return <Loader />

    const detailedUser = {
        ...watchedUser,
        ...userInfo
    }
    const ordersSold = orders.filter(order => order.seller._id === userIdFromParams)
    const isOwnProfile = loggedInUser?._id === userIdFromParams

    return (
        <main className="user-index flex">
            <UserDetails user={detailedUser} />
            {/* <UserGigList /> */}

            <section className="user-details">
                {
                    !isOwnProfile ?
                        <GigList gigs={userGigs} />
                        :
                        <>
                            <h2>Manage Orders</h2>
                            <OrderList orders={ordersSold} />

                            <h2>All Gigs</h2>
                            <UserGigList gigs={userGigs} />
                        </>
                }

            </section>
        </main>
    )
}
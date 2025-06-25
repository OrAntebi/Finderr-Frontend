import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { loadWatchedUser } from '../store/user/user.actions'
import { loadOrders } from '../store/order/order.actions'
import { loadGigs } from '../store/gig/gig.actions'

import { OrderList } from '../cmps/OrderList'
import { UserDetails } from '../cmps/UserDetails'
import { UserGigList } from '../cmps/UserGigsList'


export function UserIndex() {
    const { id: userIdFromParams } = useParams()

    const userGigs = useSelector(store => store.gigModule.gigs)
    console.log(userIdFromParams);

    const loggedInUser = useSelector(store => store.userModule.user)
    const orders = useSelector(store => store.orderModule.orders)

    useEffect(() => {
        loadOrders()
        loadGigs({ userId: userIdFromParams })
    }, [userIdFromParams])

    const ordersSold = orders.filter(order => order.seller._id === userIdFromParams)
    const isOwnProfile = loggedInUser?._id === userIdFromParams

    // function onUserUpdate(user) {
    //     showSuccessMsg(`This user ${user.fullname} just got updated from socket, new score: ${user.score}`)
    //     store.dispatch({ type: 'SET_WATCHED_USER', user })
    // }

    return (
        <main className="user-index flex">
            <UserDetails />
            {/* <UserGigList /> */}
            <section className="user-details">
                {
                    !isOwnProfile ?
                        {/* <GigList gigs={userGigs} /> */ }
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
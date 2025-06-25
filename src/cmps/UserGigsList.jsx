import { useSelector } from "react-redux";
import { Loader } from "./Loader";
import { useEffect, useState } from "react";
import { loadOrders } from "../store/order/order.actions";

export function UserGigList() {
    const orders = useSelector(state => state.orderModule.orders)
    const loggedUser = useSelector(storeState => storeState.userModule.user)

    const sortedUserGigs = orders
        .filter(order => order.seller._id === loggedUser._id)
        .sort((a, b) => b.createdAt - a.createdAt)

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true)
        loadOrders()
            .finally(() => setIsLoading(false))
    }, [])

    if (isLoading) return <Loader />
    console.log('sortedUserGigs', sortedUserGigs)
    return (
        <section className="user-gigs-list">
            <h2>Your Gigs</h2>
            <ul>
                {sortedUserGigs.map((gig) => (
                    <li key={gig._id}>
                        <h3>{gig.title}</h3>
                        <p>{gig.description}</p>
                        <p>Price: ${gig.price}</p>
                    </li>
                ))}
            </ul>
        </section>
    )
}
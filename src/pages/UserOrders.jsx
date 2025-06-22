import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { loadOrders } from '../store/order/order.actions'

import { Loader } from '../cmps/Loader'

export function UserOrders() {
    const orders = useSelector(state => state.orderModule.orders)
    // const loggedUser = useSelector(storeState => storeState.userModule.user)

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true)
        loadOrders()
            .finally(() => setIsLoading(false))
    }, [])

    if (isLoading) return <Loader />

    return (
        <section className="orders-page">
            {orders.map(order => (
                <div key={order._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '15px' }}>
                    <h3>{order.gig.title}</h3>
                    <p><strong>Status:</strong> {order.status}</p>
                    <p><strong>Package:</strong> {order.packageName}</p>
                    <p><strong>Price:</strong> ${order.packPrice}</p>
                    <p><strong>Buyer:</strong> {order.buyer.fullname}</p>
                    <p><strong>Seller:</strong> {order.seller.fullname}</p>
                    <p><strong>Days to make:</strong> {order.daysToMake}</p>
                    <p><strong>Created:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
            ))}
        </section>
    )
}
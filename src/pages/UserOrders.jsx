import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { loadOrders } from '../store/order/order.actions'

import { Loader } from '../cmps/Loader'
import { OrderList } from '../cmps/OrderList'

import orderSvg from "../assets/img/order-icon.svg"

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
    console.log(orders)

    return (
        <section className="user-orders">
            <div className="title flex align-center">
                <img src={orderSvg} alt="order-icon" />
                <h1>User Orders</h1>
            </div>

            <OrderList orders={orders} />
        </section>
    )
}
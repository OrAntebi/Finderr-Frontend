import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { loadOrders } from '../store/order/order.actions'

import { OrderList } from '../cmps/OrderList'
import { Loader } from '../cmps/Loader'

export function OrderIndex() {
    const orders = useSelector(state => state.orderModule.orders)
    const loggedUser = useSelector(storeState => storeState.userModule.user)

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true)
        loadOrders()
            .finally(() => setIsLoading(false))
    }, [])

    if (isLoading) return <Loader />

    return (
        <section className="orders-page">
            {<OrderList orders={orders} loggedUser={loggedUser} />}
        </section>
    )
}

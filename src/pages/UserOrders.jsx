import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { loadOrders } from '../store/order/order.actions'

import { Loader } from '../cmps/Loader'
import { OrderList } from '../cmps/OrderList'
import { OrderModal } from "../cmps/OrderModal"

import orderSvg from "../assets/img/order-icon.svg"

export function UserOrders() {
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedOrder, setSelectedOrder] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const orders = useSelector(state => state.orderModule.orders)
    const loggedUser = useSelector(storeState => storeState.userModule.user)

    useEffect(() => {
        if (!loggedUser) {
            navigate('/')
            return
        }

        setIsLoading(true)
        loadOrders({ userId: loggedUser._id, role: 'buyer' })
            .finally(() => setIsLoading(false))
    }, [loggedUser, navigate])

    if (!loggedUser) return null

    if (isLoading) return <Loader />

    const sortedUserOrders = orders.sort((a, b) => b.createdAt - a.createdAt)

    function handleOrderClicked(order, ev) {
        ev.stopPropagation()
        setSelectedOrder(order)
        setIsModalOpen(true)
    }

    function handleCloseModal() {
        setIsModalOpen(false)
        setSelectedOrder(null)
    }

    return (
        <section className={`user-orders ${isModalOpen ? 'modal-open' : ''}`}>
            {isModalOpen && (
                <div className="modal-overlay" onClick={handleCloseModal}></div>
            )}

            <div className="title flex align-center">
                <img src={orderSvg} alt="order-icon" />
                <h1>my orders</h1>
            </div>

            {sortedUserOrders.length === 0 ? (
                <h3 className="empty-msg">You have no orders yet.</h3>
            ) : (
                <>
                    <OrderList
                        orders={sortedUserOrders}
                        onOrderClicked={handleOrderClicked}
                    />
                    <OrderModal
                        order={selectedOrder}
                        userSeller={false}
                        closeModal={handleCloseModal}
                    />
                </>
            )}
        </section>
    )
}

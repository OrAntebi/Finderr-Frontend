import { OrderPreview } from './OrderPreview'

export function OrderList({ orders }) {
    return <section className="order-list-container">
        <ul className="order-list">
            {orders.map(order =>
                <li key={order._id} className="order-item">
                    <OrderPreview order={order} />
                </li>)
            }
        </ul>
    </section>
}
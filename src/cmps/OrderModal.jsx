import { useNavigate } from "react-router"
import { calculateDueDate } from '../services/util.service'

export function OrderModal({ order, userSeller, closeModal }) {
    const navigate = useNavigate()

    if (!order) return null

    const { buyer, seller, packageName, totalPrice, daysToMake, status, createdAt, _id } = order
    const dueDate = calculateDueDate(createdAt, daysToMake)

    function navigateToBuyer() {
        navigate(`/user/${buyer._id}`)
        closeModal()
    }

    function navigateToSeller() {
        navigate(`/user/${seller._id}`)
        closeModal()
    }

    return (
        <div className="order-modal">
            <div className="header flex">
                <h3>Order Details</h3>
                <button className="close-btn" onClick={closeModal}>✕</button>
            </div>

            <main className="content">
                <div className="mini-user flex align-center justify-center">
                    {userSeller ? (
                        <>
                            <img src={buyer.imgUrl} alt="Buyer" onClick={navigateToBuyer} />
                            <h4 onClick={navigateToBuyer} className="underline">
                                {buyer.username}
                            </h4>
                            <p>
                                ordered the <span className="bold">{packageName}</span> package from you for{" "}
                                <span className="bold">${totalPrice}</span>
                            </p>
                        </>
                    ) : (
                        <>
                            <img src={seller.imgUrl} alt="Seller" onClick={navigateToSeller} />
                            <p className="msg">
                                You ordered the <span className="bold">{packageName}</span> package from{" "}
                                <span className="underline bold" onClick={navigateToSeller}>
                                    {seller.fullname}
                                </span>{" "}
                                for <span className="bold">${totalPrice}</span>
                            </p>
                        </>
                    )}
                </div>

                <div className="contact-buyer flex">
                    {userSeller ? (
                        <button onClick={navigateToBuyer}>Contact {buyer.username}</button>
                    ) : (
                        <button onClick={navigateToSeller}>Contact {seller.fullname}</button>
                    )}
                </div>

                <div className="order-info with-border-top">
                    <h4 className="top">Order Information</h4>
                    <ul>
                        <li>
                            <span>Due on</span>
                            <span>{dueDate}</span>
                        </li>
                        <li>
                            <span>Delivery Time</span>
                            <span>{daysToMake} days</span>
                        </li>
                        <li>
                            <span>Status</span>
                            <span>{status}</span>
                        </li>
                        <li>
                            <span>Order ID</span>
                            <span>#{_id}</span>
                        </li>
                    </ul>
                </div>
            </main>
        </div>
    )
}
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { Loader } from '../cmps/Loader'
import { loadOrder } from '../store/order/order.actions'


export function AddReview() {
    const order = useSelector(storeState => storeState.orderModule.order)
    const [isLoading, setIsLoading] = useState(true)

    const { orderId } = useParams()

    useEffect(() => {
        setIsLoading(true)
        loadOrder(orderId)
            .finally(() => setIsLoading(false))
    }, [orderId])

    if (isLoading || !order) return <Loader />
    const { gig, totalPrice, seller, daysToMake } = order


    return (
        <section className="add-review">
            <form className="review-details">
                <h1 className="title">Public review</h1>
                <h2 className="sub-title">Share your experience with the community, to help them make better decisions.</h2>


                <label className="rate-label">
                    Rate your overall satisfaction of the provided service
                    <section className="stars">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span key={star}>★</span>
                        ))}
                    </section>
                </label>

                <label className="txt-label">
                    What was it like working with this seller?
                    <textarea
                        className="review-txt"
                        maxLength="700"
                        name="txt"
                        placeholder="My experience working with this seller was..."
                    ></textarea>
                    <span className="letter-count">0 / 700</span>
                </label>


                <button className="send-btn" title="Send your review">
                    Send feedback
                </button>
            </form>


            <article className="review-order-preview">
                <h2 className="preview-heading">Your order</h2>
                <img
                    src={gig.imgUrl}
                    alt="gig-img"
                    className="gig-img"
                />
                <h2 className="gig-title">{gig.title}</h2>
                <section className="order-details">
                    <span className="detail-seller">{seller.fullname}</span>
                    <span className="detail-delivery">{daysToMake}</span>
                    <span className="detail-price">{totalPrice}$</span>
                </section>
            </article>
        </section>
    )
}

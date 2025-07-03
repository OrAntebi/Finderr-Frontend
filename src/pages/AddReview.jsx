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
    const { gig, price, seller, daysToMake } = order


    return (
        <section className="add-review grid">
            <form className="add-review">
                <div className="heading-container">
                    <h1 className="heading">Public review</h1>
                    <h2 className="sub-heading">
                        Share your experience with the community, to help them make better decisions.
                    </h2>
                </div>

                <label className="rate-label flex">
                    Rate your overall satisfaction of the provided service
                    <section className="stars flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span key={star}>★</span>
                        ))}
                    </section>
                </label>

                <label className="txt-label flex">
                    What was it like working with this seller?
                    <textarea
                        className="review-txt"
                        maxLength="700"
                        name="txt"
                        placeholder="My experience working with this seller was..."
                    ></textarea>
                    <span className="letter-count">0 / 700</span>
                </label>

                <button className="send" title="Send your review">
                    Send feedback
                </button>
            </form>

            <article className="big-order-preview flex">
                <h2 className="preview-heading">Your order</h2>
                <img
                    src={gig.imgUrl}
                    alt="gig-img"
                    className="gig-img"
                />
                <h2 className="gig-title">{gig.title}</h2>
                <section className="order-details grid">
                    <span className="detail-container seller">{seller.fullname}</span>
                    <span className="detail-container delivery">{daysToMake}</span>
                    <span className="detail-container price">{price}</span>
                </section>
            </article>
        </section>
    )
}

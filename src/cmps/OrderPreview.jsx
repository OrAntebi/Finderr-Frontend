import { Link } from 'react-router-dom'

import { calculateDueDate, getStatusMeta } from '../services/util.service'
import deliverySvg from '../assets/img/delivery-icon.svg'

export function OrderPreview({ order, onOrderClicked }) {
    const { status, createdAt, daysToMake, _id, gig, seller } = order
    const dueDate = calculateDueDate(createdAt, daysToMake)

    return (
        <div className="order-preview flex column">
            <div className="order-status">
                <span className="status-label">ORDER STATUS</span>
                <div className="status-info">
                    <span
                        className="status-value"
                        style={{ color: getStatusMeta(status, 'color') }}
                    >
                        {getStatusMeta(status, 'label')}
                    </span>
                    <span className="due-date">
                        Due date on {dueDate}
                    </span>
                </div>
                <div className="progress-bar">
                    <div
                        className="progress-fill"
                        style={{
                            backgroundColor: getStatusMeta(status, 'color'),
                            width: status === 'pending' ? '25%' :
                                status === 'approved' ? '50%' :
                                    status === 'fulfilled' ? '100%' : '0%'
                        }}
                    ></div>
                </div>
            </div>

            <div className="gig-info flex">

                <Link to={`/categories/${gig._id}`} className="gig-image">
                    <img src={gig.imgUrl} alt={gig.title} />
                </Link>

                <div className="gig-content">
                    <Link to={`/categories/${gig._id}`}>
                        <h3 className="gig-title">{gig.title}</h3>
                    </Link>

                    <Link to={`/categories?category=${gig.category}`}>
                        <p className="gig-category">{gig.categoryLabel}</p>
                    </Link>

                    <p className="seller-name">
                        From <Link to={`/user/${seller._id}`}>{seller.fullname}</Link>
                    </p>
                </div>
            </div>

            <div className="order-details">
                <div className="detail-row flex align-center justify-between">
                    <span className="detail-label">order no.</span>
                    <span className="detail-value">#{_id}</span>
                </div>
                <div className="detail-row flex align-center justify-between">
                    <span className="detail-label">delivery time</span>
                    <div className="detail-value delivery flex align-center justify-center">
                        <img src={deliverySvg} alt="delivery-icon" />
                        <span>{daysToMake} Days</span>
                    </div>
                </div>
                <div className="view-order-btn flex align-center justify-end">
                    <button onClick={(ev) => onOrderClicked(order, ev)} className="action-btn view-order">view order</button>
                </div>
                {status === 'fulfilled' &&
                    <div className="add-review-btn flex align-center justify-end">
                        <Link to={`/review/${_id}`} className="action-btn add-review">add review</Link>
                    </div>
                }
            </div>
        </div>
    )
}
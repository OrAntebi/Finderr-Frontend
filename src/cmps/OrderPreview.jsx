import { Link } from 'react-router-dom'

import { calculateDueDate } from '../services/util.service'
import deliverySvg from '../assets/img/delivery-icon.svg'

export function OrderPreview({ order }) {

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return '#f39c12'
            case 'approved': return '#3498db'
            case 'fulfilled': return '#27ae60'
            case 'rejected': return '#e74c3c'
            default: return '#95a5a6'
        }
    }


    const { status, createdAt, daysToMake, _id, gig, seller } = order
    const dueDate = calculateDueDate(createdAt, daysToMake)

    return (
        <div className="order-preview flex column">
            <div className="order-status">
                <span className="status-label">ORDER STATUS</span>
                <div className="status-info">
                    <span
                        className="status-value"
                        style={{ color: getStatusColor(status) }}
                    >
                        {status}
                    </span>
                    <span className="due-date">
                        Due date on {dueDate}
                    </span>
                </div>
                <div className="progress-bar">
                    <div
                        className="progress-fill"
                        style={{
                            backgroundColor: getStatusColor(status),
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
                    <h3 className="gig-title">{gig.title}</h3>
                    <p className="gig-category">{gig.categoryLabel}</p>
                    <p className="seller-name">From {seller.fullname}</p>
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
                    <button className="show-order btn">view order</button>
                </div>
            </div>
        </div>
    )
}
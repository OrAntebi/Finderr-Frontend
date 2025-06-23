import { Link } from "react-router-dom"
import { gigService } from '../services/gig'

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

    const calculateDueDate = (createdAt, daysToMake) => {
        const dueDate = new Date(createdAt)
        dueDate.setDate(dueDate.getDate() + daysToMake)
        return dueDate.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        })
    }
    const { status, createdAt, daysToMake, _id, gig, seller } = order
    return (
        <div className="order-preview">
            <div className="order-status">
                <span className="status-label">ORDER STATUS</span>
                <div className="status-info">
                    <span 
                        className="status-value" 
                        style={{ color: getStatusColor(status) }}
                    >
                        {status.toUpperCase()}
                    </span>
                    <span className="due-date">
                        Due date on {calculateDueDate(createdAt, daysToMake)}
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

            <div className="gig-info flex wrap">
                <div className="gig-image">
                    <img src={gig.imgUrl || '/default-gig-image.jpg'} alt={gig.title} />
                </div>
                <div className="gig-details">
                    <h3 className="gig-title">{gig.title}</h3>
                    <p className="gig-category">{gigService.getCategoryList(gig.category)}</p>
                    <p className="seller-name">From {seller.fullname}</p>
                </div>
            </div>

            <div className="order-details">
                <div className="detail-row flex justify-between">
                    <span className="detail-label">ORDER NO.</span>
                    <span className="detail-value">#{_id}</span>
                </div>
                <div className="detail-row">
                    <span className="detail-label">DELIVERY TIME</span>
                    <span className="detail-value">📅 {daysToMake} Days</span>
                </div>
            </div>

            <div className="order-actions">
                <Link to={`/order/${_id}`} className="view-order-btn">
                    VIEW ORDER
                </Link>
            </div>
        </div>
    )
}
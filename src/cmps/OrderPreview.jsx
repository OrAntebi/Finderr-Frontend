import { Link } from "react-router-dom"

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

    return (
        <div className="order-preview">
            <div className="order-status">
                <span className="status-label">ORDER STATUS</span>
                <div className="status-info">
                    <span 
                        className="status-value" 
                        style={{ color: getStatusColor(order.status) }}
                    >
                        {order.status.toUpperCase()}
                    </span>
                    <span className="due-date">
                        Due date on {calculateDueDate(order.createdAt, order.daysToMake)}
                    </span>
                </div>
                <div className="progress-bar">
                    <div 
                        className="progress-fill" 
                        style={{ 
                            backgroundColor: getStatusColor(order.status),
                            width: order.status === 'pending' ? '25%' : 
                                   order.status === 'approved' ? '50%' : 
                                   order.status === 'fulfilled' ? '100%' : '0%'
                        }}
                    ></div>
                </div>
            </div>

            <div className="gig-info">
                <div className="gig-image">
                    <img src={order.gig.imgUrl || '/default-gig-image.jpg'} alt={order.gig.title} />
                </div>
                <div className="gig-details">
                    <h3 className="gig-title">{order.gig.title}</h3>
                    <p className="gig-category">{order.packageName}</p>
                    <p className="seller-name">From {order.seller.fullname}</p>
                </div>
            </div>

            <div className="order-details">
                <div className="detail-row">
                    <span className="detail-label">ORDER NO.</span>
                    <span className="detail-value">#{order._id}</span>
                </div>
                <div className="detail-row">
                    <span className="detail-label">DELIVERY TIME</span>
                    <span className="detail-value">📅 {order.daysToMake} Days</span>
                </div>
            </div>

            <div className="order-actions">
                <Link to={`/order/${order._id}`} className="view-order-btn">
                    VIEW ORDER
                </Link>
            </div>
        </div>
    )
}
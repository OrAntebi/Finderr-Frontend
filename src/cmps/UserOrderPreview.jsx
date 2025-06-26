import { formatTimestamp } from '../services/util.service.js';

export function UserOrderPreview({ order, handleOrderClicked, isMobile }) {
    const { buyer, gig, createdAt, totalPrice, status } = order;

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return '#f39c12'
            case 'approved': return '#3498db'
            case 'fulfilled': return '#27ae60'
            case 'rejected': return '#e74c3c'
            default: return '#95a5a6'
        }
    }

    return (
        isMobile ? (
            <article className="order-card user-order-preview" onClick={ev => handleOrderClicked(order, ev)}>
                <div className="buyer-cell">
                    <img src={buyer.imgUrl} alt="buyer image" />
                    <span>{buyer.fullname}</span>
                </div>
                <div className="gig-cell">{gig.title}</div>
                <div className="dueon-cell">{formatTimestamp(createdAt)}</div>
                <div className="price-cell">${totalPrice}</div>
                <div className="status-cell">
                    <label className="status" style={{ backgroundColor: getStatusColor(status) }}>{status}</label>
                </div>
            </article>
        ) : (
            <tr className="order-row user-order-preview" onClick={ev => handleOrderClicked(order, ev)}>
                <td className="cell buyer-cell">
                    <img src={buyer.imgUrl} alt="buyer image" />
                    <span>{buyer.fullname}</span>
                </td>
                <td className="cell gig-cell">{gig.title}</td>
                <td className="cell dueon-cell">{formatTimestamp(createdAt)}</td>
                <td className="cell price-cell">${totalPrice}</td>
                <td className="cell status-cell">
                    <label className="status" style={{ backgroundColor: getStatusColor(status) }}>{status}</label>
                </td>
            </tr>
        )
    )
}

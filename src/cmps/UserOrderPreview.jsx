import { formatTimestamp, getStatusMeta } from '../services/util.service.js';

export function UserOrderPreview({ order, handleOrderClicked, isMobile, statusDropdownOpen, toggleStatusDropdown, updateOrderStatus, dropdownRefs }) {
    const { buyer, gig, createdAt, totalPrice, status } = order;

    const orderStatuses = ['pending', 'approved', 'fulfilled', 'rejected']

    const setRef = (el) => {
        if (dropdownRefs) dropdownRefs(el)
    }

    return (
        isMobile ? (
            <article className="order-card user-order-preview" onClick={ev => handleOrderClicked(order, ev)}>
                <div className="buyer-cell">
                    <img src={buyer.imgUrl} alt="buyer image" />
                    <span>{buyer.fullname}</span>
                </div>
                <div className="gig-cell">{gig.title}</div>
                <div className="dueon-cell flex column"><b>Due on</b> {formatTimestamp(createdAt)}</div>
                <div className="price-cell flex column"><b>Total price</b> ${totalPrice}</div>
                <div className="status-cell" ref={setRef}>
                    <label className="status" style={{ backgroundColor: getStatusMeta(status, 'color') }} onClick={ev => toggleStatusDropdown(ev, order._id)}>
                        {status}
                    </label>

                    {statusDropdownOpen === order._id && (
                        <ul className="status-dropdown">
                            {orderStatuses
                                .filter(status => status !== 'pending')
                                .map(st => (
                                    <li key={st} onClick={ev => updateOrderStatus(ev, order, st)}>
                                        {getStatusMeta(st, 'dropdown')}
                                    </li>
                                ))}
                        </ul>
                    )}
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
                <td className="cell status-cell" ref={setRef}>
                    <label className="status" style={{ backgroundColor: getStatusMeta(status, 'color')  }} onClick={ev => toggleStatusDropdown(ev, order._id)}>
                        {status}
                    </label>

                    {statusDropdownOpen === order._id && (
                        <ul className="status-dropdown">
                            {orderStatuses
                                .filter(status => status !== 'pending')
                                .map(statusOption => (
                                    <li key={statusOption} onClick={ev => updateOrderStatus(ev, order, statusOption)}>
                                        {getStatusMeta(statusOption, 'dropdown')}
                                    </li>
                                ))}
                        </ul>
                    )}
                </td>
            </tr>
        )
    )
}

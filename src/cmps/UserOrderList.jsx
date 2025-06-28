import { UserOrderPreview } from './UserOrderPreview'
import { useScreenSize } from '../customHooks/useScreenSize'

export function UserOrderList({ orders, handleOrderClicked, statusDropdownOpen, toggleStatusDropdown, updateOrderStatus, dropdownRefs }) {
  const screenWidth = useScreenSize()
  const isMobile = screenWidth < 964

  return (
    <section className="user-order-list" style={{ overflow: "visible" }}>
      {isMobile ? (
        <div className="order-cards">
          {orders.map(order => (
            <UserOrderPreview
              key={order._id}
              order={order}
              isMobile={isMobile}
              handleOrderClicked={handleOrderClicked}
              statusDropdownOpen={statusDropdownOpen}
              toggleStatusDropdown={toggleStatusDropdown}
              updateOrderStatus={updateOrderStatus}
              dropdownRefs={el => (dropdownRefs.current[order._id] = el)}
            />
          ))}
        </div>
      ) : (
        <table className="order-table">
          <thead>
            <tr>
              <th className="buyer-cell">buyer</th>
              <th className="gig-cell">gig</th>
              <th className="dueon-cell">due on</th>
              <th className="price-cell">total</th>
              <th className="status-cell">status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <UserOrderPreview
                key={order._id}
                order={order}
                isMobile={isMobile}
                handleOrderClicked={handleOrderClicked}
                statusDropdownOpen={statusDropdownOpen}
                toggleStatusDropdown={toggleStatusDropdown}
                updateOrderStatus={updateOrderStatus}
                dropdownRefs={el => (dropdownRefs.current[order._id] = el)}
              />

            ))}
          </tbody >
        </table>
      )}
    </section>
  )
}

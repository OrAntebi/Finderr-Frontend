import { UserGigPreview } from "./UserGigPreview"
import { useScreenSize } from '../customHooks/useScreenSize'

export function UserGigList({ gigs, onRemoveGig }) {
  const screenWidth = useScreenSize()
  const isMobile = screenWidth < 964

  return (
    <section className="user-gig-list">
      {isMobile ? (
        <div className="gig-cards">
          {gigs.map(gig => (
            <UserGigPreview
              key={gig._id}
              isMobile={isMobile}
              gig={gig}
              onRemoveGig={onRemoveGig}
            />
          ))}
        </div>
      ) : (
        <table className="gig-table">
          <thead>
            <tr>
              <th className="empty-cell"></th>
              <th className="title-cell">Title</th>
              <th className="price-cell">Added</th>
              <th className="price-cell">Price</th>
              <th className="actions-cell">Impressions</th>
              <th className="actions-cell">Actions</th>
            </tr>
          </thead>
          <tbody>
            {gigs.map(gig => (
              <UserGigPreview
                key={gig._id}
                isMobile={isMobile}
                gig={gig}
                onRemoveGig={onRemoveGig}
              />
            ))}
          </tbody>
        </table>
      )}
    </section>
  )
}
import { userService } from '../services/user'
import { GigPreview } from './GigPreview'

export function GigList({ gigs }) {

    return <section className="gig-list-container">
        <ul className="gig-list">
            {gigs.map(gig =>
                <li key={gig._id} className="gig-item">
                    <GigPreview gig={gig} />
                </li>)
            }
        </ul>
    </section>
}
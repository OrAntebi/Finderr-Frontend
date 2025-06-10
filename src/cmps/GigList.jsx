import { userService } from '../services/user'
import { GigPreview } from './GigPreview'

export function GigList({ gigs, onRemoveGig, onUpdateGig }) {

    function shouldShowActionBtns(gig) {
        const user = userService.getLoggedinUser()

        if (!user) return false
        if (user.isAdmin) return true
        return gig.owner?._id === user._id
    }

    return <section className="gig-list-container">
        <ul className="gig-list">
            {gigs.map(gig =>

                <li key={gig._id} className="gig-item">
                    <GigPreview gig={gig} />
                    {shouldShowActionBtns(gig) && <div className="actions">
                        <button onClick={() => onUpdateGig(gig)}>Edit</button>
                        <button onClick={() => onRemoveGig(gig._id)}>x</button>
                    </div>}
                </li>)
            }
        </ul>
    </section>
}
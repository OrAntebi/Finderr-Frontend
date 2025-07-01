import { userService } from '../services/user'

import { ReviewPreview } from './ReviewPreview.jsx'

export function ReviewList({ reviews, onRemoveReview }) {

    function shouldShowActionBtns(review) {
        const user = userService.getLoggedinUser()
        if (!user) return false
        if (user.isAdmin) return true
        return review.byUser?._id === user._id
    }

    const sortedReviews = reviews.sort((a, b) => b.createdAt - a.createdAt)

    return (
        <ul className="review-list">
            {sortedReviews.map(review =>
                <li key={review._id}>
                    <ReviewPreview review={review} />
                    {shouldShowActionBtns(review) && <div className="actions">
                        <button onClick={() => onRemoveReview(review._id)}>x</button>
                    </div>}
                </li>)
            }
        </ul>
    )
}
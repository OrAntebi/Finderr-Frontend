import { removeReview } from '../store/review/review.actions'
import { ReviewList } from '../cmps/ReviewList'
import { ReviewChart } from '../cmps/ReviewChart'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

export function ReviewIndex({ reviews, isProfile = false }) {

    async function onRemoveReview(reviewId) {
        try {
            await removeReview(reviewId)
            showSuccessMsg('Review removed successfully')
        } catch (err) {
            showErrorMsg('Cannot remove review')
        }
    }

    return (
        <section className="review-index">
            {reviews ?
                <>
                    <ReviewChart reviews={reviews} isProfile={isProfile} />
                    <ReviewList reviews={reviews} onRemoveReview={onRemoveReview} />
                </>
                :
                <h4 className="no-reviews-msg">No reviews for this gig yet.</h4>
            }
        </section>
    )
}
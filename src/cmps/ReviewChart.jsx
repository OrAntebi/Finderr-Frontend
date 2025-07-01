import Rating from '@mui/material/Rating'
import GradeIcon from '@mui/icons-material/Grade'
import StarOutlineIcon from '@mui/icons-material/StarOutline'


export function ReviewChart({ reviews }) {
    const totalReviews = reviews.length

    const ratingCounts = [1, 2, 3, 4, 5].reduce((acc, star) => {
        acc[star] = reviews.filter(r => r.rate === star).length
        return acc
    }, {})

    const avgRating = (
        reviews.reduce((sum, r) => sum + r.rate, 0) / totalReviews || 0
    ).toFixed(1)

    return (
        <section className="review-chart">
            <div className="review-summary flex alin-center justify-between">
                <h4>{totalReviews} reviews for this seller</h4>
                <div className="stars flex align-center">
                    <Rating
                        value={avgRating}
                        precision={0.5}
                        readOnly
                        icon={<GradeIcon />}
                        emptyIcon={<StarOutlineIcon />}
                        sx={{
                            color: '#222325',
                            '& .MuiRating-iconEmpty': {
                                color: 'inherit'
                            }
                        }}
                    />
                    <span>{avgRating}</span>
                </div>
            </div>

            {[5, 4, 3, 2, 1].map((star) => {
                const count = ratingCounts[star] || 0
                const percent = totalReviews ? (count / totalReviews) * 100 : 0

                return (
                    <div className="review-bar-row flex align-center" key={star}>
                        <label className="star-number">{star} Stars</label>
                        <div className="review-bar-background">
                            <div
                                className="review-bar-fill"
                                style={{ width: `${percent}%` }}
                            ></div>
                        </div>
                        <span className="review-number">({count})</span>
                    </div>
                )
            })}
        </section>
    )
}
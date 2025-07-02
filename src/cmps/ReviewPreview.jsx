import Rating from '@mui/material/Rating'
import GradeIcon from '@mui/icons-material/Grade'
import StarOutlineIcon from '@mui/icons-material/StarOutline'
import { getRandomIntInclusive, timeAgo } from '../services/util.service'
import UserAvatar from "./UserAvatar"
import { useRef } from 'react'

export function ReviewPreview({ review }) {
    const { by } = review
    const { createdAt, rate, txt } = review
    const formatedDate = timeAgo(createdAt)
    const priceRef = useRef(getRandomIntInclusive(100, 500))
    const daysRef = useRef(getRandomIntInclusive(1, 30))

    return (
        <article className="review-preview">
            <header className="review-header flex">
                <UserAvatar user={by} size={{ width: 48, height: 48 }} dot="variant" />
                <div className="review-by flex column justify-between">
                    <span className="fullname">{by.fullname}</span>
                    <span className="location">{by.location}</span>
                </div>
            </header>

            <section className="review-content flex column">
                <div className="rate-and-date flex align-center">
                    <div className="rate-container flex align-center">
                        <Rating
                            value={rate}
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
                        <span className="rate">{rate}</span>
                    </div>
                    <span className="partition"></span>
                    <span className="created-at">{formatedDate}</span>
                </div>

                <div className="review-txt">
                    <p>{txt}</p>
                </div>

                <div className="gig-info flex">
                    <div className="price flex column">
                        <span>Up&nbsp;to&nbsp;${priceRef.current}</span>
                        <label>Price</label>
                    </div>
                    <span className="partition"></span>
                    <div className="duration flex column">
                        <span>{daysRef.current}&nbsp;days</span>
                        <label>Duration</label>
                    </div>
                </div>
            </section>
        </article>
    )
}
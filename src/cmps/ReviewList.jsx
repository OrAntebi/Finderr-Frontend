// cmps/ReviewList.jsx
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadReviews } from '../store/review/review.actions'
import { userService } from '../services/user'
import { ReviewPreview } from './ReviewPreview.jsx'
import arrowIcon from '../assets/img/arrow-icon.svg'
import checkIcon from '../assets/img/check-icon.svg'
import { icons } from '../assets/icons/icons'

const STEP = 5
const sortOptions = [
    { value: 'most-relevant', label: 'Most Relevant' },
    { value: 'most-recent', label: 'Most Recent' }
]

export function ReviewList({ ownerId, onRemoveReview }) {
    const reviews = useSelector(s => s.reviewModule.reviews)
    const loggedUser = useSelector(s => s.userModule.user)

    const [visible, setVisible] = useState(STEP)
    const [sortBy, setSortBy] = useState('most relevant')
    const [isOpen, setIsOpen] = useState(false)
    const [helpfulMap, setHelpfulMap] = useState({})

    useEffect(() => {
        if (!ownerId) return
        loadReviews({ userId: ownerId, sortBy })
        setVisible(STEP)
    }, [ownerId, sortBy])

    const allVisible = visible >= reviews.length
    const displayed = reviews.slice(0, allVisible ? reviews.length : visible)
    const canPaginate = reviews.length > STEP
    const currentLabel =
        sortOptions.find(o => o.value === sortBy)?.label ?? 'Most Relevant'

    const toggleMenu = () => setIsOpen(o => !o)
    const applySort = val => {
        setSortBy(val)
        setIsOpen(false)
    }
    const toggleShow = () =>
        setVisible(v => (allVisible ? STEP : Math.min(v + STEP, reviews.length)))

    const canRemove = review => {
        return loggedUser && review.by?._id === loggedUser._id
    }

    const markHelpful = (id, val) =>
        setHelpfulMap(prev => {
            const already = prev[id]
            return {
                ...prev,
                [id]: already === val ? null : val
            }
        })

    return (
        <>
            {/* <section className={`dropdown-filter sort flex align-center ${isOpen ? 'open' : ''}`}>
                <button className="sort-btn" onClick={toggleMenu}>
                    {currentLabel}
                    <img src={arrowIcon} className={`arrow-icon ${isOpen ? 'rotate' : ''}`} />
                </button>

                {isOpen && (
                    <div className="dropdown-content sort-options">
                        <ul>
                            {sortOptions.map(opt => (
                                <li
                                    key={opt.value}
                                    className={`sort-option flex align-center ${sortBy === opt.value ? 'selected' : ''}`}
                                    onClick={() => applySort(opt.value)}
                                >
                                    <img src={checkIcon} className={sortBy === opt.value ? '' : 'hidden'} />
                                    <label>{opt.label}</label>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </section> */}

            <ul className="review-list">
                {displayed.map(review => {
                    const helpful = helpfulMap[review._id]

                    return (
                        <li key={review._id} className="review-item">
                            <ReviewPreview review={review} />

                            <section className="helpful-thumbs flex align-center">
                                <span className="helpful">Helpful?</span>

                                <span
                                    className={`like flex align-center${helpful === true ? ' selected' : ''}`}
                                    onClick={() => markHelpful(review._id, true)}
                                >
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M11.89 14.75H1C0.59 14.75 0.25 14.41 0.25 14V8C0.25 7.59 0.59 7.25 1 7.25H3.46L6.05 0.72C6.16 0.43 6.44 0.25 6.75 0.25H7.67C8.59 0.25 9.34 0.98 9.34 1.87V5.45H13.17C14 5.45 14.78 5.84 15.27 6.48C15.73 7.1 15.87 7.87 15.66 8.6L14.39 12.93C14.08 13.99 13.06 14.74 11.9 14.74L11.89 14.75ZM4.75 13.25H11.89C12.38 13.25 12.81 12.95 12.94 12.52L14.21 8.19C14.32 7.81 14.16 7.52 14.06 7.39C13.85 7.12 13.53 6.96 13.16 6.96H8.58C8.17 6.96 7.83 6.62 7.83 6.21V1.87C7.83 1.81 7.76 1.75 7.66 1.75H7.25L4.74 8.08V13.25H4.75ZM1.75 13.25H3.25V8.75H1.75V13.25V13.25Z"></path></svg>
                                    Yes
                                </span>

                                <span
                                    className={`dislike flex align-center${helpful === false ? ' selected' : ''}`}
                                    onClick={() => markHelpful(review._id, false)}
                                >
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M9.25533 14.75H8.33533C7.41533 14.75 6.66533 14.03 6.66533 13.13L6.66533 9.55H2.83533C2.00533 9.55 1.22533 9.16 0.735326 8.52C0.275326 7.9 0.135326 7.13 0.345326 6.4L1.62533 2.06C1.93533 1 2.95533 0.25 4.11533 0.25L15.0053 0.25C15.4153 0.25 15.7553 0.59 15.7553 1V7C15.7553 7.41 15.4153 7.75 15.0053 7.75H12.5453L9.95533 14.28C9.84533 14.57 9.56533 14.75 9.25533 14.75ZM4.11533 1.75C3.62533 1.75 3.19533 2.05 3.06533 2.48L1.79533 6.81C1.68533 7.19 1.84533 7.48 1.94533 7.61C2.15533 7.88 2.47533 8.04 2.84533 8.04H7.42533C7.83533 8.04 8.17533 8.38 8.17533 8.79L8.17533 13.12C8.17533 13.17 8.24533 13.24 8.34533 13.24H8.75533L11.2653 6.91V1.75L4.11533 1.75ZM12.7553 6.25H14.2553V1.75L12.7553 1.75V6.25Z"></path></svg>
                                    No
                                </span>

                                {helpful === true && (
                                    <span className="confirmation">
                                        You found this review helpful.
                                    </span>
                                )}

                                {canRemove(review) && (
                                    <div className="actions">
                                        <button onClick={() => onRemoveReview(review._id)}>
                                            Delete Review
                                        </button>
                                    </div>
                                )}
                            </section>
                        </li>
                    )
                })}
            </ul>

            {canPaginate && (
                <button className="show-more-btn" onClick={toggleShow}>
                    {allVisible ? 'Show Less Reviews' : 'Show More Reviews'}
                </button>
            )}
        </>
    )
}

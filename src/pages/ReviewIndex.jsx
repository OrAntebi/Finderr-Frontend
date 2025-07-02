import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { loadReviews, removeReview } from '../store/review/review.actions'
import { ReviewChart } from '../cmps/ReviewChart'
import { ReviewList } from '../cmps/ReviewList'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import arrowIcon from '../assets/img/dropdown-arrow-icon.svg'
import checkIcon from '../assets/img/check-icon-2.svg'

const STEP = 5
const sortOptions = [
    { value: 'most-relevant', label: 'Most relevant' },
    { value: 'most-recent', label: 'Most recent' }
]

export function ReviewIndex({ userId, gigId, isProfile = false }) {
    const reviews = useSelector(s => s.reviewModule.reviews)
    const loggedUser = useSelector(s => s.userModule.user)
    const [sortBy, setSortBy] = useState('most-relevant')
    const [visible, setVisible] = useState(STEP)
    const [helpfulMap, setHelpfulMap] = useState({})

    useEffect(() => {
        const filterBy = userId ? { userId, sortBy } : { gigId, sortBy }
        loadReviews(filterBy)
    }, [sortBy])

    const allVisible = visible >= reviews
    const displayed = reviews.slice(0, allVisible ? reviews.length : visible)

    const onSortChange = (val) => {
        setSortBy(val)
        setVisible(STEP)
    }

    const toggleShow = () =>
        setVisible(v => (allVisible ? STEP : Math.min(v + STEP, reviews.length)))

    const markHelpful = (id, val) =>
        setHelpfulMap(prev => ({
            ...prev,
            [id]: prev[id] === val ? null : val
        }))

    const onRemoveReview = async (reviewId) => {
        try {
            await removeReview(reviewId)
            showSuccessMsg('Review removed')
        } catch {
            showErrorMsg('Cannot remove')
        }
    }

    return (
        <section className="review-index">
            {reviews.length ? (
                <>
                    <ReviewChart reviews={reviews} isProfile={isProfile} />
                    <SortBy sortBy={sortBy} onSortChange={onSortChange} />
                    <ReviewList
                        reviews={displayed}
                        isAllVisible={allVisible}
                        onToggleShow={toggleShow}
                        helpfulMap={helpfulMap}
                        onMarkHelpful={markHelpful}
                        onRemoveReview={onRemoveReview}
                        loggedUser={loggedUser}
                    />
                </>
            ) : (
                <h4 className="no-reviews-msg">No reviews yet.</h4>
            )}
        </section>
    )
}


function SortBy({ sortBy, onSortChange }) {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef(null)
    const currentLabel = sortOptions.find(o => o.value === sortBy)?.label ?? 'Most Relevant'

    useEffect(() => {
        const handleClickOutside = (ev) => {
            if (dropdownRef.current && !dropdownRef.current.contains(ev.target)) {
                setIsOpen(false)
            }
        }
        window.addEventListener('pointerdown', handleClickOutside)
        return () => window.removeEventListener('pointerdown', handleClickOutside)
    }, [])

    const toggle = () => setIsOpen(prev => !prev)

    return (
        <section className={`dropdown-filter sort flex align-center ${isOpen ? 'open' : ''}`} ref={dropdownRef}>
            <p>Sort By</p>
            <button className="sort-btn" onClick={toggle}>
                {currentLabel}
                <img src={arrowIcon} alt="" className={`arrow-icon ${isOpen ? 'rotate' : ''}`} />
            </button>

            {isOpen && (
                <div className="dropdown-content sort-options">
                    <ul className="sort-options-list">
                        {sortOptions.map(opt => {
                            const selected = sortBy === opt.value
                            return (
                                <li
                                    key={opt.value}
                                    className={`sort-option flex align-center ${selected ? 'selected' : ''}`}
                                    onClick={() => {
                                        onSortChange(opt.value)
                                        setIsOpen(false)
                                    }}
                                >
                                    <img src={checkIcon} alt="check" className={selected ? '' : 'hidden'} />
                                    <label>{opt.label}</label>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            )}
        </section>
    )
}

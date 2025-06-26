import { useState } from 'react'
import { Link } from 'react-router-dom'

import { gigService } from "../services/gig"
import { useScreenSize } from '../customHooks/useScreenSize'
import starSvg from '../assets/img/star-icon.svg'


export function OwnerDetails({ owner, isLarge }) {
    const isMobile = useScreenSize() < 664
    const [expanded, setExpanded] = useState(false)

    const {
        about, imgUrl, level, fullname, rate,
        reviews, loc, memberSince, avgResponseTime,
        lastDelivery, languages, _id
    } = owner

    const maxChars = 180
    const showToggle = isMobile && about.length > maxChars

    const aboutText =
        showToggle && !expanded
            ? about.slice(0, about.substr(0, maxChars).lastIndexOf(' ')) + ' …'
            : about

    const numericLevel = Number(level)
    const isTopRated = numericLevel === 3

    const levelStars = gigService.convertLvlToStars(level)
        .map((src, idx) => (
            <img key={idx} src={src} alt="star" className="star" />
        ))

    return (
        <>
            <div className="owner-details flex align-center">
                <Link to={`/user/${_id}`}>
                    <img className={`owner-img ${isLarge ? 'large' : ''}`} src={imgUrl} alt="owner image" />
                </Link>
                <div className="owner-info flex column">
                    <div className="name-and-level flex justify-start">

                        <Link to={`/user/${_id}`}>
                            <h3>{fullname}</h3>
                        </Link>

                        <span className={`level flex align-center ${isTopRated ? "top-rated" : ""}`}>
                            <p>{isTopRated ? "Top rated" : `Level ${level}`}</p>
                            <span className="stars flex align-center">{levelStars}</span>
                        </span>
                    </div>

                    <div className="rate flex align-center">
                        <div className="flex align-center">
                            <div className="stars flex">
                                {Array.from({ length: isMobile ? 1 : 5 }, (_, index) => (
                                    <img key={index} className="star" src={starSvg} alt="star-icon" />
                                ))}
                            </div>
                            <span className="rating">{rate}</span>
                        </div>
                        <span className="reviews">
                            (<label>{reviews} reviews</label>)
                        </span>
                    </div>

                </div>
            </div>
            {
                isLarge && <div className="owner-description">
                    <ul className="description-list">
                        <li>
                            <label>From</label>
                            <strong>{loc}</strong>
                        </li>
                        <li>
                            <label>Member since</label>
                            <strong>{memberSince}</strong>
                        </li>
                        <li>
                            <label>Avg. response time</label>
                            <strong>{avgResponseTime}</strong>
                        </li>
                        <li>
                            <label>Last delivery</label>
                            <strong>{lastDelivery}</strong>
                        </li>
                        <li>
                            <label>Languages</label>
                            <strong>{languages.join(', ')}</strong>
                        </li>
                    </ul>
                    <p>{aboutText}</p>

                    {showToggle && (
                        <button
                            className='show-more-btn'
                            onClick={() => setExpanded(!expanded)}
                        >
                            {expanded ? '- See Less' : '+ See More'}
                        </button>
                    )}
                </div>}</>
    )
}
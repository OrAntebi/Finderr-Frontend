import { useState } from 'react'
import { gigService } from "../services/gig"
import { useScreenSize } from '../customHooks/useScreenSize'
import starSvg from '../assets/img/star-icon.svg'


export function OwnerDetails({ owner, isLarge }) {
    const isMobile = useScreenSize() < 664
    const [expanded, setExpanded] = useState(false)

    const maxChars = 180
    const showToggle = isMobile && owner.about.length > maxChars

    const aboutText =
        showToggle && !expanded
            ? owner.about.slice(0, owner.about.substr(0, maxChars).lastIndexOf(' ')) + ' …'
            : owner.about

    const level = Number(owner.level)
    const isTopRated = level === 3

    const levelStars = gigService.convertLvlToStars(owner.level)
        .map((src, idx) => (
            <img key={idx} src={src} alt="star" className="star" />
        ))

    return (
        <>
            <div className="owner-details flex align-center">
                <img className={`owner-img ${isLarge ? 'large' : ''}`} src={owner.imgUrl} alt="owner image" />
                <div className="owner-info flex column">
                    <div className="name-and-level flex justify-start">
                        <h3>{owner.fullname}</h3>

                        <span className={`level flex align-center ${isTopRated ? "top-rated" : ""}`}>
                            <p>{isTopRated ? "Top rated" : `Level ${gig.owner.level}`}</p>
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
                            <span className="rating">{owner.rate}</span>
                        </div>
                        <span className="reviews">
                            (<label>{owner.reviews} reviews</label>)
                        </span>
                    </div>

                </div>
            </div>
            {
                isLarge && <div className="owner-description">
                    <ul className="description-list">
                        <li>
                            <label>From</label>
                            <strong>{owner.loc}</strong>
                        </li>
                        <li>
                            <label>Member since</label>
                            <strong>{owner.memberSince}</strong>
                        </li>
                        <li>
                            <label>Avg. response time</label>
                            <strong>{owner.avgResponceTime}</strong>
                        </li>
                        <li>
                            <label>Last delivery</label>
                            <strong>{owner.lastDelivery}</strong>
                        </li>
                        <li>
                            <label>Languages</label>
                            <strong>{owner.languages.join(', ')}</strong>
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
import starSvg from '../assets/img/star-icon.svg'
import { gigservice } from "../services/gig"


export function OwnerDetails({ owner, isLarge }) {


    const levelStars = gigservice.convertLvlToStars(owner.level)
        .map((src, idx) => (
            <img key={idx} src={src} alt="star" className="star" />
        ))

    return (
        <>
            <div className="owner-details flex align-center">
                <img className={`owner-img ${isLarge ? 'large' : ''}`} src={owner.imgUrl} alt="owner image" />
                <div className="owner-info flex column">
                    <div className="name-and-level flex align-center">
                        <h3>{owner.fullname}</h3>

                        <span className="level flex align-center">
                            <p>Level {owner.level}</p>
                            <span className="stars flex align-center">{levelStars}</span>
                        </span>
                    </div>

                    <div className="rate flex align-center">
                        <div className="stars flex">
                            {Array.from({ length: 5 }, (_, index) => (
                                <img key={index} className="star" src={starSvg} alt="star-icon" />
                            ))}
                        </div>
                        <span className="rating">{owner.rate}</span>
                    </div>
                </div>
            </div>
            {
                isLarge && <div className="owner-description">
                    <ul className="desciption-list">
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
                </div>}</>
    )
}
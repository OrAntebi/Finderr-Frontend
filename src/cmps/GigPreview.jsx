import { gigService } from "../services/gig"
import { Link } from "react-router-dom"
import { GigSlider } from "./GigSlider"

export function GigPreview({ gig }) {
    const starsArr = gigService.convertLvlToStars(gig.owner.level)

    const level = Number(gig.owner.level)
    const isTopRated = level === 3

    const levelStars = starsArr.map((src, idx) => (
        <img key={idx} src={src} alt="star" className="star-img" />
    ))

    return (
        <Link to={`/categories/${gig._id}?category=${gig.category}`} className="gig-preview">
            <GigSlider gig={gig} />

            <div className="owner-row flex align-center justify-between">
                <div className="owner-details">
                    <Link to={`/user/${gig.owner._id}`} className="owner-name flex align-center" onClick={(ev) => ev.stopPropagation()}>
                    <img className="owner-avatar" src={gig.owner.imgUrl} />
                        {gig.owner.fullname}
                    </Link>
                </div>

                <span className={`owner-level flex align-center ${isTopRated ? "top-rated" : ""}`}>
                    <p>{isTopRated ? "Top rated" : `Level ${gig.owner.level}`}</p>
                    <span className="stars flex align-center">{levelStars}</span>
                </span>
            </div>

            <p className="gig-title">{gig.title}</p>

            <div className="rating-row flex align-center">
                <span className="star">★</span>
                <span className="rate-num">{gig.owner.rate.toFixed(1)}</span>
                <span className="rate-count">({gig.owner.reviews})</span>
            </div>

            <div className="price-row flex align-center">
                <span className="price">From ${gig.price}</span>
            </div>
        </Link>
    )
}

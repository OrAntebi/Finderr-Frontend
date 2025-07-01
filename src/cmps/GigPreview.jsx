import { gigService } from "../services/gig"
import { useNavigate } from "react-router-dom"
import { GigSlider } from "./GigSlider"
import starIcon from '../assets/img/star-icon.svg'

export function GigPreview({ gig }) {
    const navigate = useNavigate()
    const starsArr = gigService.convertLvlToStars(gig.owner.level)

    const level = Number(gig.owner.level)
    const isTopRated = level === 3

    const levelStars = starsArr.map((src, idx) => (
        <img key={idx} src={src} alt="star" className="star-img" />
    ))

    function onGigClick() {
        navigate(`/categories/${gig._id}?category=${gig.category}`)
    }

    function onOwnerClick(ev) {
        ev.stopPropagation()
        navigate(`/user/${gig.owner._id}`)
    }


    return (
        <section className="gig-preview" onClick={onGigClick}>
            <GigSlider gig={gig} />

            <div className="owner-row flex align-center justify-between">
                <div className="owner-details">
                    <div className="owner-name flex align-center" onClick={(ev) => onOwnerClick(ev)}>
                        <img className="owner-avatar" src={gig.owner.imgUrl} />
                        {gig.owner.fullname}
                    </div>
                </div>

                <span className={`owner-level flex align-center ${isTopRated ? "top-rated" : ""}`}>
                    <p>{isTopRated ? "Top rated" : `Level ${gig.owner.level}`}</p>
                    <span className="stars flex align-center">{levelStars}</span>
                </span>
            </div>

            <p className="gig-title">{gig.title}</p>

            <div className="rating-row flex align-center">
                <img src={starIcon} alt="star icon" />
                <span className="rate-num">{gig.owner.rate.toFixed(1)}</span>
                <span className="rate-count">({gig.owner.reviews})</span>
            </div>

            <div className="price-row flex align-center">
                <span className="price">From ${gig.price}</span>
            </div>
        </section>
    )
}

import { gigservice } from "../services/gig"
import { Link } from "react-router-dom"

export function GigPreview({ gig }) {

    const levelStars = gigservice.convertLvlToStars(gig.owner.level)
        .map((src, idx) => (
            <img key={idx} src={src} alt="star" className="star-img" />
        ))


    return (
        <Link to={`/categories/${gig._id}?category=${gig.category}`} className="gig-preview">
            {/* <img className="gig-img" src={mainImg} alt={gig.title} /> */}
            <img className="gig-img" src={gig.imgUrls[0]} alt={gig.title} />

            <div className="owner-row flex align-center justify-between">
                <div className="owner-details flex align-center">
                    <img className="owner-avatar" src={'/src/assets/img/ownerImg.jpg'} />
                    {/* <img className="owner-avatar" src={`https://api.dicebear.com/8.x/bottts/png?seed=${(gig.title)}`} /> */}
                    <span className="owner-name">{gig.owner.fullname}</span>
                </div>

                <span className="owner-level flex align-center">
                    <p>Level {gig.owner.level}</p>
                    <span className="stars flex align-center">{levelStars}</span>
                </span>
            </div>

            <p className="gig-title">{gig.title}</p>

            <div className="rating-row flex align-center">
                <span className="star">★</span>
                <span className="rate-num">{gig.owner.rate.toFixed(1)}</span>
                <span className="rate-count">({gig.reviews})</span>
            </div>

            <div className="price-row flex align-center">
                <span className="price">From ${gig.price}</span>
            </div>
        </Link>
    )
}


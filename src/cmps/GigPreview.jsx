
import { Link } from "react-router-dom"

export function GigPreview({ gig }) {
    const mainImg = 'src/assets/img/gigImg.jpg'

    return (
        <Link to={`/explore/${gig._id}`} className="gig-preview">
            {/* <img className="gig-img" src={mainImg} alt={gig.title} /> */}
            <img className="gig-img" src={gig.imgUrls[0]} alt={gig.title} />

            <div className="owner-row">
                <img className="owner-avatar" src={'src/assets/img/ownerImg.jpg'} />
                {/* <img className="owner-avatar" src={`https://api.dicebear.com/8.x/bottts/png?seed=${(gig.title)}`} /> */}

                <span className="owner-name">{gig.owner.fullname}</span>
            </div>

            <p className="gig-title">{gig.title}</p>

            <div className="rating-row">
                <span className="star">★</span>
                <span className="rate-num">{gig.owner.rate.toFixed(1)}</span>
                <span className="rate-count">({gig.reviews})</span>
            </div>

            <div className="price-row">
                <span>From </span>
                <span className="price">${gig.price}</span>
            </div>
        </Link>
    )
}


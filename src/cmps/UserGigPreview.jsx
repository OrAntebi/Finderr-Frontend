import { useNavigate } from "react-router";
import { formatTimestamp } from "../services/util.service";

export function UserGigPreview({ gig, onRemoveGig, isMobile }) {
    const navigate = useNavigate()

    return (
        <>
            {isMobile ? (
                <article className="gig-card" onClick={() => navigate(`/categories/${gig._id}`)}>
                    <img src={gig.imgUrls[0]} alt="gig image" />
                    <h3 className="gig-title">{gig.title}</h3>

                    <p className="gig-createdat">Added: {formatTimestamp(gig.createdAt)}</p>
                    <p className="gig-price">Price: ${gig.price}</p>

                    <div className="gig-actions">
                        <button className="btn-delete" onClick={ev => onRemoveGig(ev, gig._id)}>Delete</button>
                    </div>
                </article>
            ) : (
                <tr className="gig-row" onClick={() => navigate(`/categories/${gig._id}`)}>
                    <td className="image-cell">
                        <img src={gig.imgUrls[0]} alt="gig image" />
                    </td>
                    <td className="title-cell">{gig.title}</td>
                    <td className="createdat-cell">{formatTimestamp(gig.createdAt)}</td>
                    <td className="price-cell">${gig.price}</td>
                    <td className="impressions-cell">
                        <i className="fa-regular fa-eye icon" aria-hidden="true"></i>
                        {gig.impressions}
                    </td>
                    <td className="actions-cell">
                        <button className="btn-delete" onClick={ev => onRemoveGig(ev, gig._id)}>
                            <i className="fa-solid fa-trash action" aria-hidden="true"></i>
                        </button>
                    </td>
                </tr>
            )}
        </>
    );
}

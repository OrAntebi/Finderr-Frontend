// import { Link } from 'react-router-dom'

// export function GigPreview({ gig }) {
//     return (
//         <article className="preview">
//             <header>
//                 <Link to={`/gig/${gig._id}`}>{gig.vendor}</Link>
//             </header>

//             <p>Speed: <span>{gig.speed.toLocaleString()} Km/h</span></p>
//             {gig.owner && <p>Owner: <Link to={`/user/${gig.owner._id}`}>{gig.owner.fullname}</Link></p>}

//         </article>
//     )
// }

// export function GigPreview({ gig }) {
//     return (
//         <pre >
//             {JSON.stringify(gig, null, 2)}
//         </pre>
//     )
// }

// src/cmps/GigPreview.jsx
export function GigPreview({ gig }) {

    return (
        <article className="gig-preview">
            <img className="gig-img" src={gig.owner.imgUrl}  />

            <h4 className="gig-title">{gig.title}</h4>

            <section className="gig-footer">
                <div className="owner">
                    <img className="owner-img" src={gig.owner.imgUrl} />
                    <span>{gig.owner.fullname}</span>
                </div>

                <div className="price">From <span>${gig.price}</span></div>
            </section>
        </article>
    )
}

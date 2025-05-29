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

export function GigPreview({ gig }) {
    return (
        <pre >
            {JSON.stringify(gig, null, 2)}
        </pre>
    )
}
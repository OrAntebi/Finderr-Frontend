export function OwnerDetails({ owner, starSvg, ownerImg }) {
    return (
        <div className="owner-details flex align-center gap1rem">
            <img src={ownerImg} alt="owner image" />
            <div className="owner-info flex column">
                <div className="name-and-level flex align-center">
                    <h3>{owner.fullname}</h3>
                    <span className="level">Level {owner.level}</span>
                </div>
                <div className="rate flex align-center">
                    <div className="stars flex">
                        <span className="star">{starSvg}</span>
                        <span className="star">{starSvg}</span>
                        <span className="star">{starSvg}</span>
                        <span className="star">{starSvg}</span>
                        <span className="star">{starSvg}</span>
                    </div>
                    <span className="rating">{owner.rate}</span>
                </div>
            </div>
        </div>
    )
}
import { useNavigate } from 'react-router'
import { gigService } from '../services/gig'
import { setGigFilter } from '../store/gig/gig.actions'

export function NoGigsFound() {
    const navigate = useNavigate()

    function onBack() {
        setGigFilter(gigService.getDefaultFilter())
        navigate('/categories')
    }

    return (
        <section className="no-gigs-found flex column align-center justify-center">
            <h2>No gigs match your search</h2>
            <p>Try adjusting your filters or category and search again.</p>

            <button className="btn back-btn" onClick={onBack}>
                Back to Categories
            </button>

            <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/search_perseus/no-results-couch.0139585.png" alt="no gigs found" />
        </section>
    )
}
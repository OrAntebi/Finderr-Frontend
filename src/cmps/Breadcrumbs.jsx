import { useLocation, useSearchParams, Link } from 'react-router-dom'
import homeIcon from '../assets/img/home-icon.svg'
import { gigService } from '../services/gig'
import { setGigFilter } from '../store/gig/gig.actions'

export function BreadCrumbs() {
    const location = useLocation()
    const [searchParams] = useSearchParams()

    const isInCategories = location.pathname.startsWith('/categories')
    const category = searchParams.get('category')
    const categoryTitle = category ? gigService.getCategoryTitleFromPath(category) : null
    const isGigDetails = location.pathname.split('/').length === 3

    function resetFilter() {
        setGigFilter(gigService.getDefaultFilter())
    }

    if (!isInCategories) return null

    return (
        <nav className="breadcrumbs flex align-center">
            <Link to="/" className="breadcrumb-link item">
                <img src={homeIcon} alt="home" />
            </Link>

            <span className="breadcrumb-separator">/</span>
            <Link to="/categories" className="breadcrumb-link item" onClick={resetFilter}>
                Categories
            </Link>

            {isGigDetails && category && (
                <>
                    <span className="breadcrumb-separator">/</span>
                    <Link
                        to={`/categories?category=${category}`}
                        className="breadcrumb-link item"
                    >
                        {categoryTitle}
                    </Link>
                </>
            )}
        </nav>
    )
}

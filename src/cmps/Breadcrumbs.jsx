import { useLocation, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { gigservice } from '../services/gig'
import homeIcon from '../assets/img/home-icon.svg'
import { setGigFilter } from '../store/gig/gig.actions'

export function BreadCrumbs() {
    const pathnames = useLocation().pathname.split('/').filter(Boolean)
    const dispatch = useDispatch()

    function handleCategoriesClick(name) {
        if (name === 'categories') setGigFilter({ categories: [] })
        else setGigFilter({ categories: [name] })
    }

    return (
        <nav className="breadcrumbs flex align-center">
            <Link to="/" className="breadcrumb-link item">
                <img src={homeIcon} alt="home" />
            </Link>

            {pathnames.length > 0 && <span className="breadcrumb-separator">/</span>}

            {pathnames.map((name, idx) => {
                const isLast = idx === pathnames.length - 1
                const routeTo = '/' + pathnames.slice(0, idx + 1).join('/')
                const title = gigservice.getCategoryTitleFromPath(name)

                return (
                    <>
                        <span key={routeTo} className="flex align-center">
                            {isLast ? (
                                <span className="breadcrumb-current item">{title}</span>
                            ) : (
                                <Link
                                    to={routeTo}
                                    className="breadcrumb-link item"
                                    onClick={() => handleCategoriesClick(name)}
                                >
                                    {title}
                                </Link>
                            )}
                        </span>
                        {!isLast && <span className="breadcrumb-separator">/</span>}
                    </>
                )
            })}
        </nav>
    )
}

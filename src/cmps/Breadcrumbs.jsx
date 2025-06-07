import homeIcon from '../assets/img/home-icon.svg'


export function Breadcrumbs({ category }) {
    return (
        <nav className="breadcrumbs-container">
            <ol className="breadcrumbs-list flex align-center">
                <li><img src={homeIcon} alt="home" /></li>
                <li>/</li>
                <li>{category}</li>
            </ol>
        </nav>
    )
}
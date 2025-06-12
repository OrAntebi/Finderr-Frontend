import { NavLink } from 'react-router-dom'
import siteLogo from '../assets/img/site-logo1.svg'

export default function SiteLogo() {
    return (
        <NavLink to="/">
            <img src={siteLogo} alt="logo" className="site-logo" />
        </NavLink>
    )
}

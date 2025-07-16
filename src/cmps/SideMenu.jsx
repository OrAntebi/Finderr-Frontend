import { NavLink, useNavigate } from 'react-router-dom'
import menu from '../assets/img/menu.svg'
import UserAvatar from './UserAvatar.jsx'

export default function SideMenu({ user, onLogout, onMenuClick }) {
    const navigate = useNavigate()

    function handleUserClick(ev) {
        ev.stopPropagation()
        onMenuClick()
        navigate(`/user/${user._id}`)
    }

    return (
        <>
            <img src={menu} alt="menu" className="menu-icon" onClick={onMenuClick} />
            <section className="side-menu-container">
                <ul className="side-menu">
                    {user ? (
                        <>
                            <li className="user-info flex align-center">
                                <UserAvatar
                                    user={user}
                                    onAvatarClick={handleUserClick}
                                    size={{ width: 54, height: 54 }}
                                    fontSize="1.5rem"
                                />
                                <p className="user-full-name" onClick={handleUserClick}>{user.fullname}</p>
                            </li>

                        </>
                    ) : (
                        <>
                            <li>
                                <NavLink to="/login/signup" className="join-link main-nav-link" onClick={onMenuClick}>
                                    Join Finderr
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/login" className="login-link main-nav-link" onClick={onMenuClick}>
                                    Sign in
                                </NavLink>
                            </li>
                        </>
                    )}
                    <li>
                        <NavLink to="/categories" className="main-nav-link" onClick={onMenuClick}>Explore</NavLink>
                    </li>

                    {user && (
                        <>
                            <li>
                                <NavLink to={`/user/${user._id}/addGig`} className="main-nav-link" onClick={onMenuClick}>Add Gig</NavLink>
                            </li>
                            <li>
                                <NavLink to={`/user/orders`} className="main-nav-link" onClick={onMenuClick}>Orders</NavLink>
                            </li>
                            <li>
                                <a className="main-nav-link" onClick={onLogout}>Logout</a>
                            </li>
                        </>
                    )}
                </ul>
            </section>
            <div className="side-menu-overlay" onClick={onMenuClick}></div>
        </>
    )
}

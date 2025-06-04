import { NavLink, useNavigate } from 'react-router-dom'
import menu from '../assets/img/menu.svg'
import UserAvatar from './UserAvatar.jsx'

export default function SideMenu({ user, onMenuClick }) {
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
                        <li className="user-info flex align-center">
                            <UserAvatar
                                imgUrl={user.imgUrl}
                                userName={user.fullname}
                                onAvatarClick={handleUserClick}
                                size={{ width: 54, height: 54 }}
                            />
                            <p className="user-full-name" onClick={handleUserClick}>{user.fullname}</p>
                        </li>
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
                        <NavLink to="/about" className="main-nav-link" onClick={onMenuClick}>About</NavLink>
                    </li>
                    <li>
                        <NavLink to="/explore" className="main-nav-link" onClick={onMenuClick}>Explore</NavLink>
                    </li>
                </ul>
            </section>
            <div className="side-menu-overlay" onClick={onMenuClick}></div>
        </>
    )
}

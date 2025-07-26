import { NavLink } from "react-router-dom"
import notificationsIcon from "../../assets/img/notifications-icon.svg"
import messagesIcon from "../../assets/img/messages-icon.svg"
import likesIcon from "../../assets/img/heart-icon.svg"
import UserAvatar from "../UserAvatar.jsx"
import DropdownMenu from "../DropdownMenu.jsx"
import SiteLogo from "../SiteLogo.jsx"
import SearchInput from "../SearchInput.jsx"
import SideMenu from "../SideMenu.jsx"
import { useDispatch } from "react-redux"
import { OPEN_LOGIN_MODAL } from '../../store/system.reducer'

export function DynamicHeader({ screenWidth, ...props }) {
    const { user } = props

    if (screenWidth < 664) return <MobileHeader {...props} user={user} />
    if (screenWidth < 964) return <NarrowHeader {...props} user={user} />
    return <NormalHeader {...props} user={user} />
}

function MobileHeader({ user, onLogout, onMenuClick, currentPage, onSearch }) {
    const dispatch = useDispatch()

    return (
        <header className={`app-header main-container full ${currentPage === "/" ? "home-page-shown" : ""}`}>
            <section className="app-header-container flex align-center justify-between">
                <SideMenu user={user} onLogout={onLogout} onMenuClick={onMenuClick} />
                <SiteLogo />
                {!user ?
                    <button onClick={() => dispatch({ type: OPEN_LOGIN_MODAL })} className="join-link main-nav-link">Join</button>
                    : <div className="spacer"></div>}
            </section>
            {currentPage.startsWith('/categories') && <SearchInput submitBtn={false} placeholderText="Find services" onSearch={onSearch} backdropOnFocus={true} />}
        </header>
    )
}

function NarrowHeader({ user, onLogout, dropdownOpen, toggleDropdown, closeDropdown, onMenuClick, currentPage, onSearch }) {
    const dispatch = useDispatch()

    return (
        <header className={`app-header main-container full ${currentPage === "/" ? "home-page-shown" : ""}`}>
            <section className="app-header-container flex align-center justify-between">
                <section className="flex align-center justify-between">
                    <SideMenu user={user} onMenuClick={onMenuClick} />
                    <SiteLogo />
                </section>
                {currentPage.startsWith('/categories') && <SearchInput submitBtn={false} onSearch={onSearch} backdropOnFocus={true} />}
                <nav>
                    {user ? (
                        <>
                            <UserAvatar user={user} onAvatarClick={(ev) => { ev.stopPropagation(); toggleDropdown('avatar') }} />
                            <DropdownMenu
                                isOpen={dropdownOpen.avatar}
                                onClose={() => closeDropdown('avatar')}
                                items={[
                                    { type: 'link', to: `/user/${user._id}`, label: 'Profile' },
                                    { type: 'link', to: `/user/${user._id}/addGig`, label: 'Add Gig' },
                                    { type: 'button', onClick: onLogout, label: 'Logout' }
                                ]}
                                className="avatar-menu"
                            />
                        </>
                    ) : (
                        <>
                            <button onClick={() => dispatch({ type: OPEN_LOGIN_MODAL })} className="login-link main-nav-link">Sign in</button>
                            <button onClick={() => dispatch({ type: OPEN_LOGIN_MODAL })} className="join-link main-nav-link">Join</button>
                        </>
                    )}
                </nav>
            </section>
        </header>
    )
}

function NormalHeader({ user, onLogout, dropdownOpen, toggleDropdown, closeDropdown, currentPage, onSearch }) {
    const dispatch = useDispatch()
    
    return (
        <header className={`app-header main-container full ${currentPage === "/" ? "home-page-shown" : ""}`}>
            <section className="app-header-container flex align-center justify-between">
                <SiteLogo />
                {currentPage.startsWith('/categories') && <SearchInput onSearch={onSearch} backdropOnFocus={true} />}
                <nav>
                    <NavLink to="/categories" className="main-nav-link">Explore</NavLink>
                    {user ? (
                        <>
                            <div className="dropdown-wrapper flex">
                                <button onClick={(ev) => { ev.stopPropagation(); toggleDropdown('notifications') }}>
                                    <img src={notificationsIcon} alt="notifications icon" />
                                </button>
                                <DropdownMenu
                                    isOpen={dropdownOpen.notifications}
                                    onClose={() => closeDropdown('notifications')}
                                    items={[{ type: 'link', to: '/notifications', label: 'All Notifications' }]}
                                    className="notifications-menu"
                                />
                            </div>

                            <div className="dropdown-wrapper flex">
                                <button onClick={(ev) => { ev.stopPropagation(); toggleDropdown('messages') }}>
                                    <img src={messagesIcon} alt="messages icon" />
                                </button>
                                <DropdownMenu
                                    isOpen={dropdownOpen.messages}
                                    onClose={() => closeDropdown('messages')}
                                    items={[{ type: 'link', to: '/messages', label: 'View Messages' }]}
                                    className="messages-menu"
                                />
                            </div>

                            <div className="dropdown-wrapper flex">
                                <button onClick={(ev) => { ev.stopPropagation(); toggleDropdown('likes') }}>
                                    <img src={likesIcon} alt="likes icon" />
                                </button>
                                <DropdownMenu
                                    isOpen={dropdownOpen.likes}
                                    onClose={() => closeDropdown('likes')}
                                    items={[{ type: 'link', to: '/likes', label: 'Your Likes' }]}
                                    className="likes-menu"
                                />
                            </div>

                            <div className="dropdown-wrapper flex">
                                <button onClick={(ev) => { ev.stopPropagation(); toggleDropdown('orders') }}>Orders</button>
                                <DropdownMenu
                                    isOpen={dropdownOpen.orders}
                                    onClose={() => closeDropdown('orders')}
                                    items={[{ type: 'link', to: `/user/orders`, label: 'Your Orders' }]}
                                    className="orders-menu"
                                />
                            </div>

                            <div className="dropdown-wrapper flex">
                                <UserAvatar user={user} onAvatarClick={(ev) => { ev.stopPropagation(); toggleDropdown('avatar') }} />
                                <DropdownMenu
                                    isOpen={dropdownOpen.avatar}
                                    onClose={() => closeDropdown('avatar')}
                                    items={[
                                        { type: 'link', to: `/user/${user._id}`, label: 'Profile' },
                                        { type: 'link', to: `/user/${user._id}/addGig`, label: 'Add Gig' },
                                        { type: 'button', onClick: onLogout, label: 'Logout' }
                                    ]}
                                    className="avatar-menu"
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <button onClick={() => dispatch({ type: OPEN_LOGIN_MODAL })} className="login-link main-nav-link">Sign in</button>
                            <button onClick={() => dispatch({ type: OPEN_LOGIN_MODAL })} className="join-link main-nav-link">Join</button>
                        </>
                    )}
                </nav>
            </section>
        </header>
    )
}
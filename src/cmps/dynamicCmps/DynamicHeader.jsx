import { Link, NavLink } from "react-router-dom"
import siteLogo from "../../assets/img/site-logo.svg"
import menu from "../../assets/img/menu.svg"
import alertsIcon from "../../assets/img/alerts-icon.svg"
import notificationIcon from "../../assets/img/notifications-icon.svg"
import likesIcon from "../../assets/img/heart-icon.svg"
import submitIcon from "../../assets/img/submit-icon.svg"

export function DynamicHeader({ screenSize, ...props }) {
    const { user } = props
    console.log("screenSize:", screenSize)
    const isMobileSize = screenSize < 632
    const isNarrowSize = screenSize >= 632 && screenSize < 932
    const isNormalSize = screenSize >= 932

    if (isMobileSize) return <MobileHeader loggedIn={!!user} {...props} />
    if (isNarrowSize) return <NarrowHeader loggedIn={!!user} {...props} />
    if (isNormalSize) return <RegularHeader loggedIn={!!user} {...props} />
    return null
}

function MenuButton({ onMenuClick }) {
    return (
        <>
            <img src={menu} alt="menu" className="menu-icon" onClick={onMenuClick} />
            <section className="side-menu-container">
                <ul className="side-menu">
                    <li><NavLink to="/login/signup" className="join-link main-nav-link" onClick={onMenuClick}>Join Finderr</NavLink></li>
                    <li><NavLink to="/login" className="login-link main-nav-link" onClick={onMenuClick}>Sign in</NavLink></li>
                    <li><NavLink to="/about" className="main-nav-link" onClick={onMenuClick}>About</NavLink></li>
                    <li><NavLink to="/explore" className="main-nav-link" onClick={onMenuClick}>Explore</NavLink></li>
                </ul>
            </section>
            <div className="side-menu-overlay" onClick={onMenuClick}></div>
        </>
    )
}

function SiteLogo() {
    return (
        <NavLink to="/">
            <img src={siteLogo} alt="logo" className="site-logo" />
        </NavLink>
    )
}

function SearchInput() {
    return (
        <form className="search-bar-container flex">
            <input type="search" className="search-bar" placeholder="What service are you looking for today?" />
            <button type="submit" className="search-btn">
                <img src={submitIcon} alt="search icon" />
            </button>
        </form>
    )
}

function AvatarMenu({ user, avatarMenuIsOpen, onLogout }) {
    return (
        <ul className={`avatar-menu ${avatarMenuIsOpen ? "open" : ""}`}>
            <li><Link to={`user/${user._id}`}>Profile</Link></li>
            <li><button onClick={onLogout}>Logout</button></li>
        </ul>
    )
}

function AvatarButton({ user, onClick }) {
    return (
        <button className="user-avatar-btn" onClick={onClick}>
            {user.imgUrl ? <img src={user.imgUrl} alt="avatar img" /> : <span>{user.fullname.charAt(0)}</span>}
        </button>
    )
}

function MobileHeader({ loggedIn, user, onLogout, onAvatarClick, avatarMenuIsOpen, onMenuClick, currentPage }) {
    return (
        <header className={`app-header main-container full ${currentPage === "/" ? "home-page-shown" : ""}`}>
            <section className="app-header-container flex align-center justify-between">
                <MenuButton onMenuClick={onMenuClick} />
                <SiteLogo />

                {loggedIn ? (
                    <>
                        {currentPage === "/explore" && <SearchInput />}
                        <nav>
                            <AvatarButton user={user} onClick={onAvatarClick} />
                            <AvatarMenu user={user} avatarMenuIsOpen={avatarMenuIsOpen} onLogout={onLogout} />
                        </nav>
                    </>
                ) : (
                    <nav>
                        <NavLink to="login/signup" className="join-link main-nav-link">Join</NavLink>
                    </nav>
                )}
            </section>
        </header>
    )
}

function NarrowHeader({ loggedIn, user, onLogout, onAvatarClick, avatarMenuIsOpen, onMenuClick, currentPage }) {
    return (
        <header className={`app-header main-container full ${currentPage === "/" ? "home-page-shown" : ""}`}>
            <section className="app-header-container flex align-center justify-between">
                <section className="flex align-center justify-between">
                    <MenuButton onMenuClick={onMenuClick} />
                    <SiteLogo />
                </section>

                {currentPage === "/explore" && <SearchInput />}

                <nav>
                    {loggedIn ? (
                        <>
                            <AvatarButton user={user} onClick={onAvatarClick} />
                            <AvatarMenu user={user} avatarMenuIsOpen={avatarMenuIsOpen} onLogout={onLogout} />
                        </>
                    ) : (
                        <>
                            <NavLink to="login" className="login-link main-nav-link">Sign in</NavLink>
                            <NavLink to="login/signup" className="join-link main-nav-link">Join</NavLink>
                        </>
                    )}
                </nav>
            </section>
        </header>
    )
}

function RegularHeader({ loggedIn, user, onLogout, onAvatarClick, avatarMenuIsOpen, currentPage }) {
    return (
        <header className={`app-header main-container full ${currentPage === "/" ? "home-page-shown" : ""}`}>
            <section className="app-header-container flex align-center justify-between">
                <SiteLogo />
                {currentPage === "/explore" && <SearchInput />}
                <nav>
                    <NavLink to="/about" className="main-nav-link">About</NavLink>
                    <NavLink to="/explore" className="main-nav-link">Explore</NavLink>

                    {loggedIn ? (
                        <>
                            <button><img src={alertsIcon} alt="alerts icon" /></button>
                            <button><img src={notificationIcon} alt="notification icon" /></button>
                            <button><img src={likesIcon} alt="likes icon" /></button>
                            <AvatarButton user={user} onClick={onAvatarClick} />
                            <AvatarMenu user={user} avatarMenuIsOpen={avatarMenuIsOpen} onLogout={onLogout} />
                        </>
                    ) : (
                        <>
                            <NavLink to="login" className="login-link main-nav-link">Sign in</NavLink>
                            <NavLink to="login/signup" className="join-link main-nav-link">Join</NavLink>
                        </>
                    )}
                </nav>
            </section>
        </header>
    )
}
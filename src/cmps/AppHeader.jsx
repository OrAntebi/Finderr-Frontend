import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { logout } from '../store/user/user.actions'
import { useScreenSize } from '../customHooks/useScreenSize'
import { DynamicHeader } from './dynamicCmps/DynamicHeader.jsx'
import { CategoriesList } from './CategoriesList.jsx'
import { setGigFilter } from '../store/gig/gig.actions'

export function AppHeader({ onSearch }) {
    const user = useSelector(storeState => storeState.userModule.user)
    const screenWidth = useScreenSize()
    const [menuIsOpen, setMenuIsOpen] = useState(false)
    const [dropdownOpen, setDropdownOpen] = useState({
        notifications: false,
        messages: false,
        likes: false,
        avatar: false,
        orders: false,
    })
    const currentPage = useLocation().pathname
    const navigate = useNavigate()

    async function onLogout() {
        try {
            await logout()
            navigate('/')
            showSuccessMsg(`Bye now`)
        } catch (err) {
            showErrorMsg('Cannot logout')
        }
    }

    function onMenuClick() {
        setMenuIsOpen(prev => !prev)
        document.querySelector('.app-header').classList.toggle('menu-shown', !menuIsOpen)

        setTimeout(() => {
            document.querySelector('.app-header').classList.toggle('menu-shown', !menuIsOpen)
        }, 0)
    }

    function toggleDropdown(name) {
        setDropdownOpen(prev => ({ ...prev, [name]: !prev[name] }))
    }

    function closeDropdown(name) {
        setDropdownOpen(prev => ({ ...prev, [name]: false }))
    }

    return (
        <>
            <DynamicHeader
                screenWidth={screenWidth}
                user={user}
                onLogout={onLogout}
                onMenuClick={onMenuClick}
                toggleDropdown={toggleDropdown}
                closeDropdown={closeDropdown}
                dropdownOpen={dropdownOpen}
                currentPage={currentPage}
                onSearch={onSearch}
            />
            <CategoriesList />
        </>
    )
}

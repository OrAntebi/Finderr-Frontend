import { useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { logout } from '../store/user/user.actions'
import { useScreenSize } from '../customHooks/useScreenSize'
import { DynamicHeader } from './dynamicCmps/DynamicHeader.jsx'
import { CategoriesList } from './CategoriesList.jsx'

export function AppHeader({ onSearch }) {
    const user = useSelector(storeState => storeState.userModule.user)
    const screenWidth = useScreenSize()
    const [dropdownOpen, setDropdownOpen] = useState({
        notifications: false,
        messages: false,
        likes: false,
        avatar: false,
        orders: false,
    })
    const currentPage = useLocation().pathname
    const navigate = useNavigate()
    const appHeaderRef = useRef(null)

    async function onLogout() {
        try {
            await logout()
            navigate('/')
            showSuccessMsg(`Logged out successfully`)
        } catch (err) {
            console.error('Logout error:', err)
            showErrorMsg('Cannot logout')
        }
    }

    function onMenuClick() {
        if (!appHeaderRef.current) return

        const el = appHeaderRef.current
        const isOpen = el.classList.contains('menu-shown')

        el.classList.toggle('menu-shown', !isOpen)
        setTimeout(() => {
            el.classList.toggle('menu-shown', !isOpen)
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
                appHeaderRef={appHeaderRef}
            />
            <CategoriesList />
        </>
    )
}

import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { logout } from '../store/user/user.actions'
import { useScreenSize } from '../customHooks/useScreenSize'
import { DynamicHeader } from './dynamicCmps/DynamicHeader.jsx'

export function AppHeader() {
    const user = useSelector(storeState => storeState.userModule.user)
    const screenWidth = useScreenSize()
    const [menuIsOpen, setMenuIsOpen] = useState(false)
    const [avatarMenuIsOpen, setAvatarMenuIsOpen] = useState(false)
    const navigate = useNavigate()
    const currentPage = useLocation().pathname

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

    function onAvatarClick() {
        setAvatarMenuIsOpen(prev => !prev)
    }
    console.log(currentPage)
    return (
        <DynamicHeader
            screenSize={screenWidth}
            user={user}
            onLogout={onLogout}
            onMenuClick={onMenuClick}
            onAvatarClick={onAvatarClick}
            avatarMenuIsOpen={avatarMenuIsOpen}
            currentPage={currentPage}
        />
    )
}

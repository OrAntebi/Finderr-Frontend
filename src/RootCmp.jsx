import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router'

import { gigService } from './services/gig'
import { userService } from './services/user'
import { HomePage } from './pages/HomePage'
import { GigIndex } from './pages/GigIndex.jsx'
import { ReviewIndex } from './pages/ReviewIndex.jsx'
import { ChatApp } from './pages/Chat.jsx'
import { AdminIndex } from './pages/AdminIndex.jsx'

import { GigDetails } from './pages/GigDetails'
import { UserDetails } from './pages/UserDetails'
import { UserOrders } from './pages/UserOrders'

import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
import { UserMsg } from './cmps/UserMsg.jsx'
import { LoginSignup } from './pages/LoginSignup.jsx'
import { Login } from './pages/Login.jsx'
import { Signup } from './pages/Signup.jsx'

import { setGigFilter } from './store/gig/gig.actions.js'
import { useCallback } from 'react'
import { Checkout } from './pages/Checkout.jsx'


export function RootCmp() {
    const currentPage = useLocation().pathname
    const navigate = useNavigate()

    const handleSearch = useCallback((rawQuery) => {
        const searchQuery = rawQuery.trim()
        if (!searchQuery) return

        setGigFilter({ ...gigService.getDefaultFilter(), txt: searchQuery, Category: '' })

        const params = new URLSearchParams({ query: searchQuery })
        navigate({ pathname: '/categories', search: `?${params.toString()}` })
    }, [navigate])

    return (
        <>
            <AppHeader onSearch={handleSearch} />
            <UserMsg />

            <main className={`main-content main-container full ${currentPage.startsWith("/categories") ? 'categories-page-shown' : ''}`}>
                <Routes>
                    <Route path="" element={<HomePage onSearch={handleSearch} />} />
                    <Route path="categories" element={<GigIndex />} />
                    <Route path="categories/:gigId" element={<GigDetails />} />
                    <Route path="checkout/:gigId/:packageName" element={<Checkout />} />
                    <Route path="user/:id" element={<UserDetails />} />
                    <Route path="user/:id/orders" element={<UserOrders />} />
                    <Route path="review" element={<ReviewIndex />} />
                    <Route path="chat" element={<ChatApp />} />
                    <Route path="admin" element={
                        <AuthGuard checkAdmin={true}>
                            <AdminIndex />
                        </AuthGuard>
                    } />
                    <Route path="login" element={<LoginSignup />}>
                        <Route index element={<Login />} />
                        <Route path="signup" element={<Signup />} />
                    </Route>
                </Routes>
            </main>
            <AppFooter />
        </>
    )
}

function AuthGuard({ children, checkAdmin = false }) {
    const user = userService.getLoggedinUser()
    const isNotAllowed = !user || (checkAdmin && !user.isAdmin)
    if (isNotAllowed) {
        console.log('Not Authenticated!')
        return <Navigate to="/" />
    }
    return children
}

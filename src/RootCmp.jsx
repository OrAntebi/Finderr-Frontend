import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router'

import { gigService } from './services/gig'
import { userService } from './services/user'
import { HomePage } from './pages/HomePage'
import { GigIndex } from './pages/GigIndex.jsx'
import { useSelector } from 'react-redux'
import { SigninSignupModal } from './cmps/SigninSignupModal.jsx'

import { GigDetails } from './pages/GigDetails'
import { UserIndex } from './pages/UserIndex'
import { UserOrders } from './pages/UserOrders'
import { PolicyAndTerms } from './pages/PolicyAndTerms.jsx'

import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
import { UserMsg } from './cmps/UserMsg.jsx'
import { LoginSignup } from './pages/LoginSignup.jsx'
import { Login } from './pages/Login.jsx'
import { Signup } from './pages/Signup.jsx'

import { setGigFilter } from './store/gig/gig.actions.js'
import { useCallback } from 'react'
import { Checkout } from './pages/Checkout.jsx'
import { Backdrop } from './cmps/Backdrop.jsx'
import { AddGig } from './pages/AddGig.jsx'
import { AddReview } from './pages/AddReview.jsx'
import { socketService, SOCKET_EVENT_ORDER_RECEIVED } from './services/socket.service'
import { showSuccessMsg } from './services/event-bus.service'
import { useEffect } from 'react'


export function RootCmp() {
    const loggedInUser = useSelector(state => state.userModule.user)

    useEffect(() => {
        if (loggedInUser) {
            socketService.emit('set-user-socket', loggedInUser._id)
            socketService.on(SOCKET_EVENT_ORDER_RECEIVED, (data) => {
                showSuccessMsg(data.message)
            })
        }

        return () => {
            socketService.off(SOCKET_EVENT_ORDER_RECEIVED)
        }
    }, [loggedInUser])
    const currentPage = useLocation().pathname
    const currentPageClass = currentPageToClass(currentPage)
    const navigate = useNavigate()

    const handleSearch = useCallback((rawQuery) => {
        const searchQuery = rawQuery.trim()
        if (!searchQuery) return

        setGigFilter({ ...gigService.getDefaultFilter(), txt: searchQuery, category: '' })

        const params = new URLSearchParams({ query: searchQuery })
        navigate({ pathname: '/categories', search: `?${params.toString()}` })
    }, [navigate])

    return (
        <>
            <AppHeader onSearch={handleSearch} />
            <UserMsg />

            <main className={`main-content main-container full ${currentPageClass}`}>
                <Routes>
                    <Route path="/" element={<HomePage onSearch={handleSearch} />} />
                    <Route path="categories" element={<GigIndex />} />
                    <Route path="categories/:gigId" element={<GigDetails />} />
                    <Route path="checkout/:gigId/:packageType" element={<Checkout />} />
                    <Route path="user/:id" element={<UserIndex />} />
                    <Route path="user/:id/addGig" element={
                        <AuthGuard>
                            <AddGig />
                        </AuthGuard>
                    }
                    />
                    <Route path="user/orders" element={<UserOrders />} />
                    <Route path="review/:orderId" element={<AddReview />} />
                    <Route path="login" element={<LoginSignup />}>
                        <Route index element={<Login />} />
                        <Route path="signup" element={<Signup />} />
                    </Route>
                    <Route path="policy" element={<PolicyAndTerms />} />
                </Routes>
            </main>

            <Backdrop />
            <SigninSignupModal />

            <AppFooter />
        </>
    )
}

function AuthGuard({ children }) {
    const user = userService.getLoggedinUser()

    if (!user) {
        console.log('Not Authenticated!')
        return <Navigate to="/" />
    }
    return children
}


function currentPageToClass(pathname) {
    const rules = [
        { re: /^\/categories/, className: 'categories-page-shown' },
        { re: /\/addGig$/, className: 'add-gig-page-shown' },
    ];

    const match = rules.find(({ re }) => re.test(pathname));
    return match ? match.className : '';
}
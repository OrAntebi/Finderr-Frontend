import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { capitalizeName, getFacebookLoginUrl } from '../services/util.service'
import { useDispatch, useSelector } from 'react-redux'
import { CLOSE_LOGIN_MODAL, OPEN_LOGIN_MODAL } from '../store/system.reducer'
import { useScreenSize } from '../customHooks/useScreenSize'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { login, loginWithGoogle, signup, loginWithFacebook, loadQuickLoginUsers, quickLogin } from '../store/user/user.actions'

import loginImage from '../assets/img/login-logup-modal.png'
import siteLogo from '../assets/img/site-logo.svg'
import xIcon from '../assets/img/x-icon.svg'
import googleIcon from '../assets/img/google-icon.svg'
import emailIcon from '../assets/img/email-icon.svg'
import facebookIcon from '../assets/img/facebook-v2-icon.svg'
import arrowBackIcon from '../assets/img/arrow-back-icon.svg'
import showPassIcon from '../assets/img/show-pass.svg'
import hidePassIcon from '../assets/img/hide-pass.svg'
import usersIcon from '../assets/img/users-icon.svg'
import checkIcon from '../assets/img/check-icon-4.svg'

export function SigninSignupModal() {
    const modalIsOpen = useSelector((state) => state.systemModule.loginModal.isOpen)
    const modalContent = useSelector((state) => state.systemModule.loginModal.content)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [selectedUser, setSelectedUser] = useState('')
    const [quickLoginUsers, setQuickLoginUsers] = useState([])

    const screenSize = useScreenSize()
    const isMobile = screenSize < 964
    const dispatch = useDispatch()

    const isAuthFlow = modalContent === 'signin' || modalContent === 'signup'
    const isEmailSignin = modalContent === 'email-signin'
    const isEmailSignup = modalContent === 'email-signup'
    const isFastSignin = modalContent === 'fast-signin'

    function openModalContent(content) {
        dispatch({ type: OPEN_LOGIN_MODAL, modalContent: content })
    }

    useEffect(() => {
        if (modalIsOpen) {
            setUsername('')
            setPassword('')
            setShowPassword(false)
            setSelectedUser('')
        }
    }, [modalIsOpen])

    useEffect(() => {
        if (window.google) {
            window.google.accounts.id.initialize({
                client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
                callback: onGoogleLogin
            })
        }
    }, [])

    useEffect(() => {
        if (modalIsOpen && isFastSignin) {
            loadQuickLoginUsersData()
        }
    }, [modalIsOpen, isFastSignin])

    async function loadQuickLoginUsersData() {
        try {
            const quickUsers = await loadQuickLoginUsers()
            setQuickLoginUsers(quickUsers)
        } catch (err) {
            console.error('Failed to load quick login users:', err)
            setQuickLoginUsers([])
        }
    }

    useEffect(() => {
        function handleFacebookMessage(event) {
            if (event.origin !== window.location.origin) return
            const { type, accessToken, error } = event.data

            if (type === 'facebook-auth') {
                if (error) {
                    showErrorMsg('Facebook authentication failed')
                } else if (accessToken) {
                    loginWithFacebook(accessToken)
                        .then((user) => {
                            const displayName = user.fullname || user.username || 'User'
                            showSuccessMsg(`Welcome ${displayName}`)
                        })
                        .catch(() => showErrorMsg('Facebook login failed'))
                }
            }
        }

        window.addEventListener('message', handleFacebookMessage)

        return () => {
            window.removeEventListener('message', handleFacebookMessage)
        }
    }, [])

    async function onGoogleLogin(response) {
        try {
            const user = await loginWithGoogle(response.credential)
            const displayName = user.fullname || user.username || 'User'
            showSuccessMsg(`Welcome ${displayName}`)
        } catch (err) {
            showErrorMsg('Google login failed')
        }
    }

    function onFacebookLogin() {
        try {
            const fbLoginUrl = getFacebookLoginUrl()
            const popup = window.open(
                fbLoginUrl,
                'facebook-login',
                'width=600,height=600,scrollbars=yes,resizable=yes'
            )
            if (!popup) throw new Error('Popup blocked!')

            const checkClosed = setInterval(() => {
                if (popup.closed) clearInterval(checkClosed)
            }, 1000)
        } catch (err) {
            alert(err.message)
        }
    }

    function onCloseModal() {
        dispatch({ type: CLOSE_LOGIN_MODAL })
    }

    async function handleFastSignin(selectedUsername) {
        try {
            const user = await quickLogin(selectedUsername)
            const selectedUser = quickLoginUsers.find(u => u.username === selectedUsername)
            const displayName = selectedUser?.fullname || user.fullname || selectedUsername
            showSuccessMsg(`Welcome back ${capitalizeName(displayName)}!`)
            // Modal will be closed by the quickLogin action
        } catch (err) {
            console.error('Fast signin error:', err)
            showErrorMsg('Fast signin failed. Please try again.')
        }
    }

    async function handleSubmit(event) {
        event.preventDefault()

        if (!username || !password) {
            showErrorMsg('Please fill in all fields')
            return
        }

        try {
            const fullname = username.includes('@') ? username.split('@')[0] : username

            if (isEmailSignin) {
                const user = await login({ username, password })
                showSuccessMsg(`Welcome back ${capitalizeName(user.fullname || fullname)}!`)
            }

            if (isEmailSignup) {
                const user = await signup({ username, password, fullname })
                showSuccessMsg(`Welcome ${capitalizeName(user.fullname || fullname)}!`)
            }

            dispatch({ type: CLOSE_LOGIN_MODAL })

        } catch (err) {
            let errorMessage = 'An error occurred. Please try again.'

            if (err.response?.data?.err) {
                errorMessage = err.response.data.err
            } else if (err.message) {
                errorMessage = err.message
            } else if (isEmailSignin) {
                errorMessage = 'Login failed. Please check your credentials.'
            } else {
                errorMessage = 'Signup failed. Please try again.'
            }

            showErrorMsg(errorMessage)
        }
    }

    return (
        <>
            <article className={`signin-signup-modal ${modalIsOpen ? 'open' : ''} ${modalContent}`}>
                <section className="modal-content">
                    <header className="flex align-center justify-between">
                        {(isEmailSignin || isEmailSignup || isFastSignin) && (
                            <button className="back-btn flex align-center" onClick={() => openModalContent('signin')}>
                                <img src={arrowBackIcon} alt="back" className="back-icon" />
                                {!isMobile && <span>Back</span>}
                            </button>
                        )}

                        {isMobile && (
                            <>
                                <img src={siteLogo} alt="logo" className="logo" />
                                <button className="close-modal-btn" onClick={onCloseModal}>
                                    <img src={xIcon} alt="Close modal" />
                                </button>
                            </>
                        )}
                    </header>

                    <main className="flex column">
                        <header className="flex column">
                            {isMobile && isAuthFlow ? (
                                <h2 className="title">
                                    Success&nbsp;<span>starts</span><br />here.
                                </h2>
                            ) : (
                                <h2 className="title">
                                    {modalContent === 'signin' && 'Sign in to your account'}
                                    {modalContent === 'signup' && 'Create a new account'}
                                    {modalContent === 'email-signin' && 'Continue with your email or username'}
                                    {modalContent === 'email-signup' && 'Continue with your email'}
                                    {modalContent === 'fast-signin' && 'Continue with demo user'}
                                </h2>
                            )}

                            {isAuthFlow && (
                                <p className="subtitle">
                                    {modalContent === 'signin' ? (
                                        <>
                                            Don’t have an account?&nbsp;
                                            <span className="link" onClick={() => openModalContent('signup')}>Join here</span>
                                        </>
                                    ) : (
                                        <>
                                            Already have an account?&nbsp;
                                            <span className="link" onClick={() => openModalContent('signin')}>Sign in</span>
                                        </>
                                    )}
                                </p>
                            )}
                        </header>

                        {isAuthFlow && (
                            <main className="login-options flex column">
                                <button className="users-btn btn flex align-center justify-between"
                                    onClick={() => openModalContent('fast-signin')}>
                                    <img src={usersIcon} alt="users icon" />
                                    <p>Continue with demo user</p>
                                </button>

                                <button className="email-btn btn flex align-center justify-between"
                                    onClick={() => openModalContent(modalContent === 'signin' ? 'email-signin' : 'email-signup')}>
                                    <img src={emailIcon} alt="email icon" />
                                    <p>Continue with email{modalContent === 'signin' ? '/username' : ''}</p>
                                </button>

                                <section className="or-section flex align-center">
                                    <div className="divider"></div>
                                    <p className="or">or</p>
                                    <div className="divider"></div>
                                </section>

                                <section className="google-facebook-section flex align-center justify-between">
                                    <button id="googleBtn" className="google-btn btn flex align-center justify-between" onClick={() => window.google?.accounts.id.prompt()}>
                                        <img src={googleIcon} alt="Google icon" />
                                        <p>Google</p>
                                    </button>

                                    <button className="facebook-btn btn flex align-center justify-between" onClick={onFacebookLogin}>
                                        <img src={facebookIcon} alt="facebook icon" />
                                        <p>Facebook</p>
                                    </button>
                                </section>
                            </main>
                        )}

                        {(isEmailSignin || isEmailSignup) && (
                            <main className={`${isEmailSignin ? 'signin-form' : 'signup-form'} flex column`}>
                                <form className="flex column" onSubmit={handleSubmit}>
                                    <label className="email-label flex column">
                                        <span>{isEmailSignin ? 'Email or username' : 'Email'}</span>
                                        <input
                                            type={isEmailSignin ? 'text' : 'email'}
                                            placeholder={isEmailSignin ? 'Email or username' : 'Email'}
                                            className="email-input"
                                            value={username}
                                            onChange={ev => setUsername(ev.target.value)}
                                            required
                                        />
                                    </label>

                                    <label className="password-label flex column">
                                        <span>Password</span>
                                        <div className="password-input-container flex align-center justify-between">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder="Enter password"
                                            />
                                            <button
                                                className="toggle-password-visibility flex align-center justify-center"
                                                onClick={(ev) => {
                                                    ev.preventDefault()
                                                    setShowPassword(!showPassword)
                                                }}
                                            >
                                                <img src={showPassword ? showPassIcon : hidePassIcon} alt="toggle password visibility" />
                                            </button>
                                        </div>
                                    </label>

                                    <button className="submit-btn" disabled={!username || !password}>
                                        {isEmailSignin ? 'Sign in' : 'Sign up'}
                                    </button>
                                </form>
                            </main>
                        )}

                        {isFastSignin && (
                            <main className="fast-signin-form flex column">
                                <div className="select-user-section flex column">
                                    <label className="users-label flex column">
                                        <span>Select User for Quick Login</span>
                                        <select
                                            className="user-select"
                                            value={selectedUser}
                                            onChange={(ev) => setSelectedUser(ev.target.value)}
                                        >
                                            <option value={""}>Choose a user</option>
                                            {quickLoginUsers.map(user => (
                                                <option key={user._id} value={user.username}>
                                                    {user.fullname}
                                                </option>
                                            ))}
                                        </select>
                                    </label>

                                    <button
                                        className="submit-btn"
                                        disabled={!selectedUser}
                                        onClick={() => handleFastSignin(selectedUser)}
                                    >
                                        Quick Login
                                    </button>
                                </div>
                            </main>
                        )}
                    </main>

                    <footer>
                        By joining, you agree to the Finderr&nbsp;
                        <span>Terms of Service</span>
                        &nbsp;and to occasionally receive emails from us. Please read our&nbsp;
                        <span>Privacy Policy</span>
                        &nbsp;to learn how we use your personal data.
                    </footer>
                </section>

                {!isMobile && (
                    <div className="login-image-container">
                        <img src={loginImage} alt="login image" />
                        <section className="login-image-text">
                            <h2>Success starts here</h2>
                            <ul>
                                <li>
                                    <span><img src={checkIcon} alt="check" /></span>
                                    Over 700 categories
                                </li>
                                <li>
                                    <span><img src={checkIcon} alt="check" /></span>
                                    Quality work done faster
                                </li>
                                <li>
                                    <span><img src={checkIcon} alt="check" /></span>
                                    Access to talent and businesses across the globe
                                </li>
                            </ul>
                        </section>
                    </div>
                )}
            </article>

            <div className={`login-backdrop ${modalIsOpen ? 'open' : ''}`} onClick={onCloseModal}></div>
        </>
    )
}

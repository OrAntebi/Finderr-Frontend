import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { capitalizeName, getFacebookLoginUrl } from '../services/util.service'
import { useDispatch, useSelector } from 'react-redux'
import { CLOSE_LOGIN_MODAL, OPEN_LOGIN_MODAL } from '../store/system.reducer'
import { useScreenSize } from '../customHooks/useScreenSize'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { login, loginWithGoogle, signup, loginWithFacebook } from '../store/user/user.actions'

import loginImage from '../assets/img/login-logup-modal.png'
import siteLogo from '../assets/img/site-logo.svg'
import xIcon from '../assets/img/x-icon.svg'
import googleIcon from '../assets/img/google-icon.svg'
import emailIcon from '../assets/img/email-icon.svg'
import appleIcon from '../assets/img/apple-icon.svg'
import facebookIcon from '../assets/img/facebook-v2-icon.svg'
import arrowBackIcon from '../assets/img/arrow-back-icon.svg'
import showPassIcon from '../assets/img/show-pass.svg'
import hidePassIcon from '../assets/img/hide-pass.svg'

export function SigninSignupModal() {
    const modalIsOpen = useSelector((state) => state.systemModule.loginModal.isOpen)
    const modalContent = useSelector((state) => state.systemModule.loginModal.content)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const screenSize = useScreenSize()
    const isMobile = screenSize < 964
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const isAuthFlow = modalContent === 'signin' || modalContent === 'signup'
    const isEmailSignin = modalContent === 'email-signin'
    const isEmailSignup = modalContent === 'email-signup'

    function openModalContent(content) {
        dispatch({ type: OPEN_LOGIN_MODAL, modalContent: content })
    }

    useEffect(() => {
        if (modalIsOpen) {
            setUsername('')
            setPassword('')
            setShowPassword(false)
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
                        {(isEmailSignin || isEmailSignup) && (
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
                                <button id="googleBtn" className="google-btn btn flex align-center justify-between" onClick={() => window.google?.accounts.id.prompt()}>
                                    <img src={googleIcon} alt="Google icon" />
                                    <p>Continue with Google</p>
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

                                <section className="apple-facebook-section flex align-center justify-between">
                                    <button className="apple-btn btn flex align-center justify-between">
                                        <img src={appleIcon} alt="apple icon" />
                                        <p>Apple</p>
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
                    </div>
                )}
            </article>

            <div className={`login-backdrop ${modalIsOpen ? 'open' : ''}`} onClick={onCloseModal}></div>
        </>
    )
}

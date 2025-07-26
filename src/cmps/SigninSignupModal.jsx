import { useEffect, useState } from 'react'
import { userService } from '../services/user'
import { useDispatch, useSelector } from 'react-redux'
import { CLOSE_LOGIN_MODAL } from '../store/system.reducer'
import { useScreenSize } from '../customHooks/useScreenSize'
import loginImage from '../assets/img/login-logup-modal.png'
import siteLogo from '../assets/img/site-logo.svg'
import googleIcon from '../assets/img/google-icon.svg'
import emailIcon from '../assets/img/email-icon.svg'
import xIcon from '../assets/img/x-icon.svg'

export function SigninSignupModal() {
    const modalIsOpen = useSelector((state) => state.systemModule.isLoginModalOpen)
    const [signin, setSignin] = useState(true)
    const screenSize = useScreenSize()
    const isMobile = screenSize < 964
    const dispatch = useDispatch()

    useEffect(() => {
        if (window.google) {
            window.google.accounts.id.initialize({
                client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
                callback: handleCredentialResponse
            })
        }

        const btn = document.getElementById('googleBtn')
        if (btn) {
            btn.addEventListener('click', () => {
                window.google?.accounts.id.prompt()
            })
        }

        return () => {
            if (btn) btn.removeEventListener('click', () => { })
        }
    }, [])

    async function handleCredentialResponse(response) {
        try {
            const user = await userService.googleLogin(response.credential)
            console.log('Logged in as:', user.fullname)
            dispatch({ type: CLOSE_LOGIN_MODAL })
        } catch (err) {
            console.error('Google login failed', err)
        }
    }

    function onCloseModal() {
        dispatch({ type: CLOSE_LOGIN_MODAL })
    }

    return (
        <>
            <article className={`signin-signup-modal ${modalIsOpen ? 'open' : ''}`}>
                <section className="modal-content">
                    <header className="flex align-center justify-between">
                        {isMobile && (
                            <>
                                <img src={siteLogo} alt="logo" className="logo" />
                                <button className="close-modal-btn" onClick={onCloseModal}>
                                    <img src={xIcon} alt="Close modal" />
                                </button>
                            </>
                        )}
                    </header>

                    <main>
                        <header className="flex column">
                            {isMobile ? (
                                <h2 className="title">
                                    Success&nbsp;<span>starts</span><br />here.
                                </h2>
                            ) : (
                                <h2 className="title">{signin ? 'Sign in to your account' : 'Create a new account'}</h2>
                            )}

                            <p className="subtitle">
                                {signin ? (
                                    <>
                                        Don’t have an account?&nbsp;
                                        <span className="link" onClick={() => setSignin(false)}>Join here</span>
                                    </>
                                ) : (
                                    <>
                                        Already have an account?&nbsp;
                                        <span className="link" onClick={() => setSignin(true)}>Sign in</span>
                                    </>
                                )}
                            </p>
                        </header>

                        <main className="login-options flex column">
                            <button id="googleBtn" className="google-btn btn flex align-center justify-between">
                                <img src={googleIcon} alt="Google icon" />
                                <p>Continue with Google</p>
                            </button>

                            <button className="email-btn btn flex align-center justify-between">
                                <img src={emailIcon} alt="email icon" />
                                <p>Continue with email{signin ? `/username` : ''}</p>
                            </button>

                            <section className="or-section flex align-center">
                                <div className="divider"></div>
                                <p className="or">or</p>
                                <div className="divider"></div>
                            </section>

                            <section className="apple-facebook-section flex align-center justify-between">
                                <button className="email-btn btn flex align-center justify-between">
                                    <img src={emailIcon} alt="email icon" />
                                    <p>Apple</p>
                                </button>

                                <button className="email-btn btn flex align-center justify-between">
                                    <img src={emailIcon} alt="email icon" />
                                    <p>Facebook</p>
                                </button>
                            </section>
                        </main>
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

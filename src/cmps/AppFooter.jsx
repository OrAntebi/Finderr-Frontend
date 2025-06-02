import { useSelector } from 'react-redux'
import siteLogo from "../assets/img/site-logo.svg"
import tiktokIcon from "../assets/img/tiktok-icon.svg"
import instagramIcon from "../assets/img/instagram-icon.svg"
import linkedinIcon from "../assets/img/linkedin-icon.svg"
import facebookIcon from "../assets/img/facebook-icon.svg"
import pinterestIcon from "../assets/img/pinterest-icon.svg"
import twitterIcon from "../assets/img/twitter-icon.svg"

export function AppFooter() {
    const count = useSelector(storeState => storeState.userModule.count)

    return (
        <footer className="app-footer main-container full flex align-center">
            <section className="flex align-center justify-between">
                <section className="flex align-center justify-center">
                    <img src={siteLogo} alt="Site Logo" />
                    <p>© Finderr International Ltd. 2025</p>
                </section>

                <section className="social-links flex align-center justify-center">
                    <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer">
                        <img src={tiktokIcon} alt="TikTok" />
                    </a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                        <img src={instagramIcon} alt="Instagram" />
                    </a>
                    <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                        <img src={linkedinIcon} alt="LinkedIn" />
                    </a>
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                        <img src={facebookIcon} alt="Facebook" />
                    </a>
                    <a href="https://www.pinterest.com" target="_blank" rel="noopener noreferrer">
                        <img src={pinterestIcon} alt="Pinterest" />
                    </a>
                    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                        <img src={twitterIcon} alt="Twitter" />
                    </a>
                </section>
            </section>
        </footer>
    )
}
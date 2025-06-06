import SearchInput from "../../cmps/SearchInput"
import { Link } from "react-router-dom"
import heroVideo from "../../assets/video/hero-video.mp4"

export function DynamicHomePage({ screenWidth, ...props }) {
    if (screenWidth < 964) return <MobileHomePage {...props} />
    return <NormalHomePage {...props} />
}

function MobileHomePage() {
    return (
        <section className="home-page main-container full">
            <section className="hero-container main-container full">
                <section className="hero-content flex column align-center justify-center full">
                    <h1>Our freelancers<br />will take it from here</h1>
                    <SearchInput placeholderText='Try "building mobile app"' />
                </section>
            </section>
        </section>
    )
}

function NormalHomePage() {
    return (
        <section className="home-page main-container full">
            <section className="hero-container main-container full">
                <video
                    className="hero-background-video full"
                    autoPlay
                    muted
                    playsInline
                    loop
                    poster="https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/044630cc230d81edf3cc226212308295-1744042923926/hero.png"
                >
                    <source src={heroVideo} type="video/mp4" />
                </video>

                <section className="hero-overlay flex column">
                    <section className="hero-content flex column">
                        <h1>Our freelancers<br />will take it from here</h1>
                        <SearchInput placeholderText="Search for any service..." />
                        <nav>
                            <ul className="hero-categories flex align-center">
                                <li><Link to="/categories/website-development">Website Development</Link></li>
                                <li><Link to="/categories/interior-design">Architecture & Interior Design</Link></li>
                                <li><Link to="/categories/ugc-videos">UGC Videos</Link></li>
                                <li><Link to="/categories/video-editing">Video Editing</Link></li>
                            </ul>
                        </nav>
                    </section>

                    <section className="trusted-logos flex align-center" style={{ gap: '56px' }}>
                        <p>Trusted by:</p>
                        <div className="logo-list flex align-center" style={{ gap: '48px', flexGrow: 1 }}>
                            <img alt="Trusted by Meta" src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/meta.ff37dd3.svg"></img>
                            <img alt="Trusted by Google" src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/google.e74f4d9.svg"></img>
                            <img alt="Trusted by Netflix" src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/netflix.b310314.svg"></img>
                            <img alt="Trusted by PnG" src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/pg.22fca85.svg"></img>
                            <img alt="Trusted by Paypal" src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/paypal.d398de5.svg"></img>
                            <img alt="Trusted by Payoneer" src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/payoneer.7c1170d.svg"></img>
                        </div>
                    </section>
                </section>
            </section>
        </section>
    )
}
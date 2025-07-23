import SearchInput from "../../cmps/SearchInput"
import { Link } from "react-router-dom"
import heroVideo from "../../assets/video/hero-video.mp4"
import { useRef, useState } from "react"
import { CategoriesCards } from "../CategoriesCards"

export function DynamicHomePage({ screenWidth, ...props }) {
    if (screenWidth < 964) return <MobileHomePage {...props} />
    return <NormalHomePage {...props} />
}

function MobileHomePage({ onSearch, categoriesCards }) {
    return (
        <section className="home-page main-container full">
            <section className="hero-container main-container full">
                <section className="hero-content flex column align-center justify-center full">
                    <h1>Our freelancers<br />will take it from here</h1>
                    <SearchInput placeholderText='Try "building mobile app"' onSearch={onSearch} />
                </section>
            </section>
        </section>
    )
}

function NormalHomePage({ onSearch }) {
    const videoRef = useRef(null)
    const [isPlaying, setIsPlaying] = useState(true)

    function handleTogglePlay() {
        if (!videoRef.current) return
        if (isPlaying) videoRef.current.pause()
        else videoRef.current.play()
        setIsPlaying(!isPlaying)
    }

    return (
        <section className="home-page main-container full">
            <section className="hero-container main-container full">
                <video
                    ref={videoRef}
                    className="hero-background-video full"
                    poster="https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/044630cc230d81edf3cc226212308295-1744042923926/hero.png"
                    autoPlay
                    muted
                    playsInline
                    loop
                >
                    <source src={heroVideo} type="video/mp4" />
                </video>

                <section className="hero-overlay flex column">
                    <section className="hero-content flex column">
                        <h1>Our freelancers<br />will take it from here</h1>
                        <SearchInput placeholderText="Search for any service..." onSearch={onSearch} />
                        <nav>
                            <ul className="hero-categories flex align-center">
                                <li><Link to="/categories?category=programming-tech">Website Development</Link></li>
                                <li><Link to="/categories?category=graphics-design">Architecture & Interior Design</Link></li>
                                <li><Link to="/categories?category=video-animation">UGC Videos</Link></li>
                                <li><Link to="/categories?category=video-animation">Video Editing</Link></li>
                            </ul>
                        </nav>
                    </section>

                    <section className="trusted-logos-container flex align-center justify-between">
                        <div className="logo-list flex align-center">
                            <p>Trusted by:</p>
                            <div className="logo-list flex align-center">
                                <img alt="Trusted by Meta" src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/meta.ff37dd3.svg"></img>
                                <img alt="Trusted by Google" src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/google.e74f4d9.svg"></img>
                                <img alt="Trusted by Netflix" src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/netflix.b310314.svg"></img>
                                <img alt="Trusted by PnG" src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/pg.22fca85.svg"></img>
                                <img alt="Trusted by Paypal" src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/paypal.d398de5.svg"></img>
                                <img alt="Trusted by Payoneer" src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/payoneer.7c1170d.svg"></img>
                            </div>
                        </div>

                        <button
                            className="hero-video-toggle-btn"
                            onClick={handleTogglePlay}
                            aria-label={isPlaying ? "Pause background video" : "Play background video"}
                        >
                            {isPlaying ? "❚❚" : "►"}
                        </button>
                    </section>
                </section>
            </section>

            <CategoriesCards />
        </section>
    )
}
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import aiServicesIcon from '../assets/img/home-page/ai-services.svg'
import businessIcon from '../assets/img/home-page/business.svg'
import consultingIcon from '../assets/img/home-page/consulting.svg'
import digitalMarketingIcon from '../assets/img/home-page/digital-marketing.svg'
import graphicsDesignIcon from '../assets/img/home-page/graphics-design.svg'
import musicAudioIcon from '../assets/img/home-page/music-audio.svg'
import programmingTechIcon from '../assets/img/home-page/programming-tech.svg'
import videoAnimationIcon from '../assets/img/home-page/video-animation.svg'
import writingTranslationIcon from '../assets/img/home-page/writing-translation.svg'
import leftArrow from '../assets/img/left-arrow-icon.svg'
import rightArrow from '../assets/img/right-arrow-icon.svg'
import showMore from '../assets/img/show-more.svg'
import showLess from '../assets/img/show-less.svg'
import { useScreenSize } from '../customHooks/useScreenSize'

export function CategoriesCards({ display = 'grid' }) {
    const containerRef = useRef(null)
    const [isDragging, setIsDragging] = useState(false)
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(false)
    const [isScrollable, setIsScrollable] = useState(false)
    const [showAll, setShowAll] = useState(false)
    const screenWidth = useScreenSize()

    const categoriesCards = [
        { title: "Programming & Tech", link: "/categories?category=programming-tech", img: programmingTechIcon },
        { title: "Graphics & Design", link: "/categories?category=graphics-design", img: graphicsDesignIcon },
        { title: "Digital Marketing", link: "/categories?category=digital-marketing", img: digitalMarketingIcon },
        { title: "Writing & Translation", link: "/categories?category=writing-translation", img: writingTranslationIcon },
        { title: "Video & Animation", link: "/categories?category=video-animation", img: videoAnimationIcon },
        { title: "AI Services", link: "/categories?category=ai-services", img: aiServicesIcon },
        { title: "Music & Audio", link: "/categories?category=music-audio", img: musicAudioIcon },
        { title: "Business", link: "/categories?category=business", img: businessIcon },
        { title: "Consulting", link: "/categories?category=consulting", img: consultingIcon },
    ]

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        const updateScrollButtons = () => {
            const hasScroll = container.scrollWidth > container.clientWidth
            setCanScrollLeft(container.scrollLeft > 0)
            setCanScrollRight(container.scrollLeft + container.clientWidth < container.scrollWidth)
            setIsScrollable(hasScroll)
        }

        updateScrollButtons()
        container.addEventListener('scroll', updateScrollButtons)
        window.addEventListener('resize', updateScrollButtons)

        return () => {
            container.removeEventListener('scroll', updateScrollButtons)
            window.removeEventListener('resize', updateScrollButtons)
        }
    }, [])

    useEffect(() => {
        const container = containerRef.current
        let isDown = false
        let startX
        let scrollLeft

        const onMouseDown = (e) => {
            if (!isScrollable) return
            isDown = true
            setIsDragging(false)
            startX = e.pageX - container.offsetLeft
            scrollLeft = container.scrollLeft
            container.style.cursor = 'grabbing'
        }

        const onMouseMove = (e) => {
            if (!isDown) return
            e.preventDefault()
            const x = e.pageX - container.offsetLeft
            const walk = x - startX
            if (Math.abs(walk) > 5) setIsDragging(true)
            container.scrollLeft = scrollLeft - walk
        }

        const onMouseUp = () => {
            isDown = false
            container.style.cursor = isScrollable ? 'grab' : 'default'
        }

        if (!container) return
        container.addEventListener('mousedown', onMouseDown)
        container.addEventListener('mousemove', onMouseMove)
        container.addEventListener('mouseup', onMouseUp)
        container.addEventListener('mouseleave', onMouseUp)

        return () => {
            container.removeEventListener('mousedown', onMouseDown)
            container.removeEventListener('mousemove', onMouseMove)
            container.removeEventListener('mouseup', onMouseUp)
            container.removeEventListener('mouseleave', onMouseUp)
        }
    }, [isScrollable])

    const handleClick = (e) => {
        if (isDragging) e.preventDefault()
    }

    const scrollByAmount = 200
    const scrollLeft = () => containerRef.current.scrollBy({ left: -scrollByAmount, behavior: 'smooth' })
    const scrollRight = () => containerRef.current.scrollBy({ left: scrollByAmount, behavior: 'smooth' })

    if (display === 'grid') {
        const rows = 2
        const cols = screenWidth < 664 ? 3 : 4
        const MAX_VISIBLE = rows * cols
        const DEFAULT_LIMIT = Math.min(categoriesCards.length, MAX_VISIBLE)
        const shouldLimit = !showAll && categoriesCards.length > DEFAULT_LIMIT
        const cardsToShow = shouldLimit ? categoriesCards.slice(0, DEFAULT_LIMIT) : categoriesCards

        return (
            <section className="categories-cards-wrapper full">
                <section className="categories-cards-grid">
                    {cardsToShow.map((card, idx) => (
                        <Link to={card.link} key={idx} className="category-card flex column align-center justify-center">
                            <div className="img-wrapper flex align-center justify-center">
                                <img src={card.img} alt={card.title} />
                            </div>
                            <p>{card.title}</p>
                        </Link>
                    ))}

                    <section className="view-more-less-wrapper">
                        {shouldLimit ? (
                            <button className="view-more-btn" onClick={() => setShowAll(true)}>
                                <span className="flex align-center justify-center">
                                    View {categoriesCards.length - DEFAULT_LIMIT} more
                                    <img src={showMore} alt="show more" />
                                </span>
                            </button>
                        ) : (
                            <button className="view-less-btn" onClick={() => setShowAll(false)}>
                                <span className="flex align-center justify-center">
                                    View less
                                    <img src={showLess} alt="show less" />
                                </span>
                            </button>
                        )}
                    </section>
                </section>
            </section>
        )
    } else {
        return (
            <section className="categories-cards-wrapper full">
                {canScrollLeft && (
                    <button className="scroll-arrow left flex align-center justify-center" onClick={scrollLeft}>
                        <img src={leftArrow} alt="left arrow" />
                    </button>
                )}

                <section
                    ref={containerRef}
                    className={`categories-cards-slider flex ${isScrollable ? 'scrollable' : ''}`}
                >
                    {categoriesCards.map((card, idx) => (
                        <Link
                            to={card.link}
                            key={idx}
                            className="category-card"
                            onClick={handleClick}
                            draggable={false}
                            onDragStart={(e) => e.preventDefault()}
                        >
                            <img src={card.img} alt={card.title} draggable={false} />
                            <p>{card.title}</p>
                        </Link>
                    ))}
                </section>

                {canScrollRight && (
                    <button className="scroll-arrow right flex align-center justify-center" onClick={scrollRight}>
                        <img src={rightArrow} alt="right arrow" />
                    </button>
                )}
            </section>
        )
    }
}

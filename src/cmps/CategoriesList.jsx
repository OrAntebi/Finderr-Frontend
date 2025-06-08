import { useState, useEffect } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import { gigservice } from '../services/gig'
import { Link, useLocation } from 'react-router-dom'
import { useScreenSize } from '../customHooks/useScreenSize'
import { setGigFilter } from '../store/gig/gig.actions'
import leftArrowIcon from '../assets/img/left-arrow-icon.svg'
import rightArrowIcon from '../assets/img/right-arrow-icon.svg'
import 'keen-slider/keen-slider.min.css'

export function CategoriesList() {
    const screenWidth = useScreenSize()
    const currentPage = useLocation().pathname
    const categoryList = gigservice.getCategoryList()

    const [currentSlide, setCurrentSlide] = useState(0)
    const [isAtEnd, setIsAtEnd] = useState(false)

    const [sliderRef, instanceRef] = useKeenSlider({
        initial: 0,
        slides: {
            perView: 'auto',
            spacing: 20,
        },
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel)
            setIsAtEnd(slider.track.details.rel >= slider.track.details.maxIdx)
        },
        created(slider) {
            setIsAtEnd(slider.track.details.rel >= slider.track.details.maxIdx)
            instanceRef.current?.update()
        },
    })

    useEffect(() => {
        instanceRef.current?.update()
    }, [screenWidth])

    function handleCategoryClick(category) {
        setGigFilter({ categories: [category] })
    }

    const isMobile = screenWidth < 664
    const isAtStart = currentSlide === 0

    if (isMobile || !currentPage.startsWith('/categories')) return null
    
    return (
        <nav className="categories-list-container full main-container">
            <div className="categories-list-wrapper flex align-center">
                {!isAtStart && (
                    <button
                        className="arrow arrow-left flex align-center justify-start"
                        onClick={() => instanceRef.current?.prev()}
                    >
                        <img src={leftArrowIcon} alt="left arrow" />
                    </button>
                )}

                <div ref={sliderRef} className="keen-slider categories-list">
                    {categoryList.map(({ categoryRoute, categoryName }) => (
                        <div className="keen-slider__slide" key={categoryRoute}>
                            <Link
                                to={`/categories/${categoryRoute}`}
                                onClick={() => handleCategoryClick(categoryRoute)}
                                className="category-link"
                            >
                                {categoryName}
                            </Link>
                        </div>
                    ))}
                </div>

                {!isAtEnd && (
                    <button
                        className="arrow arrow-right flex align-center justify-end"
                        onClick={() => instanceRef.current?.next()}
                    >
                        <img src={rightArrowIcon} alt="right arrow" />
                    </button>
                )}
            </div>
        </nav>
    )
}

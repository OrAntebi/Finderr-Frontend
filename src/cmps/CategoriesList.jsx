import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { gigservice } from '../services/gig'
import { useScreenSize } from '../customHooks/useScreenSize'
import { setGigFilter } from '../store/gig/gig.actions'

import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

import rightArrowIcon from '../assets/img/right-arrow-icon.svg'
import leftArrowIcon from '../assets/img/left-arrow-icon.svg'

export function CategoriesList() {
    const screenWidth = useScreenSize()
    const categoryList = gigservice.getCategoryList()

    const location = useLocation()
    const currentPage = location.pathname

    const currCategory = useSelector(s => s.gigModule.filterBy.categories[0] || '')

    const isOnlyCategoriesPage = currentPage === '/categories'

    const [currentSlide, setCurrentSlide] = useState(0)
    const [isAtEnd, setIsAtEnd] = useState(false)

    const [sliderRef, instanceRef] = useKeenSlider({
        initial: 0,
        slides: { perView: 'auto', spacing: 20 },
        slideChanged(s) {
            setCurrentSlide(s.track.details.rel)
            setIsAtEnd(s.track.details.rel >= s.track.details.maxIdx)
        },
        created(s) {
            setIsAtEnd(s.track.details.rel >= s.track.details.maxIdx)
            instanceRef.current?.update()
        },
    })

    useEffect(() => {
        instanceRef.current?.update()
    }, [screenWidth])

    useEffect(() => {
        const hasActive = document.querySelector('.category-link.active')
        const isGigDetails =
            currentPage.startsWith('/categories/') && currentPage !== '/categories'
        if ((isOnlyCategoriesPage || isGigDetails) && !hasActive) {
            instanceRef.current?.moveToIdx(0)
            setCurrentSlide(0)
            setIsAtEnd(false)
        }
    }, [currentPage, currCategory, isOnlyCategoriesPage])

    function onClickCategory(category) {
        setGigFilter({ ...gigservice.getDefaultFilter(), categories: [category] })
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
                                to={`/categories?category=${categoryRoute}`}
                                onClick={() => onClickCategory(categoryRoute)}
                                className={`category-link flex align-center ${currCategory === categoryRoute && isOnlyCategoriesPage
                                    ? 'active'
                                    : ''
                                    }`}
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

import { useState, useRef } from 'react'
import Slider from 'react-slick'
import { useScreenSize } from '../customHooks/useScreenSize'
import { gigService } from '../services/gig/index'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'


export function GigSlider({ gig, showThumbnails = false }) {
    const screenWidth = useScreenSize()

    const isDeskop = screenWidth >= 964
    const images = gig.imgUrls?.length ? gig.imgUrls : gigService.getDefaultImgs()
    const hasMultipleImages = images.length > 1

    const sliderRef = useRef()
    const [currentSlide, setCurrentSlide] = useState(0)

    const settings = {
        dots: hasMultipleImages,
        arrows: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        beforeChange: (_, next) => setCurrentSlide(next),
        ...(showThumbnails && {
            customPaging: (i) => (
                <div className="thumbnail">
                    <img src={images[i]} alt={`${gig.title} ${i + 1}`} />
                </div>
            ),
            dotsClass: "slick-thumbnails"
        })
    }

    function onChangeSlide(ev, diff) {
        ev.stopPropagation()
        if (!sliderRef.current) return

        diff === 1 ?
            sliderRef.current.slickNext() :
            sliderRef.current.slickPrev()
    }


    return (
        <div className={`gig-slider ${showThumbnails ? 'with-thumbnails' : ''}`}>
            {isDeskop && hasMultipleImages && currentSlide > 0 && (
                <button className="gallery-btn prev" onClick={(ev) => onChangeSlide(ev, -1)}>
                    <i className="fa-solid fa-chevron-left"></i>
                </button>
            )}

            <Slider {...settings} ref={sliderRef}>
                {images.map((url, i) => (
                    <img
                        key={`${gig._id}-${i}`}
                        src={url}
                        alt={gig.title}
                        className="gig-img"
                        onError={e => (e.currentTarget.src = defaults[0])}
                    />
                ))}
            </Slider>

            {isDeskop && hasMultipleImages && currentSlide < images.length - 1 && (
                <button className="gallery-btn next" onClick={(ev) => onChangeSlide(ev, 1)}>
                    <i className="fa-solid fa-chevron-right"></i>
                </button>
            )}
        </div>

    )
}

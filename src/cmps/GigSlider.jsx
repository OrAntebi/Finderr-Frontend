import Slider from 'react-slick'
import { Link } from 'react-router-dom'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const defaults = [
    'https://res.cloudinary.com/dgsfbxsed/image/upload/v1698663092/defaultGigImg_vjtk9e.webp',
    'https://res.cloudinary.com/dgsfbxsed/image/upload/v1698914668/default-img-3_afl2mb.webp',
    'https://res.cloudinary.com/dgsfbxsed/image/upload/v1698914668/default-img-1_qhfps6.webp'
]

export function GigSlider({ gig, showThumbnails = false }) {
    const images = gig.imgUrls?.length ? gig.imgUrls : defaults

    const Arrow = ({ onClick, dir }) => (
        <button className={`gallery-btn ${dir}`} onClick={onClick}>
            <i className={`fa-solid fa-chevron-${dir === 'prev' ? 'left' : 'right'}`}></i>
        </button>
    )

    const settings = {
        dots: true,
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <Arrow dir="prev" />,
        nextArrow: <Arrow dir="next" />,
        ...(showThumbnails && {
            customPaging: (i) => (
                <div className="thumbnail">
                    <img src={images[i]} alt={`${gig.title} ${i + 1}`} />
                </div>
            ),
            dotsClass: "slick-thumbnails"
        })
    }

    return (
        <div className="gig-slider">
            <Slider {...settings}>
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
        </div>
    )
}
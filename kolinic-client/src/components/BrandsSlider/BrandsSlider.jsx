import React from 'react'
import Slider from 'react-slick'
import styles from './BrandsSlider.module.scss'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const BrandsSlider = () => {
    const settings = {
        arrows: false,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            }
        ]
    };

    return (
        <div className='container absolute top-[-70px]'>
            <div className={styles['brands-wrapper']}>
                <Slider {...settings}>
                    <div className={styles['brand-item']}>
                        <img className={styles['brand-img']} src={require('../../assets/img/brands1.png')} alt='brands1' />
                    </div>
                    <div className={styles['brand-item']}>
                        <img className={styles['brand-img']} src={require('../../assets/img/brands2.png')} alt='brands2' />
                    </div>
                    <div className={styles['brand-item']}>
                        <img className={styles['brand-img']} src={require('../../assets/img/brands3.png')} alt='brands3' />
                    </div>
                    <div className={styles['brand-item']}>
                        <img className={styles['brand-img']} src={require('../../assets/img/brands4.png')} alt='brands4' />
                    </div>
                    <div className={styles['brand-item']}>
                        <img className={styles['brand-img']} src={require('../../assets/img/brands5.png')} alt='brands5' />
                    </div>
                    <div className={styles['brand-item']}>
                        <img className={styles['brand-img']} src={require('../../assets/img/brands1.png')} alt='brands1' />
                    </div>
                    <div className={styles['brand-item']}>
                        <img className={styles['brand-img']} src={require('../../assets/img/brands2.png')} alt='brands2' />
                    </div>
                    <div className={styles['brand-item']}>
                        <img className={styles['brand-img']} src={require('../../assets/img/brands3.png')} alt='brands3' />
                    </div>
                    <div className={styles['brand-item']}>
                        <img className={styles['brand-img']} src={require('../../assets/img/brands4.png')} alt='brands4' />
                    </div>
                    <div className={styles['brand-item']}>
                        <img className={styles['brand-img']} src={require('../../assets/img/brands5.png')} alt='brands5' />
                    </div>
                </Slider>
            </div>
        </div>
    )
}

export default BrandsSlider
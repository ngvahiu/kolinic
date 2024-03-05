import React from 'react'
import styles from './ClientTestimonial.module.scss'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Heading from '../../ui/Heading/Heading'
import { FaQuoteLeft } from 'react-icons/fa'

function ClientTestimonial() {
    const settings = {
        arrows: false,
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        // autoplay: true,
        autoplaySpeed: 2000,
        cssEase: "linear"
    };

    return (
        <div className='px-20 mt-40'>
            <Heading
                title='Client Testimonial'
                description='Condimentum rutrum placerat egestas condimentum mi eros. Eleifend cras quirntum Feugiat elit placerat. Diam tempor malesuada.'
            />
            <div className='mt-20'>
                <Slider {...settings}>
                    <TestimonialCard />
                    <TestimonialCard />
                    <TestimonialCard />
                    <TestimonialCard />
                </Slider>
            </div>
        </div>
    )
}

function TestimonialCard() {
    return (
        <div className={styles['single-testimonial']}>
            <div className={styles['testimonial-top']}>
                <FaQuoteLeft className='text-[--main-color]' />
                <span className={styles['testimonial-description']}>Since going to Kolinic, my health has improved dramatically, and I finally feel like I have a doctor who truly listens to my concerns.</span>
            </div>
            <div className={styles['testimonial-author']}>
                <div className={styles['author-image']}>
                    <img src={require('../../assets/img/doctor1.jpg')} alt="client-1" />
                </div>
                <div className={styles['author-details']}>
                    <h4 className={styles['author-title']}>Marina Tusa</h4>
                    <p className={styles['author-para']}> Housewief </p>
                </div>
            </div>
        </div>
    )
}

export default ClientTestimonial
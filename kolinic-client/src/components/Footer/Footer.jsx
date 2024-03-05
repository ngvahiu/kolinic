import React from 'react'
import BrandsSlider from '../BrandsSlider/BrandsSlider'
import styles from './Footer.module.scss'
import { FaAngleRight, FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa'

function Footer() {
    return (
        <footer className='w-full relative bg-[--bg-footer-color] mt-[10rem] flex flex-col items-center'>
            <BrandsSlider />
            <div className='w-full px-24 pt-[100px] pb-[120px]'>
                <div className='grid lg:grid-cols-6 gap-4'>
                    <div className='col-span-2'>
                        <h4 className={styles['common-title']}>About Company</h4>
                        <div className='mt-3'>
                            <p className='text-white leading-7 my-[2rem] text-[1.2rem] md:text-[1.8rem]'>
                                At Kolinic, we're dedicated to excellence. With a passion for innovation and a commitment to our customers, we strive to provide top-quality products/services that meet your needs. Discover our story and join us on our journey to making a difference
                            </p>
                            <ul className='flex flex-row items-center gap-5 mt-3'>
                                <li className={`${styles['social-icon']} rounded-full w-[30px] h-[30px] md:w-[40px] md:h-[40px] flex items-center justify-center cursor-pointer`}>
                                    <a href='/' className='text-xl'>
                                        <FaFacebookF />
                                    </a>
                                </li>
                                <li className={`${styles['social-icon']} rounded-full w-[30px] h-[30px] md:w-[40px] md:h-[40px] flex items-center justify-center cursor-pointer`}>
                                    <a href='/' className='text-xl'>
                                        <FaTwitter />
                                    </a>
                                </li>
                                <li className={`${styles['social-icon']} rounded-full w-[30px] h-[30px] md:w-[40px] md:h-[40px] flex items-center justify-center cursor-pointer`}>
                                    <a href='/' className='text-xl'>
                                        <FaInstagram />
                                    </a>
                                </li>
                                <li className={`${styles['social-icon']} rounded-full w-[30px] h-[30px] md:w-[40px] md:h-[40px] flex items-center justify-center cursor-pointer`}>
                                    <a href='/' className='text-xl'>
                                        <FaLinkedinIn />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='col-span-1'>
                        <h4 className={styles['common-title']}>Useful Link</h4>
                        <ul className='flex flex-col gap-5 mt-3'>
                            <li className={`${styles['footer-item']} flex justify-start items-center cursor-pointer`}>
                                <a href='/' className={`${styles['angle-icon']} flex justify-center items-center rounded-full`}>
                                    <FaAngleRight />
                                </a>
                                <span className='text-white text-[1.2rem] md:text-[1.8rem]'>About</span>
                            </li>
                            <li className={`${styles['footer-item']} flex justify-start items-center cursor-pointer`}>
                                <a href='/' className={`${styles['angle-icon']} flex justify-center items-center rounded-full`}>
                                    <FaAngleRight />
                                </a>
                                <span className='text-white text-[1.2rem] md:text-[1.8rem]'>Our Services</span>
                            </li>
                            <li className={`${styles['footer-item']} flex justify-start items-center cursor-pointer`}>
                                <a href='/' className={`${styles['angle-icon']} flex justify-center items-center rounded-full`}>
                                    <FaAngleRight />
                                </a>
                                <span className='text-white text-[1.2rem] md:text-[1.8rem]'>Our mission</span>
                            </li>
                            <li className={`${styles['footer-item']} flex justify-start items-center cursor-pointer`}>
                                <a href='/' className={`${styles['angle-icon']} flex justify-center items-center rounded-full`}>
                                    <FaAngleRight />
                                </a>
                                <span className='text-white text-[1.2rem] md:text-[1.8rem]'>Find Doctor</span>
                            </li>
                            <li className={`${styles['footer-item']} flex justify-start items-center cursor-pointer`}>
                                <a href='/' className={`${styles['angle-icon']} flex justify-center items-center rounded-full`}>
                                    <FaAngleRight />
                                </a>
                                <span className='text-white text-[1.2rem] md:text-[1.8rem]'>Appointment</span>
                            </li>
                        </ul>
                    </div>
                    <div className='col-span-1'>
                        <h4 className={styles['common-title']}>Our Services</h4>
                        <ul className='flex flex-col gap-5 mt-3'>
                            <li className={`${styles['footer-item']} flex justify-start items-center cursor-pointer`}>
                                <a href='/' className={`${styles['angle-icon']} flex justify-center items-center rounded-full`}>
                                    <FaAngleRight />
                                </a>
                                <span className='text-white text-[1.2rem] md:text-[1.8rem]'>Cardiology</span>
                            </li>
                            <li className={`${styles['footer-item']} flex justify-start items-center cursor-pointer`}>
                                <a href='/' className={`${styles['angle-icon']} flex justify-center items-center rounded-full`}>
                                    <FaAngleRight />
                                </a>
                                <span className='text-white text-[1.2rem] md:text-[1.8rem]'>Outpatient</span>
                            </li>
                            <li className={`${styles['footer-item']} flex justify-start items-center cursor-pointer`}>
                                <a href='/' className={`${styles['angle-icon']} flex justify-center items-center rounded-full`}>
                                    <FaAngleRight />
                                </a>
                                <span className='text-white text-[1.2rem] md:text-[1.8rem]'>Gynaecological</span>
                            </li>
                            <li className={`${styles['footer-item']} flex justify-start items-center cursor-pointer`}>
                                <a href='/' className={`${styles['angle-icon']} flex justify-center items-center rounded-full`}>
                                    <FaAngleRight />
                                </a>
                                <span className='text-white text-[1.2rem] md:text-[1.8rem]'>Dental Surgery</span>
                            </li>
                            <li className={`${styles['footer-item']} flex justify-start items-center cursor-pointer`}>
                                <a href='/' className={`${styles['angle-icon']} flex justify-center items-center rounded-full`}>
                                    <FaAngleRight />
                                </a>
                                <span className='text-white text-[1.2rem] md:text-[1.8rem]'>Laboratory</span>
                            </li>
                        </ul>
                    </div>
                    <div className='col-span-1'>
                        <h4 className={styles['common-title']}>Terms</h4>
                        <ul className='flex flex-col gap-5 mt-3'>
                            <li className={`${styles['footer-item']} flex justify-start items-center cursor-pointer`}>
                                <a href='/' className={`${styles['angle-icon']} flex justify-center items-center rounded-full`}>
                                    <FaAngleRight />
                                </a>
                                <span className='text-white text-[1.2rem] md:text-[1.8rem]'>Announcement</span>
                            </li>
                            <li className={`${styles['footer-item']} flex justify-start items-center cursor-pointer`}>
                                <a href='/' className={`${styles['angle-icon']} flex justify-center items-center rounded-full`}>
                                    <FaAngleRight />
                                </a>
                                <span className='text-white text-[1.2rem] md:text-[1.8rem]'>Privacy Policy</span>
                            </li>
                            <li className={`${styles['footer-item']} flex justify-start items-center cursor-pointer`}>
                                <a href='/' className={`${styles['angle-icon']} flex justify-center items-center rounded-full`}>
                                    <FaAngleRight />
                                </a>
                                <span className='text-white text-[1.2rem] md:text-[1.8rem]'>Term Of Service</span>
                            </li>
                            <li className={`${styles['footer-item']} flex justify-start items-center cursor-pointer`}>
                                <a href='/' className={`${styles['angle-icon']} flex justify-center items-center rounded-full`}>
                                    <FaAngleRight />
                                </a>
                                <span className='text-white text-[1.2rem] md:text-[1.8rem]'>Refund Policy</span>
                            </li>
                            <li className={`${styles['footer-item']} flex justify-start items-center cursor-pointer`}>
                                <a href='/' className={`${styles['angle-icon']} flex justify-center items-center rounded-full`}>
                                    <FaAngleRight />
                                </a>
                                <span className='text-white text-[1.2rem] md:text-[1.8rem]'>License Info</span>
                            </li>
                        </ul>
                    </div>
                    <div className='col-span-1'>
                        <h4 className={styles['common-title']}>Support</h4>
                        <ul className='flex flex-col gap-5 mt-3'>
                            <li className={`${styles['footer-item']} flex justify-start items-center cursor-pointer`}>
                                <a href='/' className={`${styles['angle-icon']} flex justify-center items-center rounded-full`}>
                                    <FaAngleRight />
                                </a>
                                <span className='text-white text-[1.2rem] md:text-[1.8rem]'>F.A.Q</span>
                            </li>
                            <li className={`${styles['footer-item']} flex justify-start items-center cursor-pointer`}>
                                <a href='/' className={`${styles['angle-icon']} flex justify-center items-center rounded-full`}>
                                    <FaAngleRight />
                                </a>
                                <span className='text-white text-[1.2rem] md:text-[1.8rem]'>Get Support</span>
                            </li>
                            <li className={`${styles['footer-item']} flex justify-start items-center cursor-pointer`}>
                                <a href='/' className={`${styles['angle-icon']} flex justify-center items-center rounded-full`}>
                                    <FaAngleRight />
                                </a>
                                <span className='text-white text-[1.2rem] md:text-[1.8rem]'>Our Forum</span>
                            </li>
                            <li className={`${styles['footer-item']} flex justify-start items-center cursor-pointer`}>
                                <a href='/' className={`${styles['angle-icon']} flex justify-center items-center rounded-full`}>
                                    <FaAngleRight />
                                </a>
                                <span className='text-white text-[1.2rem] md:text-[1.8rem]'>Member Area</span>
                            </li>
                            <li className={`${styles['footer-item']} flex justify-start items-center cursor-pointer`}>
                                <a href='/' className={`${styles['angle-icon']} flex justify-center items-center rounded-full`}>
                                    <FaAngleRight />
                                </a>
                                <span className='text-white text-[1.2rem] md:text-[1.8rem]'>Contact Us</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='w-full bg-white py-5 px-20'>
                <div className='grid grid-cols-2'>
                    <div className='flex justify-start'>
                        <span className='text-gray-500 text-[1.2rem] md:text-[1.8rem]'>Copyright © 2021. All rights reserved</span>
                    </div>
                    <div className='flex justify-end items-center gap-4'>
                        <span className='text-gray-500 text-[1.2rem] md:text-[1.8rem]'>We accept</span>
                        <img
                            src={require('../../assets/img/visa-card.jpg')}
                            style={{
                                width: '30px',
                                height: '20px',
                            }}
                            alt='visa' />
                        <img
                            src={require('../../assets/img/paypal-card.png')}
                            style={{
                                width: '30px',
                                height: '20px',
                            }}
                            alt='paypal' />
                    </div>
                </div>
            </div>
        </footer >
    )
}

export default Footer
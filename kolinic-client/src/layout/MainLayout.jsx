import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header/Header'
import HomeCarousel from '../components/Carousel/HomeCarousel/HomeCarousel'
import Footer from '../components/Footer/Footer'
import BackToTopButton from '../components/BackToTopButton/BackToTopButton'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import ChattingButton from '../components/ChattingButton/ChattingButton'

function MainLayout() {
    return (
        <div className='w-full'>
            <Header />
            <HomeCarousel />
            <div className='px-[20px] md:px-[50px] lg:px-[100px] pt-[50px]'>
                <Outlet />
            </div>
            <Footer />
            <BackToTopButton />
            <ChattingButton />
            <ToastContainer autoClose={1000} />
        </div>
    )
}

export default MainLayout
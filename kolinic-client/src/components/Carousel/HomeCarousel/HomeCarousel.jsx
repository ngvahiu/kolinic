import React from 'react'
import Button from '../../../ui/Button/Button'
import background from "../../../assets/img/home-banner.jpg";

function HomeCarousel() {
    return (
        <section
            className='bg-no-repeat bg-cover bg-position-center'
            style={{
                backgroundImage: `url(${background})`
            }}
        >
            <div className='pt-[150px] md:pt-[235px] px-[10px] md:px-[100px] pb-[100px] md:pb-[190px]'>
                <div className='md:w-1/2'>
                    <h2 className='text-[2.5rem] md:text-[5rem] font-extrabold'>Meet With Your Best Doctor In Here</h2>
                    <span className='my-4 text-[1rem] md:text-[2rem] text-[--color-grey-500]'>Welcome to a place where you can meet top-notch doctors. We are committed to providing you with high-quality medical services and the best healthcare. Explore and schedule an appointment today to meet our dedicated and experienced doctors</span>
                    <div className='flex justify-start items-center gap-4 mt-10'>
                        <div className='w-1/4 md:w-1/3'>
                            <Button text='APPOINTMENT' size='full' type='main' />
                        </div>
                        <div className='w-1/4 md:w-1/3'>
                            <Button text='LEARN MORE' size='full' type='sub' />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HomeCarousel
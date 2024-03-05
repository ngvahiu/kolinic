import React from 'react'
import { mainColor } from '../../util/ThemeColors'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import { BsEnvelope } from 'react-icons/bs'

function InformationArea() {
    return (
        <div className='px-[2.5rem] md:px-[5rem] lg:px-[10rem] py-[2rem]' style={{
            backgroundColor: mainColor
        }}>
            <div className='flex flex-col sm:flex-row space-y-4 md:space-y-0 justify-between items-center'>
                <div className='md:p-7 lg:p-10 flex items-center gap-5'>
                    <div className='w-[50px] h-[50px] justify-center items-center hidden md:flex'>
                        <AiOutlineClockCircle className='text-[--color-grey-0] text-[3rem] lg:text-[5rem]' />
                    </div>
                    <div className='flex flex-col items-center md:block'>
                        <h6 className='font-semibold text-white mb-2 text-[1rem] md:text-[1.2rem] lg:text-[1.4rem]'>Friday to Saturday</h6>
                        <span className='text-white mt-2 text-[0.6rem] md:text-[1rem] lg:text-[1.4rem]'>08:30 am to 05:00 pm</span>
                    </div>
                </div>
                <div className='md:p-7 lg:p-10 flex items-center gap-5'>
                    <div className='w-[50px] h-[50px] justify-center items-center hidden md:flex'>
                        <HiOutlineLocationMarker className='text-[--color-grey-0] text-[3rem] lg:text-[5rem]' />
                    </div>
                    <div className='flex flex-col items-center md:block'>
                        <h6 className='font-semibold text-white mb-2 text-[1rem] md:text-[1.2rem] lg:text-[1.4rem]'>Office Address</h6>
                        <span className='text-white mt-2 text-[0.6rem] md:text-[1rem] lg:text-[1.4rem]'>Gene Rest, North Audreanneville</span>
                    </div>
                </div>
                <div className='md:p-7 lg:p-10 flex items-center gap-5'>
                    <div className='w-[50px] h-[50px] justify-center items-center hidden md:flex'>
                        <BsEnvelope className='text-[--color-grey-0] text-[3rem] lg:text-[5rem]' />
                    </div>
                    <div className='flex flex-col items-center md:block'>
                        <h6 className='font-semibold text-white mb-2 text-[1rem] md:text-[1.2rem] lg:text-[1.4rem]'>Email Address</h6>
                        <span className='text-white mt-2  text-[0.6rem] md:text-[1rem] lg:text-[1.4rem]'>kolinic@gmail.com</span>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default InformationArea
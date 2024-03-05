import React from 'react'
import { AiOutlineCheck } from 'react-icons/ai'

function MissionVision() {
    return (
        <div className='mt-[3rem]'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-[5rem] pb-[8rem] border-b-2'>
                <div className='col-span-1'>
                    <img className='w-full h-[400px] sm:h-[450px] lg:h-[500px] xl:h-[550px]' src={require('../../assets/img/mission.png')} alt='mission' />
                </div>
                <div className='col-span-1 flex flex-col justify-center space-y-[1rem] pr-[5rem]'>
                    <h1 className='text-[--color-grey-900] text-[3rem] md:text-[4rem] font-extrabold'>Our mission</h1>
                    <p className='text-[--color-grey-400] text-[1.4rem] md:text-[1.8rem]'>
                        Neque ligula nam massa aliquet tempus, nulla aliquam nascetur suspendisse eros arcu, tortor porta turpis pellentesque et platea vitae id risus. Sed mauris porttitor quam, magna molestie aenean quis ornare sed. Pharetra in suspendisse.
                    </p>
                    <div className='grid grid-cols-2 space-y-[1.4rem]'>
                        <Feature text="Low Investment" />
                        <Feature text="Over View On Service" />
                        <Feature text="24/7 Customer Support" />
                        <Feature text="Life Time Membership" />
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-[5rem] pt-[8rem]'>
                <div className='col-span-1 flex flex-col justify-center space-y-[1rem] pr-[5rem]'>
                    <h1 className='text-[--color-grey-900] text-[3rem] md:text-[4rem] font-extrabold'>Our vision</h1>
                    <p className='text-[--color-grey-400] text-[1.4rem] md:text-[1.8rem]'>
                        Neque ligula nam massa aliquet tempus, nulla aliquam nascetur suspendisse eros arcu, tortor porta turpis pellentesque et platea vitae id risus. Sed mauris porttitor quam, magna molestie aenean quis ornare sed. Pharetra in suspendisse.
                    </p>
                    <div className='grid grid-cols-2 space-y-[1.4rem]'>
                        <Feature text="Low Investment" />
                        <Feature text="Over View On Service" />
                        <Feature text="24/7 Customer Support" />
                        <Feature text="Life Time Membership" />
                    </div>
                </div>
                <div className='col-span-1'>
                    <img className='w-full h-[400px] sm:h-[450px] lg:h-[500px] xl:h-[550px]' src={require('../../assets/img/vision.png')} alt='mission' />
                </div>
            </div>
        </div>
    )
}

function Feature({ text }) {
    return (
        <div className='flex justify-start items-center gap-[1rem]'>
            <div className='flex justify-center items-center rounded-b-2xl p-[0.5rem] bg-[--main-color]'>
                <AiOutlineCheck className='text-[--color-grey-0] text-[1.2rem]'/>
            </div>
            <span className='text-[--color-grey-400] text-[1.2rem] md:text-[1.6rem]'>{text}</span>
        </div>
    )
}

export default MissionVision
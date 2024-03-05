import React from 'react'
import timeline1 from '../../assets/img/timeline1.jpg';

function Timeline() {
    return (
        <div className='grid grid-cols-1 xl:grid-cols-2 items-center gap-[5rem]'>
            <TimelineImage year={1998} />
            <TimelineContent title="Start Our Journey" desc="Neque ligula nam massa aliquet tempus lquam nascetur suspendisse eros arcu, tortor porturpis pellentesque, et platea vitae id risus.ed mauris porttitor quammagna molestie" />
            <TimelineContent title="Change Our Focus" desc="Neque ligula nam massa aliquet tempus lquam nascetur suspendisse eros arcu, tortor porturpis pellentesque, et platea vitae id risus.ed mauris porttitor quammagna molestie" />
            <TimelineImage year={2001} />
            <TimelineImage year={2002} />
            <TimelineContent title="Govment Approval" desc="Neque ligula nam massa aliquet tempus lquam nascetur suspendisse eros arcu, tortor porturpis pellentesque, et platea vitae id risus.ed mauris porttitor quammagna molestie" />
            <TimelineContent title="Start It Training" desc="Neque ligula nam massa aliquet tempus lquam nascetur suspendisse eros arcu, tortor porturpis pellentesque, et platea vitae id risus.ed mauris porttitor quammagna molestie" />
            <TimelineImage year={2020} />
        </div>
    )
}

function TimelineImage({ year, img }) {
    return (
        <div className='w-full flex justify-center'>
            <div className='w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] rounded-full relative' style={{
                backgroundImage: "url(" + timeline1 + ")"
            }}>
                <h3 className='w-[50px] h-[50px] sm:w-[100px] sm:h-[100px] flex justify-center items-center bg-[--main-color] text-[--color-grey-0] text-[2rem] sm:text-[3rem] font-bold absolute rounded-full top-[15px] right-[15px] sm:top-[30px] sm:right-[30px]'>{year}</h3>
            </div>
        </div>

    )
}

function TimelineContent({ title, desc }) {
    return (
        <div className='w-full h-[300px] bg-[--main-color] p-[4rem]'>
            <div className='w-full h-full p-[2rem] sm:p-[10rem] flex flex-col justify-center items-center bg-[--color-grey-0]'>
                <h1 className='text-[1.5rem] sm:text-[2rem] 2xl:text-[3rem] text-[--color-grey-900] font-bold'>{title}</h1>
                <p className='text-[1rem] sm:text-[1.5rem] 2xl:text-[1.8rem] text-[--color-grey-500] text-center sm:leading-[2.2rem] mt-[1.5rem]'>
                    {desc}
                </p>
            </div>
        </div>
    )
}
export default Timeline
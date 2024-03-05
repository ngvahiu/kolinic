import React, { useCallback } from 'react'

function InformationTable({ doctor: { about, description, education, workingYear, dob } }) {
    const renderDob = useCallback(function renderDob() {
        if (dob) {
            const dobDate = new Date(dob);
            return `${dobDate.getDate()} - ${dobDate.getMonth() + 1} - ${dobDate.getFullYear()}`;
        }
    }, [dob]);

    return (
        <div className='w-full border border-[--color-grey-300] rounded-xl overflow-hidden'>
            <div className='grid grid-cols-12'>
                <div className='col-span-4 border-r-2 border-b-2 px-[1.5rem] py-[2rem]'>
                    <h1 className='text-[1.3rem] md:text-[1.6rem] font-bold'>About me</h1>
                </div>
                <div className='col-span-8 border-b-2 px-[1.5rem] py-[2rem]'>
                    <p className='text-[1.3rem] md:text-[1.6rem] text-[--color-grey-500] px-[3rem]'>
                        {about}
                    </p>
                </div>

                <div className='col-span-4 border-r-2 border-b-2 px-[1.5rem] py-[2rem]'>
                    <h1 className='text-[1.3rem] md:text-[1.6rem] font-bold'>Description</h1>
                </div>
                <div className='col-span-8 border-b-2 px-[1.5rem] py-[2rem]'>
                    <p className='text-[1.3rem] md:text-[1.6rem] text-[--color-grey-500] px-[3rem]'>
                        {description}
                    </p>
                </div>

                <div className='col-span-4 border-r-2 border-b-2 px-[1.5rem] py-[2rem]'>
                    <h1 className='text-[1.3rem] md:text-[1.6rem] font-bold'>Education</h1>
                </div>
                <div className='col-span-8 border-b-2 px-[1.5rem] py-[2rem]'>
                    <p className='text-[1.3rem] md:text-[1.6rem] text-[--color-grey-500] px-[3rem]'>
                        {education}
                    </p>
                </div>

                <div className='col-span-4 border-r-2 border-b-2 px-[1.5rem] py-[2rem]'>
                    <h1 className='text-[1.3rem] md:text-[1.6rem] font-bold'>Working years</h1>
                </div>
                <div className='col-span-8 border-b-2 px-[1.5rem] py-[2rem]'>
                    <p className='text-[1.3rem] md:text-[1.6rem] text-[--color-grey-500] px-[3rem]'>
                        {new Date().getFullYear() - workingYear}
                    </p>
                </div>

                <div className='col-span-4 border-r-2 border-b-2 px-[1.5rem] py-[2rem]'>
                    <h1 className='text-[1.3rem] md:text-[1.6rem] font-bold'>Date of birth</h1>
                </div>
                <div className='col-span-8 border-b-2 px-[1.5rem] py-[2rem]'>
                    <p className='text-[1.3rem] md:text-[1.6rem] text-[--color-grey-500] px-[3rem]'>
                        {renderDob()}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default InformationTable
import React from 'react'
import FormBookAppointment from './FormBookAppointment'

function AppointmentArea() {
    return (
        <div className='w-full overflow-hidden lg:px-28 mt-[6rem] flex xl:justify-between justify-center'>
            <img
                className='hidden xl:block'
                src={require('../../assets/img/appointment-man.png')}
                alt='appointment-man'
                style={{
                    width: '455px',
                    height: '675px'
                }}
                data-aos="fade-right"
                data-aos-duration="1000"
            />
            <div className='mb-[2rem]'>
                <FormBookAppointment />
            </div>
        </div>
    )
}

export default AppointmentArea
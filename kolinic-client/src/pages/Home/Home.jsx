import React from 'react'
import InformationArea from '../../components/InformationArea/InformationArea'
import AppointmentArea from '../../components/AppointmentArea/AppointmentArea'
import OurServices from '../../components/OurServices/OurServices'
import DoctorArea from '../../components/DoctorArea/DoctorArea'
import DepartmentsArea from '../../components/DepartmentsArea/DepartmentsArea'
import ClientTestimonial from '../../components/ClientTestimonial/ClientTestimonial'
import CounterArea from '../../components/CounterArea/CounterArea'
import BlogsArea from '../../components/BlogsArea/BlogsArea'

function Home() {
    return (
        <div className='w-full mb-20'>
            <InformationArea />
            <AppointmentArea />
            <OurServices />
            <DoctorArea />
            <DepartmentsArea />
            <ClientTestimonial />
            <CounterArea />
            <BlogsArea />
        </div>
    )
}

export default Home
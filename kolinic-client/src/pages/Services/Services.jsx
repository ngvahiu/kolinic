import React from 'react'
import OurServices from '../../components/OurServices/OurServices'
import FormBookAppointment from '../../components/AppointmentArea/FormBookAppointment'
import Heading from '../../ui/Heading/Heading'
import { AiOutlineCheck } from 'react-icons/ai'
import ClientTestimonial from '../../components/ClientTestimonial/ClientTestimonial'

function Services() {
    return (
        <div className='my-[5rem]'>
            <OurServices header={false} />
            <div className='mt-[5rem] lg:px-[6rem] py-[3rem] grid grid-cols-1 md:grid-cols-2 gap-[5rem]'>
                <div className='flex justify-center'>
                    <FormBookAppointment />
                </div>
                <div className='mt-[4rem] space-y-5' data-aos="fade-right" data-aos-duration="1000">
                    <Heading
                        title='Why People Get Services From In Here'
                        description='Ridiculus elit amet sagittis arcu cras ornare, amet a amet urna viIpsum sociosqu. Mi consequat nec, per urna sed consectetuer sed anding modi lorem mattis lorem, tellus mauris ut sed. Vestibulum vehicula in lacus, sit at nullam sit id vitae volutpat, at nunc at, pellentesque dictum diam. Vivamus id tempus nec pellentesque nibh odio, cras accusamus vitae dignissimos nulla,'
                        textAlign='left'
                        bottomBar={true}
                    />
                    <ul className='mt-5 space-y-5'>
                        <li className='flex items-center gap-5'>
                            <AiOutlineCheck className='text-[--main-color]' />
                            <span className='text-[1.2rem] md:text-[1.8rem] text-[--color-grey-500]'>Liver Function Tests. The Liver Function Tests (LFT)ed</span>
                        </li>
                        <li className='flex items-center gap-5'>
                            <AiOutlineCheck className='text-[--main-color]' />
                            <span className='text-[1.2rem] md:text-[1.8rem] text-[--color-grey-500]'>Liver Function Tests. The Liver Function Tests (LFT)ed</span>
                        </li>
                        <li className='flex items-center gap-5'>
                            <AiOutlineCheck className='text-[--main-color]' />
                            <span className='text-[1.2rem] md:text-[1.8rem] text-[--color-grey-500]'>Liver Function Tests. The Liver Function Tests (LFT)ed</span>
                        </li>
                    </ul>
                </div>
            </div>
            <ClientTestimonial />
        </div>
    )
}

export default Services
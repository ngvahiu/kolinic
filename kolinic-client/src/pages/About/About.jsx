import React, { useEffect, useState } from 'react'
import BlogsArea from '../../components/BlogsArea/BlogsArea'
import ExperiencesArea from '../../components/ExperiencesArea/ExperiencesArea'
import { Carousel } from 'antd'
import Heading from '../../ui/Heading/Heading'
import { AiOutlineCheck } from 'react-icons/ai'
import { getServices } from '../../services/apiService.service'

function About() {
    const [services, setServices] = useState([]);

    useEffect(function () {
        async function fetchServices() {
            const res = await getServices({});
            setServices(res);
        }
        fetchServices();
    }, [])

    return (
        <div className="my-[3rem] md:my-[5rem] space-y-[10rem] md:space-y-[15rem]">
            <div className='flex items-center px-[4rem] py-[5rem] border-b-2'>
                <h2 className='text-[1.5rem] md:text-[3rem] text-left px-[8rem] font-extrabold border-r-4 border-[--main-color] w-1/2 h-full'>We Provided Best Service For Good Health</h2>
                <p className='text-[14px] md:text-[18px] text-[--text-note-color] text-left leading-[30px] pl-[3rem] w-1/2'>Suspendisse nulla praesent, neque volutpat lacinia libero nullam ut, in auctor nonummy mi augu massa ult tellus ut integer ultrices facilisis semper.</p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-[4rem]'>
                <Carousel
                    draggable
                    adaptiveHeight dotPosition={"bottom"}
                >
                    {
                        services?.map(service => <div key={service.id}>
                            <img
                                className='w-full h-[360px] md:h-[420px]'
                                src={service.img}
                                alt='service-img'
                            />
                        </div>)
                    }
                </Carousel>
                <div className='mt-[3rem]'>
                    <Heading
                        title="Benefits of Services"
                        description="Ridiculus elit amet sagittis arcu cras ornare, amet a amet urna vicras. Ipsum sociosqu. Mi consequat nec, per urna sed vitae mi lectusn egestas, in consectetuer sed. Nunc id venenatis"
                        textAlign="left"
                        bottomBar={true}
                    />
                    <ul className='mt-5 space-y-5'>
                        <li className='flex items-center gap-5'>
                            <AiOutlineCheck className='text-[--main-color]' />
                            <span className='text-[1.5rem] md:text-[1.8rem] text-[--color-grey-500]'>Liver Function Tests. The Liver Function Tests (LFT)ed</span>
                        </li>
                        <li className='flex items-center gap-5'>
                            <AiOutlineCheck className='text-[--main-color]' />
                            <span className='text-[1.5rem] md:text-[1.8rem] text-[--color-grey-500]'>Full Blood Examination.</span>
                        </li>
                        <li className='flex items-center gap-5'>
                            <AiOutlineCheck className='text-[--main-color]' />
                            <span className='text-[1.5rem] md:text-[1.8rem] text-[--color-grey-500]'>TSH (Thyroid Stimulating Hormone) Quantification Urinalysis.</span>
                        </li>
                        <li className='flex items-center gap-5'>
                            <AiOutlineCheck className='text-[--main-color]' />
                            <span className='text-[1.5rem] md:text-[1.8rem] text-[--color-grey-500]'>INR (International Normalized Ratio)</span>
                        </li>
                    </ul>
                </div>
            </div>
            <ExperiencesArea />
            <BlogsArea />
        </div>
    )
}

export default About
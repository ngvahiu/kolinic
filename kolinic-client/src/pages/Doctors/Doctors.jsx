import React, { useState } from 'react'
import DoctorArea from '../../components/DoctorArea/DoctorArea'
import FormBookAppointment from '../../components/AppointmentArea/FormBookAppointment'
import Heading from '../../ui/Heading/Heading'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa'

function Doctors() {
    const [selectedQuestion, setSelectedQuestion] = useState(0);

    return (
        <div className='my-[5rem]'>
            <DoctorArea />
            <div className='bg-[--color-grey-100] mt-[5rem] px-[6rem] py-[3rem] grid grid-cols-1 md:grid-cols-2 gap-[3rem]'>
                <div className='flex justify-center'>
                    <FormBookAppointment />
                </div>
                <div className='flex flex-col justify-center mt-[2rem] md:mt-0'>
                    <Heading
                        title='Some Common Questions'
                        textAlign='left'
                        bottomBar={true}
                    />
                    <div className='space-y-[1rem] md:space-y-[2rem]'>
                        <QuestionSection
                            id={1}
                            selected={selectedQuestion === 1}
                            question="Why People Choose Us?"
                            setSelectedQuestion={setSelectedQuestion}
                        />
                        <QuestionSection
                            id={2}
                            selected={selectedQuestion === 2}
                            question="Our Mission & Vission?"
                            setSelectedQuestion={setSelectedQuestion}
                        />
                        <QuestionSection
                            id={3}
                            selected={selectedQuestion === 3}
                            question="How to Get Service?"
                            setSelectedQuestion={setSelectedQuestion}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

function QuestionSection({ id, selected, question, setSelectedQuestion }) {
    function handleSelectQuestion() {
        if (selected) setSelectedQuestion(0);
        else setSelectedQuestion(id);
    }

    return (
        <>
            <div className={`flex justify-between items-center bg-[--color-grey-0] p-[1.5rem] md:p-[2rem] rounded-full cursor-pointer border-2 group transition-all duration-300 ${selected ? 'border-[--color-blue-700]' : 'hover:border-[--color-blue-700]'}`} onClick={handleSelectQuestion}>
                <h1 className={`text-[1.3rem] md:text-[1.8rem] font-bold ${selected ? 'text-[--color-blue-700]' : 'group-hover:text-[--color-blue-700]'}`}>{question}</h1>
                {
                    !selected ? <FaAngleUp className='text-[1.3rem] md:text-[1.8rem] group-hover:text-[--color-blue-700]' /> : <FaAngleDown className='text-[--color-blue-700] text-[1.3rem] md:text-[1.8rem]' />
                }
            </div >
            {
                selected && <div className='space-y-[2rem] px-[3rem]'>
                    <h1 className='font-bold'>Our Mission</h1>
                    <p className='text-[--color-grey-500]'>Lorem ipsum dolor sit amet, mi volutpat, aenean potenti facililacus nam lacus, ridiculus aenean eros, nulla id orci. Accumsan veecilisi mauris posuere, facilisis aliquam.</p>
                    <h1 className='font-bold'>Our Vision</h1>
                    <p className='text-[--color-grey-500]'>sollicitudin dolor sit amet, mi volutpat, aenean potenti facilisilacus nam lacus, ridiculus aenean eros, nulla id orci.</p>
                </div>
            }
        </>
    )
}

export default Doctors
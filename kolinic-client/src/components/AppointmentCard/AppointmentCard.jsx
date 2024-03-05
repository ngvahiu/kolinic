import React, { useState } from 'react'
import { FaPhone, FaUser } from 'react-icons/fa';
import { FaHouseMedical } from "react-icons/fa6";
import { IoLocation } from 'react-icons/io5';
import { IoIosTime } from "react-icons/io";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { formatDateHour } from '../../util/helper';
import Button from '../../ui/Button/Button';
import { Modal, Popconfirm } from 'antd';
import ReactStars from 'react-stars';
import { useDispatch } from 'react-redux';
import { cancelAppointmentAction, createFeedbackAction } from '../../redux/appointment.slice';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

function AppointmentCard({ appointment }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [stars, setStars] = useState(0);
    const [text, setText] = useState('');
    const dispatch = useDispatch();

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    function submitFeedback() {
        if (!stars) toast.error('Please give stars rate');
        else if (!text) toast.error('Please write your experience');
        else {
            dispatch(createFeedbackAction({
                stars, text, userId: appointment.user.id, doctorId: appointment.doctor.id, appointmentId: appointment.id
            }));
            setIsModalOpen(false);
        }
    }

    return (
        <div className='grid grid-cols-12 border-2 rounded-2xl overflow-hidden'>
            <div className='col-span-3 flex flex-col border-r-2'>
                <img className='w-full h-[170px] md:h-[200px]' src={appointment.doctor.avatar} alt='doctor' />
                <div className='text-center p-[1rem]'>
                    <p className='text-[--color-grey-800] text-[1.2rem] md:text-[1.4rem] font-semibold'>DOCTOR</p>
                    <Link className='text-[--main-color] text-[1.5rem] md:text-[2rem] font-bold' to={`/doctors/${appointment.doctor.id}`}>{appointment.doctor.name.split('Dr. ')}</Link>
                </div>
            </div>
            <div className='col-span-9 flex flex-col justify-between p-[1.5rem]'>
                <div className='space-y-[1rem]'>
                    <div className='flex items-center gap-[1rem]'>
                        <MdDriveFileRenameOutline className="text-[--main-color] text-[1.4rem] md:text-[1.8rem]" />
                        <span className='text-[--color-grey-900] font-bold text-[1.2rem] md:text-[1.6rem]'>
                            {appointment.patientName} - {appointment.patientAge} years old
                        </span>
                    </div>
                    <div className='flex items-center gap-[1rem]'>
                        <FaUser className="text-[--main-color] text-[1.4rem] md:text-[1.8rem]" />
                        <span className='text-[--color-grey-900] font-semibold text-[1.2rem] md:text-[1.6rem]'>{appointment.gender}</span>
                    </div>
                    <div className='flex items-center gap-[1rem]'>
                        <FaPhone className="text-[--main-color] text-[1.4rem] md:text-[1.8rem]" />
                        <span className='text-[--color-grey-900] font-semibold text-[1.2rem] md:text-[1.6rem]'>{appointment.contact}</span>
                    </div>
                    <div className='flex items-center gap-[1rem]'>
                        <FaHouseMedical className="text-[--main-color] text-[1.4rem] md:text-[1.8rem]" />
                        <span className='text-[--color-grey-900] font-semibold text-[1.2rem] md:text-[1.6rem]'>{appointment.department.name} Department</span>
                    </div>
                    <div className='flex items-center gap-[1rem]'>
                        <IoLocation className="text-[--main-color] text-[1.8rem]" />
                        <span className='text-[--color-grey-900] font-semibold text-[1.2rem] md:text-[1.6rem]'>{appointment.appointmentAddress}</span>
                    </div>
                    <div className='flex items-center gap-[1rem]'>
                        <IoIosTime className="text-[--main-color] text-[1.8rem]" />
                        <span className='text-[--color-grey-900] font-semibold text-[1.2rem] md:text-[1.6rem]'>{formatDateHour(new Date(appointment.appointmentTime))}</span>
                    </div>
                    <i className='text-[1.2rem] md:text-[1.6rem]'>* Please ensure you arrive 15 minutes early</i>
                </div>
                <div className='flex justify-end'>
                    {
                        appointment.completed ? (appointment.feedback ? <ReactStars
                            count={5}
                            value={appointment.feedback.stars}
                            half={false}
                            size={36}
                            edit={false}
                            color2={'#ffd700'}
                        /> : <Button text="Give feedback" onClick={showModal} />)
                            : <Popconfirm
                                title="Cancel appointment ?"
                                description="Are you sure to cancel this appointment ?"
                                okButtonProps={{
                                    style: {
                                        background: 'var(--main-color)'
                                    }
                                }}
                                onConfirm={() => dispatch(cancelAppointmentAction(appointment.id))}
                            >
                                <button className='bg-red-700 hover:bg-red-500 transition-all duration-300 text-[--color-grey-0] px-[1.6rem] md:px-[2rem] py-[0.8rem] md:py-[1rem]'>Cancel</button>
                            </Popconfirm>
                    }
                </div>
                <Modal
                    title={<h1 h1 className='text-[2rem] font-bold'>Give feedback</h1>}
                    open={isModalOpen}
                    onOk={submitFeedback}
                    onCancel={handleCancel}
                    width={500}
                    centered
                    footer={
                        [
                            <Button
                                classNames="mr-2" size='small' type='outline' text="Cancel"
                                onClick={handleCancel}
                            />,
                            <Button
                                classNames="ml-2"
                                size='small'
                                onClick={submitFeedback}
                                text="Submit"
                            />,
                        ]
                    }
                >
                    <p>Rate your satisfaction with the appointment experience</p>
                    <div className='w-full flex justify-center'>
                        <ReactStars
                            count={5}
                            value={stars}
                            half={false}
                            size={36}
                            edit={true}
                            color2={'#ffd700'}
                            onChange={(stars) => setStars(stars)}
                        />
                    </div>
                    <p>Give your experience</p>
                    <textarea
                        className='w-full border-2 border-black p-[10px]'
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </Modal>
            </div>
        </div>
    )
}

export default AppointmentCard
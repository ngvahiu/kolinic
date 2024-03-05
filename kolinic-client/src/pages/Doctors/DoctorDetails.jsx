import React, { useEffect, useState } from 'react'
import SubDoctorCard from '../../components/DoctorArea/SubDoctorCard'
import InformationTable from '../../components/InformationTable/InformationTable'
import SearchBar from '../../components/SearchBar/SearchBar'
import FormBookAppointment from '../../components/AppointmentArea/FormBookAppointment';
import SupportTable from '../../components/SupportTable/SupportTable';
import ReactStars from 'react-stars';
import { Progress } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDoctorAction, getDoctorsAction } from '../../redux/doctor.slice';
import Loading from '../../components/Loading/Loading';
import { format } from 'timeago.js';
import { getDepartmentsAction } from '../../redux/department.slice';

function DoctorDetails() {
    const [value, setValue] = useState([]);
    const { id } = useParams();

    const { doctor, doctors, isLoading } = useSelector(state => state.doctor);
    const { departments } = useSelector(state => state.department);
    const dispatch = useDispatch();

    useEffect(function () {
        dispatch(getDoctorAction(id));
        dispatch(getDoctorsAction({}));
        dispatch(getDepartmentsAction({}));
    }, [id, dispatch])

    if (isLoading) return <Loading />;

    async function searchDoctor(keyword) {
        return doctors?.filter(doctor => doctor.name.toLowerCase().includes(keyword.toLowerCase())).map((doctor) => ({
            label: <Link className='hover:text-[--main-color]' to={`/doctors/${doctor.id}`}>{doctor.name}</Link>,
            value: doctor.id,
        }));
    }

    return (
        <div className='grid grid-cols-12 gap-[2rem]'>
            <div className='col-span-12 xl:col-span-7'>
                {doctor && <SubDoctorCard doctor={doctor} />}
                <div className='mt-[4rem]'>
                    {doctor && <InformationTable doctor={doctor} />}
                </div>
                <div className='mt-[4rem]'>
                    <h1 className='text-[--color-grey-900] text-[2rem] font-bold'>{doctor?.feedbacks?.length} Feedbacks</h1>
                    {doctor?.feedbacks && <StatisticsFeedBack feedbacks={doctor?.feedbacks} />}
                    {
                        doctor?.feedbacks?.map(feedback => <FeedBack feedback={feedback} key={feedback.id} />)
                    }
                </div>
            </div>
            <div className='col-span-12 xl:col-span-5 mt-[3rem] xl:mt-0'>
                <SearchBar
                    value={value}
                    placeholder="Find doctors"
                    fetchOptions={searchDoctor}
                    onChange={(newValue) => {
                        setValue(newValue);
                    }}
                    style={{
                        width: '100%',
                        height: '50px'
                    }}
                />
                <div className='mt-[3rem]'>
                    <SupportTable
                        title="Other Doctors"
                        renderContent={doctors?.map(doctor => <div className='p-[1.5rem] border-b-2' key={doctor.id}>
                            <Link className='text-[1.5rem] text-[--color-grey-500] font-semibold hover:text-[--main-color]' to={`/doctors/${doctor.id}`}>
                                {doctor.name}
                            </Link>
                        </div>)}
                    />
                </div>
                <div className='mt-[3rem] flex justify-center'>
                    <FormBookAppointment doctors={doctors} departments={departments} />
                </div>
            </div>
        </div>
    )
}

function StatisticsFeedBack({ feedbacks }) {
    function calculateAvgStars() {
        if (feedbacks.length === 0) return 0;
        const sum = feedbacks.reduce((sum, feedback) => sum += +feedback.stars, 0);
        return Math.ceil(sum / feedbacks.length).toFixed(1);
    }

    return (
        <div className='flex items-center justify-center px-[4rem]'>
            <div className='flex flex-col items-center pr-[4rem] border-r-2'>
                <h1 className='text-[--color-grey-900] text-[5rem] font-bold'>{calculateAvgStars()}</h1>
                <ReactStars
                    count={5}
                    value={calculateAvgStars()}
                    size={24}
                    edit={false}
                    color2={'#ffd700'}
                />
                <span className='text-[--color-grey-400] text-[1.5rem]'>{feedbacks.length} feedback(s)</span>
            </div>
            <div className='spacey-y-2 pl-[4rem] flex-grow'>
                <div className='flex gap-4'>
                    <span className='text-[--color-grey-400] text-[1.4rem]'>5</span>
                    <Progress strokeColor={'#ffd700'} trailColor={'#d1d5db'} percent={
                        feedbacks.filter(f => +f.stars === 5).length / feedbacks.length * 100
                    } showInfo={false} />
                </div>
                <div className='flex gap-4'>
                    <span className='text-[--color-grey-400] text-[1.4rem]'>4</span>
                    <Progress strokeColor={'#ffd700'} trailColor={'#d1d5db'} percent={
                        feedbacks.filter(f => +f.stars === 4).length / feedbacks.length * 100
                    } showInfo={false} />
                </div>
                <div className='flex gap-4'>
                    <span className='text-[--color-grey-400] text-[1.4rem]'>3</span>
                    <Progress strokeColor={'#ffd700'} trailColor={'#d1d5db'} percent={
                        feedbacks.filter(f => +f.stars === 3).length / feedbacks.length * 100
                    } showInfo={false} />
                </div>
                <div className='flex gap-4'>
                    <span className='text-[--color-grey-400] text-[1.4rem]'>2</span>
                    <Progress strokeColor={'#ffd700'} trailColor={'#d1d5db'} percent={
                        feedbacks.filter(f => +f.stars === 2).length / feedbacks.length * 100
                    } showInfo={false} />
                </div>
                <div className='flex gap-4'>
                    <span className='text-[--color-grey-400] text-[1.4rem]'>1</span>
                    <Progress strokeColor={'#ffd700'} trailColor={'#d1d5db'} percent={
                        feedbacks.filter(f => +f.stars === 1).length / feedbacks.length * 100
                    } showInfo={false} />
                </div>
            </div>
        </div>
    )
}

function FeedBack({ feedback }) {
    return (
        <div className='flex justify-between items-center gap-[2rem] py-[2rem] border-b-2'>
            <img className='w-[80px] h-[80px] rounded-full' src={feedback.user.avatar || "https://invisiblechildren.com/wp-content/uploads/2012/07/facebook-profile-picture-no-pic-avatar.jpg"} alt='avt1' />
            <div className='flex-grow'>
                <div className='flex justify-between items-center'>
                    <div className='space-y-[0.5rem]'>
                        <p className='text-[--color-grey-900] text-[2.4rem] font-bold'>{feedback.user.name}</p>
                        <div className='flex items-center gap-3 text-[--color-grey-600] text-[1.5rem] font-bold'>
                            <span>{format(feedback.createdAt)}</span>
                            <span>•</span>
                            <div className='flex items-center gap-[1rem]'>
                                <ReactStars
                                    count={5}
                                    value={feedback.stars}
                                    half={false}
                                    size={24}
                                    edit={true}
                                    color2={'#ffd700'}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <p className='text-[1.8rem] text-[--color-grey-500] leading-[1.8rem] mt-[2rem]'>{feedback.text}</p>
            </div>
        </div>
    )
}

export default DoctorDetails
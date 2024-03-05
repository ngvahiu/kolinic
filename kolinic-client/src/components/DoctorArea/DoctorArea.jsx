import React, { useEffect, useState } from 'react'
import DoctorCard from './DoctorCard'
import Heading from '../../ui/Heading/Heading'
import { useDispatch, useSelector } from 'react-redux';
import { getDoctorsAction } from '../../redux/doctor.slice';
import Loading from '../Loading/Loading';

function DoctorArea() {
    const { doctors, isLoading } = useSelector(state => state.doctor);
    const dispatch = useDispatch();

    useEffect(function () {
        dispatch(getDoctorsAction({}));
    }, [dispatch]);

    if (isLoading) return <Loading />;

    return (
        <div className='md:px-20 mt-28'>
            <Heading 
                title='Our Expert Doctor'
                description='Condimentum rutrum placerat egestas condimentum mi eros. Eleifend cras quirntum Feugiat elit placerat. Diam tempor malesuada.'
            />
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-5'>
                {
                    doctors?.map(doctor => <DoctorCard doctor={doctor} key={doctor.id} />)
                }
            </div>
        </div>
    )
}

export default DoctorArea
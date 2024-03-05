import React, { useEffect } from 'react'
import ServiceCard from './ServiceCard'
import Heading from '../../ui/Heading/Heading'
import { useDispatch, useSelector } from 'react-redux';
import { getServicesAction } from '../../redux/service.slice.js';
import Loading from '../Loading/Loading.jsx';

function OurServices({ header = true }) {
    const { services, isLoading } = useSelector(state => state.service);
    const dispatch = useDispatch();

    useEffect(function () {
        dispatch(getServicesAction({}));
    }, [dispatch]);

    if (isLoading) return <Loading />;

    return (
        <div className='mt-[5rem] md:px-24 bg-section'>
            {
                header && <Heading
                    title='Our Services'
                    description='Condimentum rutrum placerat egestas condimentum mi eros. Eleifend cras quirntum Feugiat elit placerat. Diam tempor malesuada.'
                    textAlign='center'
                />
            }
            <div className='mt-3 grid grid-cols-1 md:grid-cols-3'>
                {
                    services.map(service => <ServiceCard service={service} key={service.id} />)
                }
            </div>
        </div>
    )
}

export default OurServices
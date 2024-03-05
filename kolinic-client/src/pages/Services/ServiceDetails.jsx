import React, { useEffect, useState } from 'react'
import { AiOutlineCheck } from 'react-icons/ai';
import SearchBar from '../../components/SearchBar/SearchBar';
import SupportTable from '../../components/SupportTable/SupportTable';
import FormBookAppointment from '../../components/AppointmentArea/FormBookAppointment';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getServiceAction, getServicesAction } from '../../redux/service.slice';
import Loading from '../../components/Loading/Loading';

function ServiceDetails() {
    const [value, setValue] = useState([]);
    const { id } = useParams();

    const { service, services, isLoading } = useSelector(state => state.service);
    const dispatch = useDispatch();

    useEffect(function () {
        dispatch(getServiceAction(id));
        dispatch(getServicesAction({}));
    }, [id, dispatch])

    if(isLoading) return <Loading />;

    async function searchService(keyword) {
        return services?.filter(service => service.name.toLowerCase().includes(keyword.toLowerCase())).map((service) => ({
            label: <Link className='hover:text-[--main-color]' to={`/services/${service.id}`}>{service.name}</Link>,
            value: service.id,
        }));
    }

    return (
        <div className='grid grid-cols-12 gap-[2rem]'>
            <div className='col-span-12 xl:col-span-7 pr-[2rem]'>
                <h1 className='text-[3rem] md:text-[4rem] xl:text-[5rem] text-[--color-grey-900] font-extrabold'>{service?.name}</h1>
                <p className='mt-[2rem] text-[1.2rem] md:text-[1.8rem] text-[--color-grey-400] text-justify'>
                    {service?.description}
                </p>
                <ul className='mt-5 space-y-5'>
                    {
                        service?.functions.split("/").map((func, index) => <li className='flex items-center gap-5' key={index}>
                            <AiOutlineCheck className='text-[--main-color]' />
                            <span className='text-[1.2rem] md:text-[1.8rem] text-[--color-grey-400]'>{func}</span>
                        </li>)
                    }
                </ul>
                <img
                    className='w-full h-[380px] md:h-[420px] rounded-2xl mt-[2rem]'
                    src={service?.img}
                    alt='service-img'
                />
                <div className='my-[2rem]'>
                    <h1 className='text-[1.8rem] md:text-[2.5rem] text-[--color-grey-900] font-bold'>
                        Benefits of {service?.name} Services
                    </h1>
                    <p className='mt-[2rem] text-[1.2rem] md:text-[1.8rem] text-[--color-grey-400] text-justify'>{service?.benefits}</p>
                </div>
            </div>
            <div className='col-span-12 xl:col-span-5'>
                <SearchBar
                    value={value}
                    placeholder="Find services"
                    fetchOptions={searchService}
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
                        title="Other Services"
                        renderContent={services.map(service => <div className='p-[1.5rem] border-b-2' key={service.id}>
                            <Link className='text-[1.5rem] text-[--color-grey-500] font-semibold hover:text-[--main-color]' to={`/services/${service.id}`}>
                                {service.name}
                            </Link>
                        </div>)}
                    />
                </div>
                <div className='mt-[3rem] flex justify-center'>
                    <FormBookAppointment effect={false} />
                </div>
            </div>
        </div>
    )
}

export default ServiceDetails
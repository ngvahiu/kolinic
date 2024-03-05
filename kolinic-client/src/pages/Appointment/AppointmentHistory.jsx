import React, { useEffect } from 'react'
import AppointmentCard from '../../components/AppointmentCard/AppointmentCard'
import { useDispatch, useSelector } from 'react-redux'
import { getMyAppointmentsAction } from '../../redux/appointment.slice';

function AppointmentHistory() {
    const { appointments } = useSelector(state => state.appointment);
    const dispatch = useDispatch();
    useEffect(function () {
        dispatch(getMyAppointmentsAction({}));
    }, [dispatch])

    return (
        <div className='w-full grid grid-cols-1 lg:grid-cols-2 gap-x-[2rem] gap-y-[3rem]'>
            {
                appointments?.map(appointment => <AppointmentCard appointment={appointment} key={appointment.id} />)
            }
        </div>
    )
}

export default AppointmentHistory
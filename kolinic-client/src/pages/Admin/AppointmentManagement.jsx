import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { cancelAppointmentAction, completeAppointmentAction, getAppointmentsForAdminAction } from '../../redux/appointment.slice';
import { Button, Space, Table, Tag } from 'antd';
import { formatDateHour } from '../../util/helper';
import Heading from '../../ui/Heading/Heading';

function AppointmentManagement() {
    const { appointments, isUpdating } = useSelector(state => state.appointment);
    const dispatch = useDispatch();

    useEffect(function () {
        dispatch(getAppointmentsForAdminAction({}));
    }, [dispatch]);

    const columns = useMemo(() => [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            render: (text) => <p>{text}</p>,
            sorter: (a, b) => +a.id - +b.id
        },
        {
            title: 'Patient name',
            dataIndex: 'patientName',
            key: 'patientName',
            render: (text) => <p>{text}</p>,
        },
        {
            title: 'Patient age',
            dataIndex: 'patientAge',
            key: 'patientAge',
            render: (text) => <p>{text}</p>,
        },
        {
            title: 'Contact',
            dataIndex: 'contact',
            key: 'contact',
            render: (text) => <p>{text}</p>,
        },
        {
            title: 'Time',
            dataIndex: 'appointmentTime',
            key: 'appointmentTime',
            render: (text) => <p className='inline'>{formatDateHour(new Date(text))}</p>,
        },
        {
            title: 'Doctor',
            dataIndex: 'doctor',
            key: 'doctor',
            render: (_, { doctor }) => <p>{doctor.name}</p>,
        },
        {
            title: 'Is completed',
            dataIndex: 'completed',
            key: 'completed',
            render: (text) => text ? <Tag color='lime-inverse'>TRUE</Tag> : <Tag color='red-inverse'>FALSE</Tag>,
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, { id, completed }) => (
                <Space size="small">
                    {!completed && <Button size='small' type='primary' disabled={isUpdating} onClick={() => dispatch(completeAppointmentAction(id))}>COMPLETE</Button>}
                    <Button size='small' danger onClick={() => dispatch(cancelAppointmentAction(id))}>Delete</Button>
                </Space>
            ),
        },
    ], []);

    return (
        <div className='text-right'>
            <Heading title="APPOINTMENT MANAGEMENT" textAlign='left' size='middle' />
            <Table columns={columns} dataSource={appointments} pagination={{
                pageSize: 10,
                pageNo: 0,
            }} showSorterTooltip />
        </div>
    )
}

export default AppointmentManagement
import { Button, Space, Tag, Input, Table } from 'antd';
import React, { useEffect, useMemo, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Heading from '../../ui/Heading/Heading';
import MyButton from '../../ui/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { deleteDoctorAction, getDoctorsAction } from '../../redux/doctor.slice';
import { getDepartmentsAction } from '../../redux/department.slice';
import { formatDate } from '../../util/helper';

const { Search } = Input;

function DoctorManagement() {
    const navigate = useNavigate();
    const { doctors } = useSelector(state => state.doctor);
    const { departments } = useSelector(state => state.department);
    const dispatch = useDispatch();

    useEffect(function () {
        dispatch(getDoctorsAction({}));
        dispatch(getDepartmentsAction({}));
    }, [dispatch]);

    const columns = useMemo(() => [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            render: (text) => <a>{text}</a>,
            sorter: (a, b) => +a.id - +b.id
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (_, { name, id }) => <Link className='font-semibold' to={`/admin/doctors/${id}`}>{name}</Link>,
        },
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (_, { avatar }) => <div className='w-full flex justify-center'>
                <img className='w-[80px] h-[80px]' src={avatar} alt='img' />
            </div>,
            width: '10%'
        },
        {
            title: 'About',
            dataIndex: 'about',
            key: 'about',
            render: (text) => <p>{text.length > 60 ? text.slice(0, 60) + "..." : text}</p>,
        },
        {
            title: 'Education',
            dataIndex: 'education',
            key: 'education',
            render: (text) => <p>{text}</p>,
        },
        {
            title: 'Dob',
            dataIndex: 'dob',
            key: 'dob',
            render: (text) => <p className='inline'>{formatDate(new Date(text))}</p>,
        },
        {
            title: 'Department',
            dataIndex: 'department',
            key: 'department',
            render: (_, { department }) => <Tag color='green-inverse'>{department.name}</Tag>,
            filters: departments.map(department => ({
                text: department.name,
                value: department.id,
            })),
            onFilter: (value, record) => record.department.id === value,
            filterSearch: true,
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, { id }) => (
                <Space size="small">
                    <Button size='small' type='primary' onClick={() => navigate(`/admin/doctors/${id}`)}>EDIT</Button>
                    <Button size='small' danger onClick={() => dispatch(deleteDoctorAction(id))}>Delete</Button>
                </Space>
            ),
        },
    ], [departments]);

    const timerRef = useRef();
    const handleSearch = (event) => {
        clearTimeout(timerRef);

        timerRef.current = setTimeout(() => {
            dispatch(getDoctorsAction({ search: event.target.value }));
        }, 1000);
    }

    return (
        <div className='text-right'>
            <Heading title="DOCTOR MANAGEMENT" textAlign='left' size='middle' />
            <Search
                className='w-[250px] text-[1rem]'
                placeholder="Search by name"
                onChange={handleSearch}
                onPressEnter={(event) => dispatch(getDoctorsAction({ search: event.target.value }))}
                allowClear
                enterButton
            />
            <br />
            <MyButton classNames="my-[1rem]" size='small' text="Create doctor" onClick={() => navigate('/admin/doctors/create-doctor')} />
            <Table className='border-2' columns={columns} dataSource={doctors} pagination={{
                pageSize: 10,
                pageNo: 0,
            }} showSorterTooltip />
        </div>
    )
}

export default DoctorManagement
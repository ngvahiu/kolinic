import React, { useEffect, useMemo, useRef } from 'react'
import { Button, Input, Space, Table, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { activateUserAction, deleteUserAction, getUsersAction } from '../../redux/user.slice';
import Heading from '../../ui/Heading/Heading';
const { Search } = Input;

function UserManagement() {
    const { users } = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(function () {
        dispatch(getUsersAction());
    }, [dispatch])

    const columns = useMemo(() => [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            render: (text) => <a>{text}</a>,
            sorter: (a, b) => +a.id - +b.id
        },
        {
            title: 'Full name',
            dataIndex: 'fullName',
            key: 'fullName',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Phone number',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            filters: [
                {
                    text: 'ADMIN',
                    value: 'ADMIN',
                },
                {
                    text: 'USER',
                    value: 'USER',
                },
            ],
            onFilter: (value, record) => record.role === value,
            filterSearch: true,
        },
        {
            title: 'Active',
            dataIndex: 'active',
            key: 'active',
            render: (_, { active }) => active ? <Tag color='green'>ACTIVE</Tag> : <Tag color='red'>INACTIVE</Tag>,
            filters: [
                {
                    text: 'Active',
                    value: true,
                },
                {
                    text: 'Inactive',
                    value: false,
                },
            ],
            onFilter: (value, record) => record.active === value,
            filterSearch: true,
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, { id, active }) => (
                <Space size="small">
                    <Button size='small' type='primary' onClick={() => dispatch(activateUserAction({
                        id,
                        value: !active
                    }))}>
                        {active ? 'DEACTIVATE' : 'ACTIVATE'}
                    </Button>
                    <Button size='small' danger onClick={() => dispatch(deleteUserAction(id))}>Delete</Button>
                </Space>
            ),
        },
    ], [dispatch]);

    const timerRef = useRef();
    const handleSearch = (event) => {
        clearTimeout(timerRef);

        timerRef.current = setTimeout(() => {
            dispatch(getUsersAction(event.target.value));
        }, 1000);
    }

    return <div className='text-right'>
        <Heading title="USER MANAGEMENT" textAlign='left' size='middle' />
        <Search
            className='w-[250px] text-[1rem]'
            placeholder="Search by name or email"
            onChange={handleSearch}
            onPressEnter={(event) => dispatch(getUsersAction({ search: event.target.value }))}
            allowClear
            enterButton
        />
        <Table columns={columns} dataSource={users} pagination={{
            pageSize: 10,
            pageNo: 0,
        }} showSorterTooltip scroll={{ x: true }} />
    </div>
}

export default UserManagement
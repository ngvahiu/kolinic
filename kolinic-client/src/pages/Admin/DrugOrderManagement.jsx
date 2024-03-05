import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { cancelDrugOrderAction, getDrugOrdersForAdminAction, updateOrderStatusAction } from '../../redux/drug.slice';
import { Button, Popconfirm, Popover, Select, Space, Table, Tag } from 'antd';
import { formatDateHour } from '../../util/helper';
import Heading from '../../ui/Heading/Heading';

function DrugOrderManagement() {
    const { drugOrders } = useSelector(state => state.drug);
    const dispatch = useDispatch();

    useEffect(function () {
        dispatch(getDrugOrdersForAdminAction({}));
    }, [dispatch]);

    const [status, setStatus] = useState("CONFIRMING");
    const columns = useMemo(() => [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            render: (text) => <p>{text}</p>,
            sorter: (a, b) => +a.id - +b.id
        },
        {
            title: "Receiver's name",
            dataIndex: 'receiverName',
            key: 'receiverName',
            render: (text) => <p>{text}</p>,
        },
        {
            title: 'Contact',
            dataIndex: 'contactNumber',
            key: 'contactNumber',
            render: (text) => <p>{text}</p>,
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            render: (text) => <p>{text}</p>,
        },
        {
            title: 'Order date',
            dataIndex: 'orderDate',
            key: 'orderDate',
            render: (text) => <p>{formatDateHour(new Date(text))}</p>,
        },
        {
            title: 'Payment',
            dataIndex: 'paymentMethod',
            key: 'paymentMethod',
            render: (text) => <Tag color='blue-inverse'>{text}</Tag>,
        },
        {
            title: 'Status',
            dataIndex: 'orderStatus',
            key: 'orderStatus',
            render: (text) => <Tag color='green'>{text}</Tag>
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, { id, orderStatus }) => (
                <Space size="small">
                    <Popover
                        placement="topLeft"
                        title={null}
                        content={
                            <Space className='text-right' direction='vertical'>
                                <Select className='z-auto' value={status} onChange={(v) => setStatus(v)}>
                                    <Select.Option value="CONFIRMING">CONFIRMING</Select.Option>
                                    <Select.Option value="CONFIRMED">CONFIRMED</Select.Option>
                                    <Select.Option value="DELIVERING">DELIVERING</Select.Option>
                                </Select>
                                <Button type='primary' size='small' onClick={() => {
                                    if (status !== orderStatus) dispatch(updateOrderStatusAction({ id, status }))
                                }}>
                                    OK
                                </Button>
                            </Space>
                        }
                        onOpenChange={(open) => {
                            if (open) setStatus(orderStatus)
                        }}
                        trigger="click"
                    >
                        <Button size='small' type='primary'>CHANGE STATUS</Button>
                    </Popover>
                    <Button size='small' danger onClick={() => dispatch(cancelDrugOrderAction(id))}>Delete</Button>
                </Space>
            ),
        },
    ], [status]);

    return (
        <div className='text-right'>
            <Heading title="DRUG ORDER MANAGEMENT" textAlign='left' size='middle' />
            {/* <Search
                className='w-[250px] text-[1rem]'
                placeholder="Search by name"
                onChange={handleSearch}
                onPressEnter={(event) => dispatch(getDrugsAction({ search: event.target.value }))}
                allowClear
                enterButton
            /> */}
            <br />
            <Table className='border-2' columns={columns} dataSource={drugOrders} pagination={{
                pageSize: 10,
                pageNo: 0,
            }} showSorterTooltip />
        </div>
    )
}

export default DrugOrderManagement
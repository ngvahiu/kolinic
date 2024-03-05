import React, { useEffect } from 'react'
import DrugsOrderDetails from './DrugsOrderDetails'
import { Tabs } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getDrugOrdersAction } from '../../redux/drug.slice';

function DrugsOrdersHistory() {
    const { drugOrders } = useSelector(state => state.drug);
    const dispatch = useDispatch();

    useEffect(function () {
        dispatch(getDrugOrdersAction({}));
    }, [dispatch]);

    
    const items = [
        {
            key: '1',
            label: 'All',
            children: <DrugsOrdersContent drugOrders={drugOrders} />,
        },
        {
            key: '2',
            label: 'Confirming',
            children: <DrugsOrdersContent drugOrders={drugOrders.filter(drugOrder => drugOrder.orderStatus === "CONFIRMING")} />,
        },
        {
            key: '3',
            label: 'Confirmed',
            children: <DrugsOrdersContent drugOrders={drugOrders.filter(drugOrder => drugOrder.orderStatus === "CONFIRMED")} />,
        },
        {
            key: '4',
            label: 'Delivering',
            children: <DrugsOrdersContent drugOrders={drugOrders.filter(drugOrder => drugOrder.orderStatus === "DELIVERING")} />,
        },
        {
            key: '5',
            label: 'Received',
            children: <DrugsOrdersContent drugOrders={drugOrders.filter(drugOrder => drugOrder.orderStatus === "RECEIVED")} />,
        },
    ];

    return <Tabs defaultActiveKey="1" size='large' items={items} />;
}

function DrugsOrdersContent({ drugOrders }) {
    return <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[1rem]'>
        {
            drugOrders.map(drugOrder => <DrugsOrderDetails drugOrder={drugOrder} key={drugOrder.id} />)
        }
    </div>
}

export default DrugsOrdersHistory
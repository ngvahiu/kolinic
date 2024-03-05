import React, { useMemo, useState } from 'react'
import { SlBag } from "react-icons/sl";
import { Button, Modal, Table } from 'antd';
import { FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, decreaseItemQuantity, deleteItem, getCart, getTotalCartPrice, getTotalCartQuantity, increaseItemQuantity } from '../../redux/cart.slice';
import { Link, useNavigate } from 'react-router-dom';
import MyButton from '../../ui/Button/Button';

function CartModal() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const cart = useSelector(getCart);
    const totalQuantity = useSelector(getTotalCartQuantity);
    const totalPrice = useSelector(getTotalCartPrice);
    const dispatch = useDispatch();

    const columns = useMemo(() => [
        {
            title: '',
            dataIndex: 'img',
            key: 'img',
            render: (_, { img }) => <img className='w-[80px] h-[80px]' src={img} alt='drug-img' />
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (_, { id, name }) => <Link to={`/drugs/${id}`} className='cursor-pointer hover:text-[--main-color]'>{name}</Link>
        },
        {
            title: 'Unit price',
            dataIndex: 'price',
            key: 'price',
            render: (_, { price }) => <span className='text-[--main-color]'>$ {price}</span>
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (_, { id, quantity }) => <div className='flex justify-center items-center gap-2'>
                <Button size='small' onClick={() => dispatch(decreaseItemQuantity(id))}>-</Button>
                <span className='text-[--color-grey-500]'>{quantity}</span>
                <Button size='small' onClick={() => dispatch(increaseItemQuantity(id))}>+</Button>
            </div>
        },
        {
            title: 'Sub total',
            dataIndex: 'subTotal',
            key: 'subTotal',
            render: (_, { price, quantity }) => <span className='text-[--main-color]'>$ {price * quantity}</span>
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, { id }) => (
                <button className='text-red-500' onClick={() => dispatch(deleteItem(id))}>
                    <FaTrash />
                </button>
            ),
        },
    ], []);


    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
        navigate('/checkout');
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <button className='relative' onClick={showModal}>
                <SlBag size={30} />
                <div className='w-[1.6rem] h-[1.6rem] text-[1rem] text-[--main-color] rounded-full bg-white flex items-center justify-center absolute top-0 left-3/4'>{totalQuantity}</div>
            </button>
            <Modal
                title={<h1 className='text-[2rem] font-bold'>SHOPPING CART</h1>}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                width={800}
                centered
                footer={cart.length > 0 && [
                    <MyButton
                        classNames="mr-2" size='small' type='outline' text="Clear Cart"
                        onClick={() => dispatch(clearCart())}
                    />,
                    <MyButton
                        classNames="ml-2"
                        size='small'
                        onClick={handleOk}
                        text="→ CHECKOUT"
                    />,
                ]}
            >
                <Table columns={columns} dataSource={cart} pagination={false} />
                <div className='w-full flex justify-end items-center gap-[2rem]'>
                    <span className='text-[1.8rem] text-[--color-grey-600] font-bold'>Total</span>
                    <span className='text-[1.8rem] text-[--main-color] font-bold'>$ {totalPrice.toFixed(2)}</span>
                </div>
            </Modal>
        </>
    )
}

export default CartModal
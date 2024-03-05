import React from 'react'
import { FaCheck } from 'react-icons/fa6'
import { IoMdClose } from 'react-icons/io'
import { formatDateHour } from '../../util/helper'
import { Popconfirm, Popover } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { cancelDrugOrderAction, updateOrderStatusAction } from '../../redux/drug.slice'

function DrugsOrderDetails({ drugOrder }) {
  const { isCanceling, isUpdating } = useSelector(state => state.drug);
  const dispatch = useDispatch();

  return (
    <div className='w-full px-[1.5rem] py-[1rem] rounded-2xl shadow-xl'>
      <div className='space-y-[0.3rem]'>
        <p className='font-bold text-[1.8rem]'>Order #{drugOrder.id}</p>
        <p className='text-[--color-grey-400] text-[1.6rem]'>{formatDateHour(new Date(drugOrder.orderDate))}</p>
      </div>
      <div className='space-y-[1.2rem] mt-[1rem]'>
        <DrugsOrderRow item={drugOrder.drugOrderItems[0]} />
        {
          drugOrder.drugOrderItems.length > 1 && <Popover
            content={drugOrder.drugOrderItems.filter((item, index) => index !== 0).map((item, index) => <DrugsOrderRow item={item} key={index} />)}
            trigger="click"
          >
            <button className='w-full text-[--color-grey-400] text-[1.2rem] text-center outline-none hover:underline'>Watch more items</button>
          </Popover>
        }
        <div className='flex justify-between items-center mt-[1.5rem]'>
          <div>
            <p className='text-[--color-grey-400] text-[1.4rem]'>X{drugOrder.drugOrderItems.length} items</p>
            <p className='font-bold text-[1.6rem]'>
              $ {drugOrder.drugOrderItems.reduce((acc, drugOrderItem) => acc + drugOrderItem.drug.price * drugOrderItem.quantity, 0).toFixed(2)}
            </p>
          </div>
          <div className='flex items-center gap-[0.5rem]'>
            {
              (drugOrder.orderStatus !== "DELIVERING" && drugOrder.orderStatus !== "RECEIVED") && <Popconfirm
                title="Cancel order ?"
                description="Are you sure to cancel this order ? All items you selected will be removed"
                okButtonProps={{
                  style: {
                    background: 'var(--main-color)'
                  }
                }}
                onConfirm={() => dispatch(cancelDrugOrderAction(drugOrder.id))}
              >
                <button
                  className='border-2 border-red-600 text-red-600 hover:bg-red-300 rounded-xl px-[1rem] py-[0.7rem] hover:text-[--color-grey-0] flex items-center'
                  disabled={isCanceling}
                >
                  <IoMdClose /> Cancel
                </button>
              </Popconfirm>
            }
            {
              drugOrder.orderStatus === "DELIVERING" && <button
                className='border-2 border-green-600 text-green-600 hover:bg-green-300 rounded-xl px-[1rem] py-[0.7rem] hover:text-[--color-grey-0] flex items-center'
                disabled={isUpdating}
                onClick={() => dispatch(updateOrderStatusAction({ id: drugOrder.id, status: "RECEIVED" }))}
              >
                <FaCheck /> Received
              </button>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

function DrugsOrderRow({ item }) {
  return <div className='border-b-2 grid grid-cols-3'>
    <img
      className='w-[80px] sm:w-full md:w-[80px] h-[100px]'
      src={item.drug.img}
      alt='drug'
    />
    <div className='col-span-2'>
      <p className='font-bold text-[1.6rem]'>{item.drug.name}</p>
      <p className='text-[--color-grey-400] text-[1.2rem]'>{item.drug.category.title.toUpperCase()}</p>
      <p className='font-bold text-[1.4rem] flex justify-between mt-[0.8rem]'>
        <span>${item.drug.price}</span>
        <span>Qty: {item.quantity}</span>
      </p>
    </div>
  </div>
}

export default DrugsOrderDetails


import React from 'react'
import { Link } from 'react-router-dom'

function SmallDrugCard({ drug: { name, category, price, img, id } }) {
    return (
        <div className='group w-full border-2 rounded-xl overflow-hidden h-[400px]'>
            <div className='w-full h-[300px] overflow-hidden'>
                <img className='w-full h-full group-hover:scale-110 transition-all duration-300' src={img} alt='drug' />
            </div>
            <div className='mx-[1rem] py-[2rem] flex items-center justify-between border-t-2'>
                <div className='flex flex-col'>
                    <p className='text-[1.2rem] text-[--color-grey-400] uppercase inline-block'>{category.title.toUpperCase()}</p>
                    <Link className='cursor-pointer text-[1.6rem] text-[--color-grey-900] font-bold group-hover:text-[--main-color]' to={`/drugs/${id}`}>{name}</Link>
                </div>
                <div className='text-[1.4rem] text-center text-[--main-color] font-bold inline-block'>${price}</div>
            </div>
        </div>
    )
}

export default SmallDrugCard
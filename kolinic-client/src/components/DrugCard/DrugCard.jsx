import React, { useState } from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { addItem } from '../../redux/cart.slice';

function DrugCard({ drug: { id, category, name, price, remaining, img } }) {
    const [quantity, setQuantity] = useState(0);

    const dispatch = useDispatch();

    function handleAddDrug() {
        if (quantity > 0) {
            dispatch(addItem({ id, category, name, price, remaining, img, quantity }));
        }
    }

    return (
        <div className='flex justify-center'>
            <div className='group w-[300px] sm:w-full border-2 rounded-xl cursor-pointer hover:shadow-xl overflow-hidden'>
                <div className='w-full h-[200px] sm:h-[220px] md:h-[250px] lg:h-[270px] xl:h-[300px] overflow-hidden'>
                    <img className='w-full h-full group-hover:scale-110 transition-all duration-300' src={img} alt='drug-img' />
                </div>
                <div className='px-[1rem]'>
                    <div className='text-right py-[1.5rem] border-b-2'>
                        <p className='text-[1.2rem] text-[--color-grey-400] uppercase'>{category.title.toUpperCase()}</p>
                        <Link to={`/drugs/${id}`} className='text-[1.6rem] text-[--color-grey-900] font-bold group-hover:text-[--main-color]'>{name}</Link>
                    </div>
                    <div className='flex justify-between items-center'>
                        <div className='flex flex-col py-[2rem]'>
                            <button
                                className='flex justify-center items-center w-[50px] h-[50px] bg-[--color-grey-200] hover:bg-[--main-color] text-[--color-grey-900] hover:text-[--color-grey-0] rounded-lg'
                                onClick={handleAddDrug}
                            >
                                <AiOutlineShoppingCart className='text-[1.8rem] font-extrabold' />
                            </button>
                            <div className='flex items-center mt-[1rem]'>
                                <div className='flex items-center'>
                                    <input className='text-center w-[40px] h-[40px] border-2' type='number' value={quantity} min={0} />
                                    <div className='flex flex-col'>
                                        <button
                                            className='flex items-center justify-center w-[20px] h-[20px] border-2'
                                            onClick={() => {
                                                if (quantity < remaining) setQuantity(quantity => quantity + 1)
                                            }}
                                        >
                                            +
                                        </button>
                                        <button
                                            className='flex items-center justify-center w-[20px] h-[20px] border-2'
                                            onClick={() => {
                                                if (quantity > 0) setQuantity(quantity => quantity - 1)
                                            }}
                                        >
                                            -
                                        </button>
                                    </div>
                                    <span className='ml-[1rem] text-[1.4rem] text-[--color-grey-500]'>{remaining} remaining</span>
                                </div>
                            </div>
                        </div>
                        <div className='text-[1.8rem] text-[--color-grey-900] font-bold'>$ {price}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DrugCard
import React, { useEffect, useState } from 'react'
import { IoCartOutline } from "react-icons/io5";
import { FaCheck } from 'react-icons/fa';
import Button from '../../ui/Button/Button';
import Slider from 'react-slick';
import SmallDrugCard from '../../components/DrugCard/SmallDrugCard';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDrugAction, getDrugsAction } from '../../redux/drug.slice';
import Loading from '../../components/Loading/Loading';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { addItem } from '../../redux/cart.slice';

function DrugsDetails() {
    const [quantity, setQuantity] = useState(0);
    const { id } = useParams();

    const { drug, drugs, isLoading } = useSelector(state => state.drug);
    const dispatch = useDispatch();

    useEffect(function () {
        dispatch(getDrugsAction({}));
        dispatch(getDrugAction(id));
    }, [id, dispatch])

    if (isLoading) return <Loading />;

    return (
        <>
            <div className='grid grid-cols-12 gap-0 md:gap-[4rem]'>
                <div className='col-span-12 sm:col-span-5'>
                    <TransformWrapper
                        initialScale={1}
                        initialPositionX={200}
                        initialPositionY={100}
                    >
                        {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                            <React.Fragment>
                                <TransformComponent>
                                    <img
                                        className='w-full h-full cursor-pointer'
                                        src={drug?.img}
                                        alt='drug'
                                    />
                                </TransformComponent>
                            </React.Fragment>
                        )}
                    </TransformWrapper>
                </div>
                <div className='flex flex-col justify-evenly col-span-12 sm:col-span-7'>
                    <div>
                        <h1 className='text-[4rem] text-[--color-grey-900] font-bold'>{drug?.name}</h1>
                        <span className='text-[2rem] text-[--color-grey-400] uppercase'>{drug?.category.title.toUpperCase()}</span>
                        <p className='mt-[4rem] text-[1.6rem] text-[--color-grey-600]'>
                            {drug?.description}
                        </p>
                        <p className='flex items-center text-[1.8rem] text-[--color-green-700] gap-[2rem] mt-[4rem]'>
                            In Stock <FaCheck />:
                            <span className='text-[--color-grey-900]'>{drug?.remaining} remaining</span>
                        </p>
                        <div className='flex flex-col mt-[4rem]'>
                            <span className='text-[1.4rem] text-[--color-grey-600]'>Pack size</span>
                            <span className='text-[--color-grey-900] text-[1.6rem]'>{drug?.packSize} month</span>
                        </div>
                        <p className='text-[3rem] text-[--main-color] font-bold'>${drug?.price}</p>
                    </div>
                    <div className='flex items-center gap-[1.5rem]'>
                        <div className='flex items-center'>
                            <input className='text-center w-[40px] h-[40px] border-2' type='number' value={quantity} min={0} />
                            <div className='flex flex-col'>
                                <button
                                    className='flex items-center justify-center w-[20px] h-[20px] border-2'
                                    onClick={() => {
                                        if (quantity < drug?.remaining) setQuantity(quantity => quantity + 1)
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
                        </div>
                        <Button
                            text={<span className='flex items-center gap-2 text-[1.8rem]'>Add to cart <IoCartOutline /></span>}
                            size='large'
                            onClick={() => {
                                if (quantity > 0) {
                                    dispatch(addItem({
                                        id: drug.id,
                                        category: drug.category,
                                        name: drug.name,
                                        price: drug.price,
                                        remaining: drug.remaining,
                                        img: drug.img,
                                        quantity
                                    }));
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
            <hr className='my-[7rem]' />
            <OtherDrugs drugs={drugs} />
        </>
    )
}

function OtherDrugs({ drugs }) {
    const settings = {
        arrows: true,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        cssEase: "linear",
        swipeToSlide: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            }
        ]
    };

    return (
        <div className='space-y-4'>
            <h1 className='text-[--color-grey-900] text-[2.5rem] font-bold'>You may be interested in</h1>
            <Slider {...settings}>
                {
                    drugs?.map(drug => <SmallDrugCard drug={drug} key={drug.id} />)
                }
            </Slider>
        </div>
    )
}

export default DrugsDetails
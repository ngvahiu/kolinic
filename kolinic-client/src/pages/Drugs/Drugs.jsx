import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import DrugCard from '../../components/DrugCard/DrugCard';
import { Pagination, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getDrugCategoriesAction, getDrugsAction, getDrugsByCategoryAction } from '../../redux/drug.slice';
import Loading from '../../components/Loading/Loading';

function Drugs() {
    const [shownDrugs, setShownDrugs] = useState([]);
    const [pagination, setPagination] = useState({
        pageNo: 0,
        pageSize: 4
    });
    const [sorting, setSorting] = useState({
        direc: "asc",
        sortBy: "name"
    });
    const [selectedCategory, setSelectedCategory] = useState(null);

    const { drugs, drugCategories, isLoading } = useSelector(state => state.drug);
    const dispatch = useDispatch();


    useEffect(function () {
        dispatch(getDrugCategoriesAction({}));
    }, [dispatch])

    useEffect(function () {
        const { pageNo, pageSize } = pagination;
        setShownDrugs(drugs.slice(pageNo * pageSize, pageNo * pageSize + pageSize))
    }, [pagination, drugs])

    useEffect(function () {
        if (selectedCategory) {
            dispatch(getDrugsByCategoryAction({ categoryId: selectedCategory, params: { ...sorting } }));
        } else {
            dispatch(getDrugsAction({ ...sorting }));
        }
    }, [selectedCategory, sorting, dispatch])

    const handleChange = (value) => {
        const [sortBy, direc] = value.split("-");
        setSorting({ sortBy, direc });
    };

    if (isLoading) return <Loading />;

    return (
        <div className='text-center'>
            <Categories
                categories={drugCategories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                resetPagination={() => setPagination({ ...pagination, pageNo: 0 })}
            />
            <div className='mt-[2rem] space-y-[3rem]'>
                <div className='text-right'>
                    <Select
                        className='w-[150px]'
                        defaultValue="name-asc"
                        onChange={handleChange}
                        options={[
                            { value: 'name-asc', label: 'Name: A-z' },
                            { value: 'name-desc', label: 'Name: Z-a' },
                            { value: 'price-asc', label: 'Price: ascending' },
                            { value: 'price-desc', label: 'Price: descending' },
                        ]}
                        size='large'
                    />
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[2rem] lg:gap-[4rem]'>
                    {
                        shownDrugs.length > 0 && shownDrugs.map(drug => <DrugCard drug={drug} key={drug.id} />)
                    }
                </div>
            </div>
            <Pagination
                className='mt-[4rem] text-[2rem]'
                responsive={true}
                total={drugs.length}
                pageSize={pagination.pageSize}
                current={pagination.pageNo + 1}
                onChange={(current, pageSize) => {
                    setPagination({ pageNo: current - 1, pageSize: pageSize });
                }}
            />
        </div>
    )
}

function Categories({ categories, selectedCategory, setSelectedCategory, resetPagination }) {
    const settings = {
        arrow: false,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div className='bg-[--color-grey-100] px-[2rem] py-[4rem]'>
            <h1 className='text-[3rem] text-[--color-grey-900] font-bold mb-[2rem]'>
                {selectedCategory ? categories.find(category => category.id === selectedCategory).title : "All categories"}
            </h1>
            <Slider {...settings}>
                {
                    categories?.map(category => <CategoryCard
                        category={category}
                        key={category.id}
                        isSelected={selectedCategory === category.id}
                        setSelectedCategory={setSelectedCategory}
                        resetPagination={resetPagination}
                    />)
                }
            </Slider>
        </div>
    )
}

function CategoryCard({ category, isSelected, setSelectedCategory, resetPagination }) {
    return (
        <button
            className='flex flex-col justify-between items-center bg-[--color-grey-0] w-[180px] h-[230px] rounded-lg shadow-lg cursor-pointer mb-5 group/item'
            onClick={() => {
                if (isSelected) {
                    setSelectedCategory(null);
                } else {
                    setSelectedCategory(category.id)
                    resetPagination();
                }
            }}
        >
            <div className='px-[1rem] pt-[1rem]'>
                <img className='w-full h-[150px]' src={category?.img} alt='category-img' />
            </div>
            <div className={`w-full px-[0.5rem] py-[1rem] text-center text-[1.3rem] font-bold group-hover/item:bg-[--main-color] group-hover/item:text-[--color-grey-0] transition-all duration-300 rounded-b-lg ${isSelected ? 'bg-[--main-color] text-[--color-grey-0]' : 'text-[--color-grey-400]'}`}>
                {category?.title.toUpperCase()}
            </div>
        </button>
    )
}

export default Drugs
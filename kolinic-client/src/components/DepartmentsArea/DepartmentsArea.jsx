import React, { useEffect, useState } from 'react'
import styles from './DepartmentsArea.module.scss'
import DepartmentItem from './DepartmentItem'
import { getDepartmentsAction } from '../../redux/department.slice';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../Loading/Loading';

function DepartmentsArea() {
    const { departments, isLoading } = useSelector(state => state.department);
    const dispatch = useDispatch();

    const [selectedDepartment, setSelectedDepartment] = useState(null);

    useEffect(function () {
        dispatch(getDepartmentsAction({}));
    }, [dispatch]);

    useEffect(function () {
        if (departments && departments.length > 0) {
            setSelectedDepartment(departments[0]);
        }
    }, [departments])

    if (isLoading) return <Loading />;

    return (
        <div className='md:px-36 mt-14'>
            <div className='flex items-center pb-[55px] border-b-2'>
                <h2 className='text-[2.5rem] md:text-[3rem] lg:text-[4rem] text-left px-[1rem] lg:px-[8rem] font-extrabold border-r-4 border-[--main-color] w-1/2 h-full'>
                    Our Departments Best For You
                </h2>
                <p className='text-[10px] md:text-[14px] lg:text-[18px] text-[--text-note-color] text-left leading-[30px] pl-[3rem] w-1/2'>Lorem ipsum dolor sit amet, nunc sodales massa turpis cursus iaculis, ur nam. Ultricies sapien fusce vitae duis, ut torquent a. Pede nec libero tristique, eget fusce, quis lorem vel tortor lacinia amet.</p>
            </div>
            <div className='flex justify-center items-center gap-5 flex-wrap my-5'>
                {
                    departments?.map(department => <DepartmentTab department={department} key={department.id} selected={selectedDepartment?.id === department.id} setSelectedDepartment={setSelectedDepartment} />)
                }
            </div>
            {selectedDepartment && <DepartmentItem department={selectedDepartment} />}
        </div>
    )
}

function DepartmentTab({ department, selected, setSelectedDepartment }) {
    return (
        <button
            className={`${styles['department-tab']} ${selected ? styles['active'] : ''}`}
            onClick={() => setSelectedDepartment(department)}
        >
            <div className={styles['department-icon']}>
                <img src={department.logo} alt='department-logo' />
            </div>
            <h5 className={styles['department-title']}>{department.name}</h5>
        </button>
    )
}

export default DepartmentsArea
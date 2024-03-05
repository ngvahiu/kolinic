import React from 'react'
import Button from '../../ui/Button/Button'
import { useNavigate } from 'react-router-dom'

function SubDoctorCard({ doctor: { id, avatar, name, department, about, description } }) {
    const navigate = useNavigate();

    return (
        <div className='w-full grid grid-cols-12 border border-[--color-grey-300] rounded-xl overflow-hidden'>
            <div className='col-span-5 border-r-2'>
                <img
                    className='h-full'
                    src={avatar}
                    alt='doctor-avatar'
                />
            </div>
            <div className='col-span-7 px-[1.5rem] md:px-[3rem] py-[1rem] md:py-[2rem]'>
                <h1 className='text-[1.8rem] md:text-[2.5rem] font-extrabold'>{name}</h1>
                <span className='text-[--color-grey-500] text-[1.2rem] md:text-[1.8rem]'>{department.name}</span>
                <p className='text-[--color-grey-500] text-[1.2rem] md:text-[1.8rem] my-[1.5rem]'>{about}</p>
                <p className='text-[--color-grey-500] text-[1.2rem] md:text-[1.8rem] my-[1.5rem]'>{description}</p>
                <Button
                    text="APPOINTMENT"
                    size='large'
                    classNames="mt-[1rem]"
                    onClick={() => navigate('/make-appointment', {
                        state: {
                            departmentId: department.id,
                            doctorId: id
                        }
                    })}
                />
            </div>
        </div>
    )
}

export default SubDoctorCard
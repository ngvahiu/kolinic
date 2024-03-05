import React from 'react'
import styles from './DoctorCard.module.scss'
import { Link } from 'react-router-dom'

function DoctorCard({ doctor: { id, avatar, name, education, about } }) {
    return (
        <div className={styles['single-doctor']}>
            <div className={styles['doctor-image']}>
                <img src={avatar} alt='doctor-avatar' />
            </div>
            <div className={styles['doctor-content']}>
                <Link
                    className='block hover:text-[--main-color] font-extrabold text-[2rem] cursor-pointer'
                    to={`/doctors/${id}`}
                >
                    {name}
                </Link>
                <span>{education}</span>
                <p className='text-[18px] leading-[30px] text-[--text-note-color]'>
                    {about}
                </p>
            </div>
        </div>
    )
}

export default DoctorCard
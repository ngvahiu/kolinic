import React from 'react'
import styles from './ServiceCard.module.scss'
import { Link } from 'react-router-dom'

function ServiceCard({ service: { id, logo, name, description } }) {
    return (
        <div className={styles['single-service']}>
            <div className={styles['service-icon']}>
                <img src={logo} alt="logo" />
            </div>
            <div>
                <Link className='font-extrabold text-[3rem]' to={`/services/${id}`}>{name}</Link>
                <p className={styles['service-description']}>
                    {description.length > 100 ? description.slice(0, 100) + '...' : description}
                </p>
            </div>
        </div>
    )
}

export default ServiceCard
import React from 'react'
import { NavLink } from 'react-router-dom'
import { textNoteColor } from '../../util/ThemeColors'

const PageNotFound = () => {

    return (
        <div className='container flex flex-col justify-center items-center'>
            <img
                src={require('../../assets/img/404.png')}
                alt='404'
                data-aos="fade-up"
            />
            <p className='w-1/2 text-center mt-5' style={{ color: textNoteColor }}>
                We're sorry, but the page you're looking for does not exist.

                The URL you entered may be incorrect, or the page may have been moved or deleted. Please check the URL and try again.

                If you believe this is an error, please contact our support team for assistance
                <NavLink to="/" className="link-home text-blue-500 underline font-bold ml-3">
                    BACK TO HOME
                </NavLink>
            </p>
        </div>
    )
}

export default PageNotFound
import React from 'react'

function Contact() {
    return (
        <>
            <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-[1rem]'>
                <ContactComponent
                    title="Office Address"
                    first_feature={
                        <a className='text-[--color-grey-500]' href='#'>4920 Northwest 2 Avenue</a>
                    }
                    second_feature={
                        <a className='text-[--color-grey-500]' href='#'>Medford, MN 55049</a>
                    }
                    third_feature={
                        <a className='text-[--color-grey-500]' href='#'>kigkong,USA</a>
                    }
                /><ContactComponent
                    title="Phone Number"
                    first_feature={
                        <a className='text-[--color-grey-500] hover:text-[--main-color]' href='tel:+888-555-333 096545245'>+888-555-333 096545245</a>
                    }
                    second_feature={
                        <a className='text-[--color-grey-500] hover:text-[--main-color]' href='tel:+888-555-333 096545245'>878454545 , 45784521</a>
                    }
                    third_feature={
                        <a className='text-[--color-grey-500] hover:text-[--main-color]' href='tel:02-3254789645'>02-3254789645</a>
                    }
                /><ContactComponent
                    title="Email Address"
                    first_feature={
                        <a className='text-[--color-grey-500] hover:text-[--main-color]' href='mailto:www.rent@gmailmil.com'>www.rent@gmailmil.com</a>
                    }
                    second_feature={
                        <a className='text-[--color-grey-500] hover:text-[--main-color]' href='mailto:www.rentensupport.com'>www.rentensupport.com</a>
                    }
                    third_feature={
                        <a className='text-[--color-grey-500] hover:text-[--main-color]' href='mailto:facebook/renten.net'>facebook/renten.net</a>
                    }
                /><ContactComponent
                    title="Fax Number"
                    first_feature={
                        <a className='text-[--color-grey-500]' href='#'>4920 Northwest 2 Avenue</a>
                    }
                    second_feature={
                        <a className='text-[--color-grey-500]' href='#'>Medford, MN 55049</a>
                    }
                    third_feature={
                        <a className='text-[--color-grey-500]' href='#'>kigkong,USA</a>
                    }
                />
            </div>
            <div className='text-center mt-[10rem]'>
                <h1 className='text-[2rem] md:text-[3rem] text-[--color-grey-900 ] font-bold'>
                    Call Now: <a href='tel:+000-999-555' className='text-[--main-color]'>+000-999-555</a>
                </h1>
                <div className='mt-[1rem]'>
                    <input className='p-[1rem] md:p-[2rem] w-[200px] md:w-[500px] rounded-tl-full rounded-bl-full' placeholder='Enter number' />
                    <button className='text-[--color-grey-0] p-[1rem] md:p-[2rem] bg-[--main-color] rounded-tr-full rounded-br-full'>
                        Free call back
                    </button>
                </div>
            </div>
            <div className='w-full mt-[5rem]'>
                <iframe src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d7299.454279518098!2d90.4115!3d23.8283!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjPCsDQ5JzQxLjkiTiA5MMKwMjQnNDEuNCJF!5e0!3m2!1sen!2sus!4v1703264730407!5m2!1sen!2sus" width="100%" height="450" style={{ border: 0 }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </>
    )
}

function ContactComponent({
    title,
    first_feature,
    second_feature,
    third_feature
}) {
    return (
        <div className='p-[40px] flex flex-col justify-center items-center shadow-xl'>
            <h1 className='mb-[3rem] text-[--main-color] text-[2.4rem] font-bold text-center'>{title}</h1>
            <p className='text-center'>{first_feature}</p>
            <p className='text-center'>{second_feature}</p>
            <p className='text-center'>{third_feature}</p>
        </div>
    )
}

export default Contact
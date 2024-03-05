import React from 'react'
import loading from '../../assets/img/loading.gif'

function Loading() {
    return (
        <div className='w-screen h-screen flex justify-center items-center'>
            <img src={loading} alt='loading' className='w-[100px] h-[100px]' />
        </div>
    )
}

export default Loading
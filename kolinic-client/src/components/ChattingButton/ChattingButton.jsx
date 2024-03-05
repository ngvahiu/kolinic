import React from 'react'

function ChattingButton() {
    return (
        <a className='bg-[--main-color] w-[80px] h-[40px] md:w-[100px] md:h-[50px] text-white text-[1.4rem] md:text-[2rem] font-bold rounded-full fixed bottom-4 left-4 flex justify-center items-center shadow-white shadow-lg hover:scale-110 transition-all duration-300'
            href={process.env.REACT_APP_MESSENGER_LINK}
            target='_blank'
            rel='noreferrer'
        >
            Ask us
        </a>
    )
}

export default ChattingButton
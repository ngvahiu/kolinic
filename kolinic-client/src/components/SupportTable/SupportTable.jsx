import React from 'react'

function SupportTable({ title, renderContent }) {
    return (
        <div className='w-full rounded-2xl border-2 overflow-hidden'>
            <div className='p-[1.5rem] bg-[--main-color] border-b-2'>
                <h1 className='text-[2rem] text-[--color-grey-0] font-bold'>{title}</h1>
            </div>
            {renderContent}
        </div>
    )
}

export default SupportTable
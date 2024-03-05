import React from 'react'

function Button({
    text,
    size = 'medium',
    type = 'main',
    classNames,
    disabled = false,
    btnType = 'button',
    onClick
}) {
    const sizes = {
        large: 'text-[1.2rem] md:text-[1.6rem] px-[2rem] md:px-[3rem] py-[0.9rem] md:py-[1.2rem]',
        medium: 'text-[1.2rem] md:text-[1.4rem] px-[2.4rem] md:px-[2.7rem] py-[0.8rem] md:py-[1rem]',
        small: 'text-[1.2rem] px-[2.2rem] py-[0.6rem]',
        full: 'w-full py-3 text-[0.7rem] md:text-[1.4rem]'
    };

    const types = {
        main: 'bg-[--main-color] border-[--main-color] text-[--color-grey-0] hover:text-[--main-color] hover:bg-transparent',
        sub: 'bg-transparent border-[--main-color] text-[--main-color] hover:text-[--color-grey-0] hover:bg-[--main-color]',
        outline: 'bg-[--color-grey-0] border-[--text-note-color] text-[--text-note-color] hover:text-[--main-color] hover:border-[--main-color]'
    };

    const base = 'rounded-full font-bold border-2 transition-all duration-300'

    return (
        <button className={`${base} ${sizes[size]} ${types[type]} ${classNames}`} disabled={disabled} onClick={onClick} type={btnType}>
            {text}
        </button >
    )
}

export default Button
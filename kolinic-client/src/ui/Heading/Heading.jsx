function Heading({
    title,
    description,
    textAlign = 'center',
    bottomBar = true,
    size = "large"
}) {
    const titleStyle = {
        large: "text-[3rem] md:text-[4rem] font-extrabold mb-4",
        middle: "text-[2.5rem] md:text-[3.5rem] font-extrabold mb-2 md:mb-3",
        small: "text-[1.5rem] sm:text-[2rem] md:text-[2.5rem] font-extrabold mb-1 md:mb-2",
    }
    return (
        <div className={textAlign === 'center' ? 'text-center' : 'text-left'}>
            <h2 className={titleStyle[size]}>{title}</h2>
            {
                bottomBar && <div className={`w-full flex ${textAlign === 'center' ? 'justify-center' : ''}`}>
                    <div className='block w-[40px] h-[3px] bg-[--main-color] mb-[30px]' />
                </div>
            }
            <p className={`text-[14px] md:text-[18px] leading-[30px] max-w-[700px] mt-[10px] md:mt-[20px] mb-[30px] text-[--text-note-color] ${textAlign === 'center' ? 'mx-auto' : ''}`}>
                {description}
            </p>
        </div>
    )
}

export default Heading
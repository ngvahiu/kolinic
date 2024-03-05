import React, { useCallback, useEffect, useState } from 'react'
import { mainColor } from '../../util/ThemeColors'
import { FaAngleUp } from 'react-icons/fa'

const BackToTopButton = () => {
    const [showButton, setShowButton] = useState(false);
    const [offsetY, setOffsetY] = useState(0);

    const handleScroll = useCallback((e) => {
        const window = e.currentTarget;

        if (window.scrollY > 120 && window.scrollY < offsetY) {
            setShowButton(true);
        } else {
            setShowButton(false);
        }
        setOffsetY(window.scrollY);
    }, [offsetY]);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
    }, [handleScroll])

    return (
        <button className={`w-[35px] h-[35px] md:w-[50px] md:h-[50px] text-white text-xl fixed bottom-4 right-4 rounded-md flex justify-center items-center shadow-white shadow-lg ${showButton ? 'block' : 'hidden'}`} style={{
            backgroundColor: mainColor
        }}
            onClick={scrollToTop}
        >
            <FaAngleUp />
        </button>
    )
}

export default BackToTopButton
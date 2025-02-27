import React, { useEffect, useState } from 'react'
import { FaArrowUp } from 'react-icons/fa'; // React Icons
const BackToTop = () => {
    const [showButton, setShowButton] = useState(false)

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };


    const handleScolling = () => {
        if (scrollY > 500) {
            setShowButton(true);
        } else {
            setShowButton(false);
        }
    };


    useEffect(() => {
        window.addEventListener("scroll", handleScolling)
        return () => {
            window.removeEventListener("scroll", handleScolling)
        };
    }, [])
    return (
        <div>
            <button className= {`fixed right-4 bottom-4 py-1 px-1 bg-[#C31C37] rounded-full cursor-pointer ${showButton ? "visible": "invisible"}`}>
                <FaArrowUp onClick={scrollToTop} className='text-[40px] py-1 px-1  text-white animate-bounce' />
            </button>
        </div>
    )
}

export default BackToTop
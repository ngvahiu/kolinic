import { useLocation } from "react-router-dom";
import background from "../../../assets/img/sub-banner.jpg";
import { AiOutlineHome } from "react-icons/ai";
import { FaAngleDoubleRight } from "react-icons/fa";
import { useEffect, useState } from "react";

function SubCarousel() {
    const location = useLocation();
    const [breadCrumb, setBreadCrumb] = useState([]);

    useEffect(function () {
        if (location.pathname.includes('/about')) {
            setBreadCrumb(['About us']);
        } else if (location.pathname.includes('/services/')) {
            setBreadCrumb(['Service details']);
        } else if (location.pathname.includes('/services')) {
            setBreadCrumb(['Our services']);
        } else if (location.pathname.includes('/doctors/')) {
            setBreadCrumb(['Our doctors', 'Doctor profile']);
        } else if (location.pathname.includes('/doctors')) {
            setBreadCrumb(['Our doctors']);
        } else if (location.pathname.includes('/mission-vision')) {
            setBreadCrumb(['Mission & Vision']);
        } else if (location.pathname.includes('/contact')) {
            setBreadCrumb(['Contact With Us']);
        } else if (location.pathname.includes('/timeline')) {
            setBreadCrumb(['Our Timeline']);
        } else if (location.pathname.includes('/term-services')) {
            setBreadCrumb(['Terms Of Services']);
        } else if (location.pathname.includes('/blogs/')) {
            setBreadCrumb(['Blog', 'Blog Details']);
        } else if (location.pathname.includes('/blogs')) {
            setBreadCrumb(['Blog Posts']);
        } else if (location.pathname.includes('/drugs-order-history')) {
            setBreadCrumb(['Drug orders history']);
        } else if (location.pathname.includes('/drugs/')) {
            setBreadCrumb(['Drugs', 'Drug Details']);
        } else if (location.pathname.includes('/drugs')) {
            setBreadCrumb(['Drugs']);
        } else if (location.pathname.includes('/profile')) {
            setBreadCrumb(['Profile']);
        } else if (location.pathname.includes('/make-appointment')) {
            setBreadCrumb(['Make Appointment']);
        } else if (location.pathname.includes('/appointment-history')) {
            setBreadCrumb(['Appointment History']);
        } else if (location.pathname.includes('/checkout')) {
            setBreadCrumb(['Checkout']);
        } else if (location.pathname.includes('/password-settings')) {
            setBreadCrumb(['Password Settings']);
        }
    }, [location.pathname])

    function showBreadCrumb() {
        return breadCrumb.map((breadCrumb, index) => (
            <div className="flex items-center gap-[0.5rem]" key={index}>
                <FaAngleDoubleRight className="text-[1.3rem] text-[--color-blue-700] font-bold" />
                <span className="text-[1.3rem] text-[--color-grey-500] font-bold uppercase">{breadCrumb}</span>
            </div>
        ))
    }


    return (
        <section>
            <div
                className='bg-no-repeat bg-cover bg-position-center'
                style={{
                    backgroundImage: `url(${background})`
                }}
            >
                <div className='w-full h-[350px]'>
                    <div className="w-full h-full bg-black/70 flex justify-center items-center">
                        <h1 className="text-[4rem] md:text-[6rem] font-extrabold text-[--color-grey-0] text-center">
                            {breadCrumb?.slice(-1)}
                        </h1>
                    </div>
                </div>
            </div>
            <div className="py-[3rem] flex justify-center items-center bg-[--color-grey-100]">
                <div className="flex items-center gap-4">
                    <AiOutlineHome className="text-[1.3rem] text-[--color-blue-700] font-bold" />
                    <span className="text-[1.3rem] text-[--color-grey-500] font-bold uppercase">Home</span>
                    {showBreadCrumb()}
                </div>
            </div>
        </section>
    )
}

export default SubCarousel
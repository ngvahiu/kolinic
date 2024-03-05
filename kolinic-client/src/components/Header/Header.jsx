import React, { useCallback, useEffect, useState } from 'react'
import styles from './Header.module.scss'
import { mainColor, textNoteColor } from '../../util/ThemeColors'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../../redux/user.slice'

import { HiOutlineLocationMarker } from 'react-icons/hi'
import { HiXMark } from 'react-icons/hi2'
import { FaRegEnvelope, FaBars } from 'react-icons/fa'
import { CgProfile } from "react-icons/cg";
import { IoMdExit } from "react-icons/io";
import { Avatar } from 'antd'
import CartModal from '../CartModal/CartModal'
import { MdOutlineManageAccounts } from 'react-icons/md'
import { logoutAction } from '../../redux/auth.slice'
import { IoLockClosedOutline } from 'react-icons/io5'

const Header = () => {
    const user = useSelector(getUser);
    const [open, setOpen] = useState(false);
    const [changeHeader, setChangeHeader] = useState(false);
    const [openSubmenuMobile, setOpenSubmenuMobile] = useState({
        tab: '',
        open: false
    });
    const dispatch = useDispatch();

    const handleNavigation = useCallback(e => {
        const window = e.currentTarget;

        if (window.scrollY > 120) {
            setChangeHeader(true);
        } else {
            setChangeHeader(false);
        }
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleNavigation);

        return () => {
            window.removeEventListener('scroll', handleNavigation);
        };
    }, [handleNavigation]);

    return (
        <header>
            <div className={`${styles["header-top-area"]} bg-white hidden md:block`}>
                <div className='container mx-auto px-22 xl:px-28'>
                    <div className='flex justify-between items-center gap-3'>
                        <div className='single-header'>
                            <a href='/'>
                                <img src={require('../../assets/img/logo.png')} alt='logo' />
                            </a>
                        </div>
                        <div className='single-header flex items-start'>
                            <div className={`${styles["header-icon"]} border-2 border-gray-200 rounded-lg flex justify-center items-center`}>
                                <HiOutlineLocationMarker className='text-[--main-color] text-[2rem] xl:text-[2.4rem]' />
                            </div>
                            <div className='header-description ml-3'>
                                <h6 className='font-semibold'>Location</h6>
                                <span style={{ color: textNoteColor }}>medino, NY 10012, USA</span>
                            </div>
                        </div>
                        <div className='single-header flex items-start'>
                            <div className={`${styles["header-icon"]} border-2 border-gray-200 rounded-lg flex justify-center items-center`}>
                                <FaRegEnvelope className='text-[--main-color] text-[2rem] xl:text-[2.4rem]' />
                            </div>
                            <div className='header-description ml-3'>
                                <h6 className='font-semibold'>Email Address</h6>
                                <span style={{ color: textNoteColor }}>kolinic@gmail.com</span>
                            </div>
                        </div>
                        <div className={`${styles["header-button"]} single-header p-4 cursor-pointer`} style={{
                            borderWidth: '3px',
                            borderColor: mainColor
                        }}>
                            <a className={`text-[1.5rem] xl:text-[1.8rem] ${styles["header-button-text"]}`} href="tel:+4733378901">Hotline - 47 333 78 901</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`${styles['header-bottom']} hidden md:block`}>
                <div className='mx-24'>
                    <div className={`${styles["menu-area"]} shadow-md w-full`}>
                        <div className='md:flex items-center justify-between py-4 md:px-10 px-7'>
                            <ul className={`md:flex md:items-center md:pb-0 absolute md:static md:z-auto z-[-1] left-0 w-full transition-all duration-500 ease-in ${open ? 'top-12' : 'top-[-490px]'}`}>
                                <Link className={`${styles["menu-item"]} md:ml-8 font-bold cursor-pointer`} to='/'>
                                    HOME
                                </Link>
                                <Link className={`${styles["menu-item"]} md:ml-8 font-bold cursor-pointer`} to='/about'>
                                    ABOUT
                                </Link>
                                <Link className={`${styles["menu-item"]} md:ml-8 font-bold cursor-pointer`} to='/services'>
                                    SERVICE
                                </Link>
                                <li className={`${styles["menu-item"]} md:ml-8 font-bold cursor-pointer`}>
                                    <a className=''>DOCTOR</a>
                                    <ul className={styles["submenu"]}>
                                        <Link className={styles["submenu-item"]} to='/doctors'>
                                            Doctors
                                        </Link>
                                        <Link className={styles["submenu-item"]} to='/make-appointment'>
                                            Make appointment
                                        </Link>
                                        <Link className={styles["submenu-item"]} to='/appointment-history'>
                                            Your appointments
                                        </Link>
                                    </ul>
                                </li>
                                <li className={`${styles["menu-item"]} md:ml-8 font-bold cursor-pointer`}>
                                    <a className=''>DRUG</a>
                                    <ul className={styles["submenu"]}>
                                        <Link className={styles["submenu-item"]} to='/drugs'>
                                            Drugs
                                        </Link>
                                        <Link className={styles["submenu-item"]} to='/drugs-order-history'>
                                            Your orders
                                        </Link>
                                    </ul>
                                </li>
                                <Link className={`${styles["menu-item"]} md:ml-8 font-bold cursor-pointer`} to='/blogs'>
                                    BLOG
                                </Link>
                                <li className={`${styles["menu-item"]} md:ml-8 font-bold cursor-pointer`}>
                                    <a className=''>MORE</a>
                                    <ul className={styles["submenu"]}>
                                        <Link className={styles["submenu-item"]} to='/mission-vision'>
                                            Mission & Vision
                                        </Link>
                                        <Link className={styles["submenu-item"]} to='/timeline'>
                                            Timeline
                                        </Link>
                                        <Link className={styles["submenu-item"]} to='/term-services'>
                                            Term of services
                                        </Link>
                                    </ul>
                                </li>
                                <Link className={`${styles["menu-item"]} md:ml-8 font-bold cursor-pointer`} to='/contact'>
                                    CONTACT
                                </Link>
                            </ul>
                            <ul className='flex items-end'>
                                {
                                    user ? <>
                                        <li className="text-[--color-grey-0]">
                                            <CartModal />
                                        </li>
                                        <li className={`${styles["menu-item"]} md:ml-8 font-bold cursor-pointer text-right flex-grow`}>
                                            <div className='text-[2.6rem]'><Avatar className='w-[40px] h-[40px]' src={user.avatar || "https://invisiblechildren.com/wp-content/uploads/2012/07/facebook-profile-picture-no-pic-avatar.jpg"} /></div>
                                            <ul className={`${styles["submenu"]} ${styles["submenu-user"]}`}>
                                                <Link className={styles["submenu-item"]} to='/profile'>
                                                    <CgProfile /> <span className='text-left'>Profile</span>
                                                </Link>
                                                {user.role === "ADMIN" && <Link className={styles["submenu-item"]} to='/admin/users'>
                                                    <MdOutlineManageAccounts /> <span className='text-left'>Admin management</span>
                                                </Link>}
                                                <Link className={styles["submenu-item"]} onClick={() => dispatch(logoutAction({}))}>
                                                    <IoMdExit /> <span className='text-left'>Log out</span>
                                                </Link>
                                            </ul>
                                        </li>
                                    </> : <li className={`${styles["menu-item"]} md:ml-8 font-bold cursor-pointer text-right flex-grow`}>
                                        <Link to="/sign-in">LOGIN</Link>
                                    </li>
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`${styles['navigation-area']} ${changeHeader ? styles['shrinkheader'] : ''}`}>
                <div className='md:flex items-center justify-between bg-white py-2 md:px-10 px-7'>
                    <div className='single-header'>
                        <a href='/'>
                            <img src={require('../../assets/img/logo.png')} alt='logo' />
                        </a>
                    </div>
                    <div onClick={() => setOpen(!open)} className='absolute right-8 top-6 cursor-pointer md:hidden w-7 h-7'>
                        {
                            open ? <HiXMark /> : <FaBars />
                        }
                    </div>
                    <ul className={`bg-white text-black absolute mt-[58px] flex flex-col md:flex-row md:mt-0 md:items-center md:justify-end md:pb-0 md:static md:z-auto z-[-1] left-0 w-full transition-all duration-500 ease-in ${open ? 'top-12' : 'top-[-490px]'}`}>
                        <Link className={`${styles["menu-item"]} md:ml-8 font-bold cursor-pointer`} to='/'>
                            HOME
                        </Link>
                        <Link className={`${styles["menu-item"]} md:ml-8 font-bold cursor-pointer`} to='/about'>
                            ABOUT
                        </Link>
                        <Link className={`${styles["menu-item"]} md:ml-8 font-bold cursor-pointer`} to='/services'>
                            SERVICE
                        </Link>
                        <li className={`${styles["menu-item"]} md:ml-8 font-bold cursor-pointer`}>
                            <button className='' onClick={() => setOpenSubmenuMobile({
                                tab: openSubmenuMobile.tab === 'doctors' ? '' : 'doctors',
                                open: openSubmenuMobile.tab === 'doctors' ? false : true
                            })}>DOCTOR</button>
                            <ul className={styles["submenu"]}>
                                <Link className={styles["submenu-item"]} to='/doctors'>Doctors</Link>
                                <Link className={styles["submenu-item"]} to='/make-appointment'>Make appointment</Link>
                                <Link className={styles["submenu-item"]} to='/appointment-history'>Your appointments</Link>
                            </ul>
                            {
                                openSubmenuMobile.tab === 'doctors' && open ?
                                    <ul className={`${styles["submenu-mobile"]}`}>
                                        <Link className={styles["submenu-item"]} to='/doctors'>Doctors</Link>
                                        <Link className={styles["submenu-item"]} to='/make-appointment'>Make appointment</Link>
                                        <Link className={styles["submenu-item"]} to='/appointment-history'>Your appointments</Link>
                                    </ul> : null
                            }
                        </li>
                        <li className={`${styles["menu-item"]} md:ml-8 font-bold cursor-pointer`}>
                            <button className='' onClick={() => setOpenSubmenuMobile({
                                tab: openSubmenuMobile.tab === 'drugs' ? '' : 'drugs',
                                open: openSubmenuMobile.tab === 'drugs' ? false : true
                            })}>DRUG</button>
                            <ul className={styles["submenu"]}>
                                <Link className={styles["submenu-item"]} to='/drugs'>Drugs</Link>
                                <Link className={styles["submenu-item"]} to='/drugs-order-history'>Your orders</Link>
                            </ul>
                            {
                                openSubmenuMobile.tab === 'drugs' && open ?
                                    <ul className={`${styles["submenu-mobile"]}`}>
                                        <Link className={styles["submenu-item"]} to='/drugs'>Drugs</Link>
                                        <Link className={styles["submenu-item"]} to='/drugs-order-history'>Your orders</Link>
                                    </ul> : null
                            }
                        </li>
                        <Link className={`${styles["menu-item"]} md:ml-8 font-bold cursor-pointer`} to='/blogs'>
                            BLOG
                        </Link>
                        <li className={`${styles["menu-item"]} md:ml-8 font-bold cursor-pointer`}>
                            <button className='' onClick={() => setOpenSubmenuMobile({
                                tab: openSubmenuMobile.tab === 'more' ? '' : 'more',
                                open: openSubmenuMobile.tab === 'more' ? false : true
                            })}>
                                MORE
                            </button>
                            <ul className={styles["submenu"]}>
                                <Link className={styles["submenu-item"]} to='/mission-vision'>Mission & Vision</Link>
                                <Link className={styles["submenu-item"]} to='/timeline'>Timeline</Link>
                                <Link className={styles["submenu-item"]} to='/term-services'>Term of services</Link>
                            </ul>
                            {
                                openSubmenuMobile.tab === 'more' && open ?
                                    <ul className={`${styles["submenu-mobile"]}`}>
                                        <Link className={styles["submenu-item"]} to='/mission-vision'>Mission & Vision</Link>
                                        <Link className={styles["submenu-item"]} to='/timeline'>Timeline</Link>
                                        <Link className={styles["submenu-item"]} to='/term-services'>Term of services</Link>
                                    </ul> : null
                            }
                        </li>
                        <Link className={`${styles["menu-item"]} md:ml-8 font-bold cursor-pointer`} to='/contact'>
                            CONTACT
                        </Link>
                        {
                            user ? <>
                                <li className={`${styles["menu-item"]}`}>
                                    <CartModal />
                                </li>
                                <li className={`${styles["menu-item"]} md:ml-8 font-bold cursor-pointer`}>
                                    <button onClick={() => setOpenSubmenuMobile({
                                        tab: openSubmenuMobile.tab === 'user' ? '' : 'user',
                                        open: openSubmenuMobile.tab === 'user' ? false : true
                                    })}>
                                        <Avatar size={40} src={user.avatar || "https://invisiblechildren.com/wp-content/uploads/2012/07/facebook-profile-picture-no-pic-avatar.jpg"} />
                                    </button>
                                    <ul className={`${styles["submenu"]} ${styles["submenu-user"]}`}>
                                        <Link className={styles["submenu-item"]} to='/profile'>
                                            <span className='text-left'>Profile</span>
                                        </Link>
                                        {user.role === "ADMIN" && <Link className={styles["submenu-item"]} to='/admin/users'><span className='text-left'>Admin management</span></Link>}
                                        <Link
                                            className={styles["submenu-item"]}
                                            onClick={() => dispatch(logoutAction({}))}
                                        >
                                            <span className='text-left'>Log out</span>
                                        </Link>
                                    </ul>
                                    {
                                        openSubmenuMobile.tab === 'user' && open ?
                                            <ul className={`${styles["submenu-mobile"]}`}>
                                                <Link className={styles["submenu-item"]} to='/profile'>Profile</Link>
                                                {user.role === "ADMIN" && <Link className={styles["submenu-item"]} to='/admin/users'>Admin management</Link>}
                                                <Link className={styles["submenu-item"]} onClick={() => dispatch(logoutAction({}))}>Log out</Link>
                                            </ul> : null
                                    }
                                </li>
                            </> : <Link className={`${styles["menu-item"]} md:ml-8 font-bold cursor-pointer`} to='/sign-in'>
                                LOGIN
                            </Link>
                        }
                    </ul>
                </div>
            </div>
        </header>
    )
}

export default Header
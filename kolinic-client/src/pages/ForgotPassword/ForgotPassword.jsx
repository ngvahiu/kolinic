import React, { useState } from 'react'
import Heading from '../../ui/Heading/Heading'
import background from '../../assets/img/bg-authenticate.png'
import logo from '../../assets/img/logo.png'
import { Input } from 'antd'
import { MdOutlineLock, MdOutlineMail } from 'react-icons/md'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Button from '../../ui/Button/Button'
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from 'react-redux'
import { forgotPasswordAction, resetPasswordAction } from '../../redux/auth.slice'

function ForgotPassword() {
    const location = useLocation();
    const [email, setEmail] = useState("");
    const [passwords, setPasswords] = useState({
        password: "",
        passwordConfirm: ""
    });
    const { token } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoading } = useSelector(state => state.auth);

    async function handleForgotPassword() {
        try {
            if (!email) {
                throw ["Email must not be null or empty"];
            }
            if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
                throw ["Email should be in valid format"];
            }
            dispatch(forgotPasswordAction(email));
        } catch (error) {
            toast.error(error[0], {
                position: "top-right"
            });
        }
    }

    async function handleResetPassword() {
        dispatch(resetPasswordAction({
            token,
            body: {
                password: passwords.password,
                passwordConfirm: passwords.passwordConfirm
            },
            callbackFn: () => navigate("/sign-in", { replace: true })
        }));
    }

    if (location.pathname.includes('forgot-password')) {
        return (
            <div className='w-full h-screen flex justify-center items-center' style={{
                backgroundImage: `url(${background})`,
                backgroundSize: '100% 100%'
            }}>
                <div className='w-3/4 sm:w-1/2 flex flex-col items-center rounded-2xl bg-white/60 py-[2rem]'>
                    <img className='w-[100px] h-[60px] mb-[2rem]' src={logo} alt='logo' />
                    <div className='px-[1.5rem]'>
                        <Heading
                            title='Please provide your true email address that we can send the link to reset password.'
                            size="small"
                        />
                    </div>
                    <div className='w-2/3 sm:w-1/2 text-center'>
                        <Input
                            className='w-full mb-[1rem] text-[1.2rem] md:text-[1.6rem]'
                            size='large'
                            placeholder="Email address"
                            prefix={<MdOutlineMail />}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Button text="Submit" disabled={isLoading} onClick={handleForgotPassword} />
                    </div>
                </div>
                <ToastContainer autoClose={1000} />
            </div>
        )
    } else if (location.pathname.includes('reset-password')) {
        return (
            <div className='w-full h-screen flex justify-center items-center' style={{
                backgroundImage: `url(${background})`,
                backgroundSize: '100% 100%'
            }}>
                <div className='w-3/4 sm:w-1/2 flex flex-col items-center rounded-2xl bg-white/60 py-[2rem]'>
                    <img className='w-[100px] h-[60px] mb-[2rem]' src={logo} alt='logo' />
                    <div className='px-[1.5rem]'>
                        <Heading
                            title='Reset password'
                            size="small"
                        />
                    </div>
                    <div className='w-2/3 sm:w-1/2 text-center'>
                        <Input.Password
                            className='w-full mb-[1rem]'
                            size='large'
                            placeholder="New Password"
                            prefix={<MdOutlineLock />}
                            value={passwords.password}
                            onChange={(e) => setPasswords({ ...passwords, password: e.target.value })}
                        />
                        <Input.Password
                            className='w-full mb-[1rem]'
                            size='large'
                            placeholder="New password confirm"
                            prefix={<MdOutlineLock />}
                            value={passwords.passwordConfirm}
                            onChange={(e) => setPasswords({ ...passwords, passwordConfirm: e.target.value })}
                        />
                        <Button text="Reset password" disabled={isLoading} onClick={handleResetPassword} />
                    </div>
                </div>
                <ToastContainer autoClose={1000} />
            </div>
        )
    }
}

export default ForgotPassword
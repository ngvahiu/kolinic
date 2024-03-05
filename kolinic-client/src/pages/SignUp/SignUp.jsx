import React, { useMemo, useState } from 'react'
import background from '../../assets/img/bg-authenticate.png'
import logo from '../../assets/img/logo.png'
import Heading from '../../ui/Heading/Heading';
import { Input, Select } from 'antd';
import { MdOutlineLock, MdOutlineMail, MdOutlinePhoneEnabled } from 'react-icons/md';
import { FaFacebookF, FaGoogle, FaRegUser } from 'react-icons/fa';
import Button from '../../ui/Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from 'react-redux';
import { signInSocialAction, signUpAction } from '../../redux/auth.slice';
import { LoginSocialFacebook, LoginSocialGoogle } from 'reactjs-social-login';

function SignUp() {
    const dispatch = useDispatch();
    const { isLoading } = useSelector(state => state.auth);
    const [inputs, setInputs] = useState({
        email: "",
        fullName: "",
        phoneNumber: "",
        password: "",
        passwordConfirm: "",
        gender: "MALE"
    });
    const sdkIds = useMemo(() => ({
        clientId: process.env.REACT_APP_GOOGLE_ID,
        appId: process.env.REACT_APP_FACEBOOK_ID
    }), [])
    const navigate = useNavigate();

    function handleInput(e) {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(signUpAction({ body: inputs, callbackFn: () => navigate("/sign-in", { replace: true }) }));
    }

    return (
        <div className='w-full h-max min-h-screen flex justify-center items-center' style={{
            backgroundImage: `url(${background})`
        }}>
            <form
                className='w-3/4 sm:w-1/2 flex flex-col items-center rounded-2xl bg-white/60 py-[2rem]'
                onSubmit={handleSubmit}
            >
                <img className='w-[100px] h-[60px] mb-[2rem]' src={logo} alt='logo' />
                <Heading
                    title='Welcome to KOLINIC'
                    size="middle"
                />
                <div className='w-3/4 sm:w-1/2'>
                    <Input
                        className='w-full mb-[1rem] text-[1.2rem] md:text-[1.6rem]'
                        size='large'
                        placeholder="Email address"
                        prefix={<MdOutlineMail />}
                        name='email'
                        value={inputs.email}
                        onChange={handleInput}
                    />
                    <Input
                        className='w-full mb-[1rem] text-[1.2rem] md:text-[1.6rem]'
                        size='large'
                        placeholder="Full name"
                        prefix={<FaRegUser />}
                        value={inputs.fullName}
                        name='fullName'
                        onChange={handleInput}
                    />
                    <Input
                        className='w-full mb-[1rem] text-[1.2rem] md:text-[1.6rem]'
                        size='large'
                        placeholder="Phone number"
                        prefix={<MdOutlinePhoneEnabled />}
                        value={inputs.phoneNumber}
                        name='phoneNumber'
                        onChange={handleInput}
                    />
                    <Select
                        className='w-full mb-[1rem] text-[1.2rem] md:text-[1.6rem]'
                        size={"large"}
                        value={inputs.gender}
                        onChange={(v) => setInputs({ ...inputs, gender: v })}
                        style={{
                            maxWidth: '100px',
                        }}
                        options={[
                            {
                                value: "MALE",
                                label: "MALE"
                            },
                            {
                                value: "FEMALE",
                                label: "FEMALE"
                            },
                            {
                                value: "NEUTRAL",
                                label: "NEUTRAL"
                            }
                        ]}
                    />
                    <Input.Password
                        className='w-full mb-[1rem] text-[1.2rem] md:text-[1.6rem]'
                        size='large'
                        placeholder="Password"
                        prefix={<MdOutlineLock />}
                        value={inputs.password}
                        name='password'
                        onChange={handleInput}
                    />
                    <Input.Password
                        className='w-full mb-[1rem] text-[1.2rem] md:text-[1.6rem]'
                        size='large'
                        placeholder="Password confirm"
                        prefix={<MdOutlineLock />}
                        value={inputs.passwordConfirm}
                        name='passwordConfirm'
                        onChange={handleInput}
                    />
                    <Button
                        text="Sign Up"
                        size='large'
                        classNames='w-full mt-[3rem]'
                        disabled={isLoading}
                        onClick={handleSubmit}
                    />
                    <div className='flex justify-center items-center mt-[1rem] mx-[1rem]'>
                        <div className='bg-[--color-grey-500]' style={{ flex: 1, height: '1px' }} />
                        <span className='text-[--color-grey-500] text-[1rem] md:text-[1.4rem] mx-[10px]'>Or sign up with</span>
                        <div className='bg-[--color-grey-500]' style={{ flex: 1, height: '1px' }} />
                    </div>
                    <div className='flex justify-center items-center gap-[1.5rem] mt-[1rem]'>
                        <LoginSocialFacebook
                            appId={sdkIds.appId}
                            onResolve={(response) => {
                                const result = response.data;
                                dispatch(signInSocialAction({
                                    fullName: result.name,
                                    avatar: result.picture.data.url,
                                    email: result.email,
                                    provider: "FACEBOOK"
                                }));
                            }}
                            onReject={(error) => {
                                toast.error("Sign up by Facebook failed", {
                                    position: "top-right"
                                })
                            }}
                        >
                            <Link className='bg-[#627aad] hover:bg-[#627aad]/80 text-white flex items-center justify-center p-[0.8rem] md:p-[1.5rem] rounded-full'>
                                <FaFacebookF className='text-[1.2rem] md:text-[1.6rem]' />
                            </Link>
                        </LoginSocialFacebook>
                        <LoginSocialGoogle
                            client_id={sdkIds.clientId}
                            onResolve={(response) => {
                                const result = response.data;
                                dispatch(signInSocialAction({
                                    fullName: result.name,
                                    avatar: result.picture,
                                    email: result.email,
                                    provider: "GOOGLE"
                                }));
                            }}
                            onReject={(error) => {
                                toast.error("Sign up by Google failed", {
                                    position: "top-right"
                                })
                            }}
                        >
                            <Link className='bg-[#e46f61] hover:bg-[#e46f61]/80 text-white flex items-center justify-center p-[0.8rem] md:p-[1.5rem] rounded-full'>
                                <FaGoogle className='text-[1.2rem] md:text-[1.6rem]' />
                            </Link>
                        </LoginSocialGoogle>
                    </div>
                    <p className='text-[1rem] md:text-[1.2rem] mt-[2rem] text-center'>
                        Already have account? <Link className='text-[--color-blue-700] text-right hover:underline' to={'/sign-in'}>Login</Link>
                    </p>
                </div>
            </form>
            <ToastContainer autoClose={1000} />
        </div>
    )
}

export default SignUp
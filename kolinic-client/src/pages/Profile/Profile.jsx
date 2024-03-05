import { Avatar, Input, Modal, Upload } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import { FaCamera } from 'react-icons/fa';
import Button from '../../ui/Button/Button';
import { formatDate } from '../../util/helper';
import { useDispatch, useSelector } from 'react-redux';
import { getMeAction, updateMeAction } from '../../redux/user.slice';
import { addPasswordAction, updatePasswordAction } from '../../redux/auth.slice';

function Profile() {
    const [imageUrl, setImageUrl] = useState();
    const [inputs, setInputs] = useState({
        fullName: "",
        dob: new Date(),
        gender: "",
        email: "",
        phoneNumber: "",
        address: "",
    });
    const [avatarSrc, setAvatarSrc] = useState(null);
    const [isCancel, setCancel] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [changePasswords, setChangePasswords] = useState({
        currentPassword: "",
        newPassword: "",
        newPasswordConfirm: ""
    });
    const [addPasswords, setAddPasswords] = useState({
        password: "",
        passwordConfirm: ""
    });

    const { user, isUpdating } = useSelector(state => state.user);
    const { isLoading } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(function () {
        dispatch(getMeAction({}));
    }, [dispatch])

    useEffect(function () {
        if (user) {
            setInputs({
                fullName: user.fullName,
                dob: formatDate(new Date(user.dob)),
                gender: user.gender,
                email: user.email,
                phoneNumber: user.phoneNumber,
                address: user.address
            });
            setImageUrl(user.avatar);
        }
    }, [user])

    useEffect(function () {
        if (isCancel) {
            dispatch(getMeAction());
            setAvatarSrc(null);
            setCancel(false);
        }
    }, [isCancel, dispatch])

    const getBase64 = useCallback((img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }, []);

    function handleUpload(info) {
        // Get this url from response in real world.
        getBase64(info.file, (url) => {
            setImageUrl(url);
            setAvatarSrc(info.file);
        });
    };

    function handleChangeInput(e) {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    }

    async function handleSave() {
        dispatch(updateMeAction({ body: inputs, avatar: avatarSrc }));
    }

    return (
        <div>
            <div className='w-full text-center'>
                <Avatar
                    src={imageUrl || "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1200px-No_image_available.svg.png"}
                    className='w-[150px] h-[150px] lg:w-[200px] lg:h-[200px] border-2 border-[--color-grey-300]'
                />
                <Upload
                    className='translate-x-[20px] lg:translate-x-[40px] -translate-y-[20px]'
                    maxCount={1}
                    name='avatar'
                    listType="picture-circle"
                    customRequest={handleUpload}
                    showUploadList={false}
                >
                    <FaCamera className='text-[--main-color]' />
                </Upload>
            </div>
            <form className='my-[3rem]' onSubmit={handleSave}>
                <h1 className='text-[2.5rem] text-[--color-grey-900] font-bold'>General information</h1>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-[1rem] mt-[3rem]'>
                    <div className='space-y-[1.2rem]'>
                        <p className='text-[1.8rem] text-[--color-grey-700] font-semibold'>Full name</p>
                        <input
                            className='w-full p-[1rem] text-[--color-grey-700] border-2 border-[--color-grey-500] rounded-xl'
                            name="fullName"
                            value={inputs.fullName}
                            onChange={handleChangeInput}
                        />
                    </div>
                    <div className='space-y-[1.2rem]'>
                        <p className='text-[1.8rem] text-[--color-grey-700] font-semibold'>Birthday</p>
                        <input
                            className='w-full p-[1rem] text-[--color-grey-700] border-2 border-[--color-grey-500] rounded-xl'
                            type='date'
                            name="dob"
                            value={inputs.dob}
                            onChange={handleChangeInput}
                        />
                    </div>
                    <div className='space-y-[1.2rem]'>
                        <p className='text-[1.8rem] text-[--color-grey-700] font-semibold'>Gender</p>
                        <select
                            className='w-full p-[1rem] text-[--color-grey-700] border-2 border-[--color-grey-500] rounded-xl'
                            name="gender"
                            value={inputs.gender}
                            onChange={(e) => {
                                switch (e.target.value) {
                                    case "MALE":
                                        setInputs({ ...inputs, gender: "MALE" });
                                        break;
                                    case "FEMALE":
                                        setInputs({ ...inputs, gender: "FEMALE" });
                                        break;
                                    case "NEUTRAL":
                                        setInputs({ ...inputs, gender: "NEUTRAL" });
                                        break;
                                    default:
                                        return;
                                }
                            }}
                        >
                            <option value="MALE">Male</option>
                            <option value="FEMALE">Female</option>
                            <option value="NEUTRAL">Neutral</option>
                        </select>
                    </div>
                    <div className='space-y-[1.2rem]'>
                        <p className='text-[1.8rem] text-[--color-grey-700] font-semibold'>Email</p>
                        <input
                            className='w-full p-[1rem] text-[--color-grey-700] border-2 border-[--color-grey-500] rounded-xl'
                            disabled={true}
                            value={inputs.email}
                            type='email'
                        />
                    </div>
                    <div className='space-y-[1.2rem]'>
                        <p className='text-[1.8rem] text-[--color-grey-700] font-semibold'>Phone Number</p>
                        <input
                            className='w-full p-[1rem] text-[--color-grey-700] border-2 border-[--color-grey-500] rounded-xl'
                            name="phoneNumber"
                            value={inputs.phoneNumber}
                            type='tel'
                            onChange={handleChangeInput}
                        />
                    </div>
                    <div className='space-y-[1.2rem]'>
                        <p className='text-[1.8rem] text-[--color-grey-700] font-semibold'>Address</p>
                        <input
                            className='w-full p-[1rem] text-[--color-grey-700] border-2 border-[--color-grey-500] rounded-xl'
                            name="address"
                            value={inputs.address}
                            type='text'
                            onChange={handleChangeInput}
                        />
                    </div>
                    <br />
                </div>
                <div className='flex items-center gap-[1rem]'>
                    <Button text="Save All" size='large' onClick={handleSave} disabled={isUpdating} />
                    <Button text="Cancel" size='large' type='outline' onClick={() => setCancel(true)} disabled={isUpdating} />
                </div>
            </form>
            <Modal
                title={<h1 h1 className='text-[2rem] font-bold'>
                    {user.hasPassword ? "Update Password" : "Add Password"}
                </h1>}
                open={isModalOpen}
                onOk={() => setIsModalOpen(false)}
                onCancel={() => {
                    setChangePasswords({
                        currentPassword: "",
                        newPassword: "",
                        newPasswordConfirm: ""
                    });
                    setIsModalOpen(false);
                }}
                footer={
                    [
                        <Button
                            classNames="mr-2" size='medium' type='outline' text="Cancel"
                            disabled={isLoading}
                            onClick={() => {
                                setChangePasswords({
                                    currentPassword: "",
                                    newPassword: "",
                                    newPasswordConfirm: ""
                                });
                                setIsModalOpen(false)
                            }}
                        />,
                        <Button
                            classNames="ml-2"
                            size='medium'
                            onClick={() => {
                                if (user.hasPassword) {
                                    dispatch(updatePasswordAction(changePasswords));
                                } else {
                                    dispatch(addPasswordAction(addPasswords));
                                }
                            }}
                            disabled={isLoading}
                            text={user.hasPassword ? "Update password" : "Add Password"}
                        />
                    ]
                }
            >
                {
                    user.hasPassword ? <div className='space-y-4'>
                        <Input.Password
                            className='w-full p-[1rem] text-[--color-grey-700] border-2 border-[--color-grey-500] rounded-xl'
                            name="currentPassword"
                            placeholder='Current password'
                            value={changePasswords.currentPassword}
                            onChange={(e) => setChangePasswords({ ...changePasswords, currentPassword: e.target.value })}
                        />
                        <Input.Password
                            className='w-full p-[1rem] text-[--color-grey-700] border-2 border-[--color-grey-500] rounded-xl'
                            name="newPassword"
                            placeholder='New password'
                            value={changePasswords.newPassword}
                            onChange={(e) => setChangePasswords({ ...changePasswords, newPassword: e.target.value })}
                        />
                        <Input.Password
                            className='w-full p-[1rem] text-[--color-grey-700] border-2 border-[--color-grey-500] rounded-xl'
                            name="newPasswordConfirm"
                            placeholder='New password confirmation'
                            value={changePasswords.newPasswordConfirm}
                            onChange={(e) => setChangePasswords({ ...changePasswords, newPasswordConfirm: e.target.value })}
                        />
                    </div> : <div className='space-y-4'>
                        <Input.Password
                            className='w-full p-[1rem] text-[--color-grey-700] border-2 border-[--color-grey-500] rounded-xl'
                            name="password"
                            placeholder='Password'
                            value={addPasswords.password}
                            onChange={(e) => setAddPasswords({ ...addPasswords, password: e.target.value })}
                        />
                        <Input.Password
                            className='w-full p-[1rem] text-[--color-grey-700] border-2 border-[--color-grey-500] rounded-xl'
                            name="passwordConfirm"
                            placeholder="Password confirmation"
                            value={addPasswords.passwordConfirm}
                            onChange={(e) => setAddPasswords({ ...addPasswords, passwordConfirm: e.target.value })}
                        />
                    </div>
                }
            </Modal>
            <Button text={user.hasPassword ? "Change Password" : "Add Password"} type='sub' size='large' onClick={() => setIsModalOpen(true)} />
        </div>
    )
}

export default Profile
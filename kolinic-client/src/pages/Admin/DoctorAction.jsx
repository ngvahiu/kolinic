import { DatePicker, Form, Input, Select, Upload } from 'antd';
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Heading from '../../ui/Heading/Heading';
import TextArea from 'antd/es/input/TextArea';
import MyButton from '../../ui/Button/Button';
import { PlusOutlined } from '@ant-design/icons'
import { formatDate } from '../../util/helper'
import dayjs from 'dayjs'
import { getDepartmentsAction } from '../../redux/department.slice';
import { createDoctorAction, getDoctorAction, updateDoctorAction } from '../../redux/doctor.slice';

function DoctorAction() {
    const [avatarUrl, setAvatarUrl] = useState();
    const [doctorInfo, setDoctorInfo] = useState({
        name: "",
        description: "",
        about: "",
        education: "",
        dob: formatDate(new Date()),
        workingYear: 0,
        departmentId: null,
        avatar: null
    });
    const [form] = Form.useForm();
    let { id } = useParams();
    const { isLoading, doctor } = useSelector(state => state.doctor);
    const { departments } = useSelector(state => state.department);
    const dispatch = useDispatch();

    useEffect(function () {
        dispatch(getDepartmentsAction({}));
    }, [dispatch])
    useEffect(function () {
        if (departments && departments.length > 0) setDoctorInfo(doctorInfo => ({ ...doctorInfo, departmentId: departments[0].id }))
    }, [departments])

    useEffect(function () {
        if (id) dispatch(getDoctorAction(id));
        else {
            form.setFieldsValue({
                name: "",
                description: "",
                about: "",
                education: "",
                workingYear: 0,
            });
            setDoctorInfo({
                name: "",
                description: "",
                about: "",
                education: "",
                dob: formatDate(new Date()),
                workingYear: 0,
                departmentId: null,
                avatar: null
            });
            setAvatarUrl(null);
        }
    }, [dispatch, id])
    useEffect(function () {
        if (doctor && id) {
            form.setFieldsValue({
                name: doctor.name,
                description: doctor.description,
                about: doctor.about,
                education: doctor.education,
                workingYear: doctor.workingYear
            });
            setDoctorInfo(doctorInfo => ({
                ...doctorInfo,
                dob: formatDate(new Date(doctor.dob)),
                departmentId: doctor.department.id
            }));
            setAvatarUrl(doctor.avatar);
        }
    }, [doctor, id])

    const getBase64 = useCallback((img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }, []);

    function handleUploadLogo(info) {
        getBase64(info.file, (url) => {
            setAvatarUrl(url);
            setDoctorInfo({ ...doctorInfo, avatar: info.file });
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        const fieldErrors = form.getFieldsError();
        const fieldValues = form.getFieldsValue();
        if (!id && fieldErrors.every(fieldError => fieldError.errors.length === 0) && Object.keys(fieldValues).every(key => !!fieldValues[key])) {
            dispatch(createDoctorAction({
                body: {
                    name: fieldValues.name,
                    about: fieldValues.about,
                    education: fieldValues.education,
                    description: fieldValues.description,
                    workingYear: fieldValues.workingYear,
                    dob: doctorInfo.dob,
                    departmentId: doctorInfo.departmentId
                },
                avatar: doctorInfo.avatar
            }));
            form.setFieldsValue({
                name: "",
                description: "",
                about: "",
                education: "",
                workingYear: 0,
            });
            setDoctorInfo({ ...doctorInfo, departmentId: departments[0].id, avatar: null, dob: formatDate(new Date()) });
            setAvatarUrl(null);
        } else if (id && fieldErrors.every(fieldError => fieldError.errors.length === 0)) {
            dispatch(updateDoctorAction({
                id,
                body: {
                    name: fieldValues.name,
                    about: fieldValues.about,
                    education: fieldValues.education,
                    description: fieldValues.description,
                    workingYear: fieldValues.workingYear,
                    dob: doctorInfo.dob,
                    departmentId: doctorInfo.departmentId
                },
                avatar: doctorInfo.avatar
            }))
            form.setFieldsValue({
                name: "",
                description: "",
                about: "",
                education: "",
                dob: formatDate(new Date()),
                workingYear: 0,
            });
            setDoctorInfo({ ...doctorInfo, departmentId: departments[0].id, avatar: null, dob: formatDate(new Date()) });
            setAvatarUrl(null);
        }
    }

    return (
        <div>
            <Heading title={id ? `DOCTOR #${id}` : "CREATE DOCTOR"} textAlign='left' size='small' />
            <Form
                labelCol={{
                    span: 6,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
                style={{
                    maxWidth: 600,
                }}
                form={form}
                initialValues={doctorInfo}
                onSubmitCapture={handleSubmit}
            >
                <Form.Item
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Doctor's name required"
                        }
                    ]}
                    label="Doctor's name"
                    wrapperCol={{ span: 24 }}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="description"
                    rules={[
                        {
                            required: true,
                            message: "Description required"
                        }
                    ]}
                    label="Description"
                    wrapperCol={{ span: 24 }}
                >
                    <TextArea />
                </Form.Item>
                <Form.Item
                    name="about"
                    rules={[
                        {
                            required: true,
                            message: "About required"
                        }
                    ]}
                    label="About"
                    wrapperCol={{ span: 24 }}
                >
                    <TextArea />
                </Form.Item>
                <Form.Item
                    name="education"
                    rules={[
                        {
                            required: true,
                            message: "Education required"
                        }
                    ]}
                    label="Education"
                    wrapperCol={{ span: 24 }}
                >
                    <Input />
                </Form.Item>
                <Form.Item label="Date of birth">
                    <DatePicker allowClear={false} disabledDate={(d) => d.isAfter(new Date())} defaultValue={dayjs(doctorInfo.dob, "YYYY-MM-DD")} value={dayjs(doctorInfo.dob, "YYYY-MM-DD")} onChange={(e) => {
                        setDoctorInfo({ ...doctorInfo, dob: formatDate(new Date(e['$d'])) })
                    }} />
                </Form.Item>
                <Form.Item
                    name="workingYear"
                    rules={[
                        {
                            required: true,
                            message: "Working year required"
                        }
                    ]}
                    label="Working year"
                    wrapperCol={{ span: 24 }}
                >
                    <Input type='number' min={0} />
                </Form.Item>
                <Form.Item label="Department">
                    <Select
                        size='large'
                        allowClear={false}
                        showSearch
                        optionFilterProp="children"
                        filterOption={(input, option) => (option?.label ?? '').includes(input)}
                        filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        labelInValue
                        value={doctorInfo.departmentId}
                        onChange={(e) => setDoctorInfo({ ...doctorInfo, departmentId: e.value })}
                    >
                        {
                            departments?.map(department => <Select.Option value={department.id} key={department.id}>
                                {department.name}
                            </Select.Option>)
                        }
                    </Select>
                </Form.Item>
                <Form.Item
                    name="avatar"
                    label="Avatar"
                    rules={[
                        {
                            required: id ? false : true,
                            message: "Avatar required"
                        }
                    ]}
                >
                    <Upload listType='picture-card' maxCount={1} showUploadList={false} customRequest={handleUploadLogo}>
                        <button
                            style={{
                                border: 0,
                                background: 'none',
                            }}
                            type="button"
                        >
                            <PlusOutlined />
                        </button>
                    </Upload>
                    {avatarUrl && <img src={avatarUrl} alt='avatar' />
                    }
                </Form.Item>
                <Form.Item className='text-center'>
                    <MyButton text={id ? "Update" : "Create"} btnType='submit' disabled={isLoading} />
                </Form.Item>
            </Form>
        </div>
    )
}

export default DoctorAction
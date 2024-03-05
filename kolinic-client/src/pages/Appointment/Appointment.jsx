import React, { useEffect, useState } from 'react'
import Button from '../../ui/Button/Button'
import { Calendar, Col, Form, Input, Row, Select, TimePicker, theme } from 'antd'
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { getDepartmentsAction } from '../../redux/department.slice';
import { getDoctorsAction } from '../../redux/doctor.slice';
import { createAppointmentAction } from '../../redux/appointment.slice';
import { formatDate, getNextDate } from '../../util/helper';
import { useLocation } from 'react-router-dom';

const formatTime = 'HH:mm';

const onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
};

function Appointment() {
    const { token } = theme.useToken();
    const wrapperStyle = {
        width: 300,
        border: `1px solid ${token.colorBorderSecondary}`,
        borderRadius: token.borderRadiusLG,
    };

    const location = useLocation();
    let data = location.state;

    const [appointmentInfo, setAppointmentInfo] = useState({
        patientName: data?.patientName || "",
        gender: data?.gender || "MALE",
        patientAge: data?.patientAge || 0,
        phoneNumber: data?.phoneNumber || "",
        departmentId: data?.departmentId || null,
        doctorId: data?.doctorId || null,
        symptoms: data?.symptoms || "",
        appointmentDate: data?.appointmentDate || getNextDate(new Date()),
        appointmentTime: "08:00",
        branchAddress: "688 South Fifth Street, Milton Keynes, Manchester"
    });
    const [filteredDoctors, setFilteredDoctors] = useState([]);

    const { departments } = useSelector(state => state.department);
    const { doctors } = useSelector(state => state.doctor);
    const dispatch = useDispatch();

    useEffect(function () {
        dispatch(getDepartmentsAction({}));
        dispatch(getDoctorsAction({}));
    }, [dispatch])
    useEffect(function () {
        if (departments && departments.length > 0 && doctors && doctors.length > 0 &&
            !appointmentInfo.departmentId && !appointmentInfo.doctorId
        ) {
            setAppointmentInfo(appointmentInfo => ({ ...appointmentInfo, departmentId: departments[0].id }));
            setAppointmentInfo(appointmentInfo => ({ ...appointmentInfo, doctorId: doctors[0].id }));
            setFilteredDoctors(doctors.filter(doctor => doctor.department.id === departments[0].id));
        } else if (appointmentInfo.departmentId) {
            const filteredDoctors = doctors.filter(doctor => doctor.department.id === appointmentInfo.departmentId)
            setFilteredDoctors(filteredDoctors);
        }
    }, [departments, doctors])
    useEffect(function () {
        if (filteredDoctors.length > 0) {
            setAppointmentInfo(appointmentInfo => ({ ...appointmentInfo, doctorId: filteredDoctors[0].id }));
        }
    }, [filteredDoctors])
    useEffect(function () {
        if (location.state) {
            data = location.state;
            setAppointmentInfo({
                patientName: data.patientName || "",
                gender: data.gender || "MALE",
                patientAge: data.patientAge || 0,
                phoneNumber: data.phoneNumber || "",
                departmentId: data.departmentId || null,
                doctorId: data.doctorId || null,
                symptoms: data.symptoms || "",
                appointmentDate: data.appointmentDate || getNextDate(new Date()),
                appointmentTime: "08:00",
                branchAddress: "688 South Fifth Street, Milton Keynes, Manchester"
            });
        }
    }, [location.state])


    const [form] = Form.useForm();

    function handleChange(e) {
        setAppointmentInfo({ ...appointmentInfo, [e.target.id]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        const fieldErrors = form.getFieldsError();
        const fieldValues = form.getFieldsValue();
        if (fieldErrors.every(fieldError => fieldError.errors.length === 0) && Object.keys(fieldValues).every(key => !!fieldValues[key])) {
            dispatch(createAppointmentAction({
                ...form.getFieldsValue(),
                departmentId: appointmentInfo.departmentId,
                doctorId: appointmentInfo.doctorId,
                appointmentTime: `${appointmentInfo.appointmentDate} ${appointmentInfo.appointmentTime}`,
                appointmentAddress: appointmentInfo.branchAddress
            }));
            form.setFieldsValue({
                patientName: "",
                gender: "MALE",
                patientAge: 0,
                phoneNumber: "",
                symptoms: ""
            });
        }
    }

    return (
        <div>
            <h1 className='text-center text-[--main-color] text-[3rem] md:text-[4rem] font-bold uppercase'>Book Appointment</h1>
            <Form
                form={form}
                initialValues={appointmentInfo}
                onChange={handleChange}
                onSubmitCapture={handleSubmit}
            >
                <Row gutter={12}>
                    <Col span={24} md={12}>
                        <Form.Item name="patientName" label="Full name" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}
                            rules={[
                                {
                                    required: true,
                                    message: "Full name required"
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="gender" label="Gender" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
                            <Select
                                size='large'
                                allowClear={false}
                                showSearch
                                optionFilterProp="children"
                                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                            >
                                <Select.Option value="MALE">
                                    Male
                                </Select.Option>
                                <Select.Option value="FEMALE">
                                    Female
                                </Select.Option>
                                <Select.Option value="NEUTRAL">
                                    Neutral
                                </Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="patientAge" label="Age" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}
                            rules={[
                                {
                                    required: true,
                                    message: "Age required"
                                },
                            ]}
                        >
                            <Input type='number' min={0} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="phoneNumber" label="Phone number" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}
                            rules={[
                                {
                                    required: true,
                                    message: "Phone number required"
                                },
                                {
                                    pattern: "^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$",
                                    message: "Should be in phone number format"
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12} md={8}>
                        <Form.Item label="Department" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
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
                                value={appointmentInfo.departmentId}
                                onChange={(e) => {
                                    setAppointmentInfo({ ...appointmentInfo, departmentId: e.value });
                                    setFilteredDoctors(doctors.filter(doctor => doctor.department.id === e.value));
                                }}
                            >
                                {
                                    departments?.map(department => <Select.Option value={department.id} key={department.id}>
                                        {department.name}
                                    </Select.Option>)
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={24} md={8}>
                        <Form.Item label="Doctor" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
                            <Select
                                size='large'
                                allowClear={false}
                                showSearch
                                optionFilterProp="children"
                                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                value={appointmentInfo.doctorId}
                                onChange={(e) => {
                                    setAppointmentInfo({ ...appointmentInfo, doctorId: e.value });
                                }}
                            >
                                {
                                    filteredDoctors.length > 0 && filteredDoctors.map(doctor => <Select.Option value={doctor.id} key={doctor.id}>
                                        {doctor.name}
                                    </Select.Option>)
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={24} md={8}>
                        <Form.Item name="symptoms" label="Symptoms" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}
                            rules={[
                                {
                                    required: true,
                                    message: "Symptoms details required"
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col className='col-span-12'>
                        <Form.Item label="Appointment Time" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
                            <div style={wrapperStyle}>
                                {appointmentInfo.appointmentDate && <Calendar onPanelChange={onPanelChange} fullscreen={false} disabledDate={(d) => d.isBefore(new Date())} defaultValue={dayjs(appointmentInfo.appointmentDate, "YYYY-MM-DD")} onChange={(e) => {
                                    setAppointmentInfo({ ...appointmentInfo, appointmentDate: formatDate(new Date(e['$d'])) })
                                }} />}
                                <TimePicker className='text-[1.8rem]' defaultValue={dayjs(appointmentInfo.appointmentTime, formatTime)} format={formatTime} minuteStep={15} hideDisabledOptions={true} disabledHours={() => [0, 1, 2, 3, 4, 5, 6, 7, 12, 19, 20, 21, 22, 23]} onChange={(e) => {
                                    setAppointmentInfo({ ...appointmentInfo, appointmentTime: `${e['$H'] < 10 ? `0${e['$H']}` : `${e['$H']}`}:${e['$m'] < 10 ? `0${e['$m']}` : `${e['$m']}`}` });
                                }} />
                            </div>
                        </Form.Item>
                    </Col>
                    <Col className='col-span-4'>
                        <Form.Item label="Branch address" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
                            <Select
                                size='large'
                                placeholder="Select branch address"
                                showSearch
                                optionFilterProp="children"
                                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                value={appointmentInfo.branchAddress}
                                onChange={(value) => setAppointmentInfo({ ...appointmentInfo, branchAddress: value })}
                                options={[
                                    {
                                        value: '688 South Fifth Street, Milton Keynes, Manchester',
                                        label: '688 South Fifth Street, Milton Keynes, Manchester',
                                    },
                                    {
                                        value: '6 Newburgh St, Carnaby, London',
                                        label: '6 Newburgh St, Carnaby, London',
                                    }
                                ]}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <div className='w-full text-center mt-[4rem]'>
                    <Button classNames='w-[200px]' text="Submit" size='large' btnType="submit" />
                </div>
            </Form>
        </div>
    )
}

export default Appointment
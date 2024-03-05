import React, { useEffect, useState } from 'react'
import { DatePicker, Form, Input, Select } from 'antd'
import Button from '../../ui/Button/Button'
import { formatDate, getNextDate } from '../../util/helper';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

function FormBookAppointment({ effect = true, doctors, departments }) {
    const [appointmentInfo, setAppointmentInfo] = useState({
        patientName: "",
        gender: "MALE",
        patientAge: "",
        phoneNumber: "",
        departmentId: null,
        doctorId: null,
        symptoms: "",
        appointmentDate: getNextDate(new Date()),
    });
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const navigate = useNavigate();

    useEffect(function () {
        if (departments && departments.length > 0 && doctors && doctors.length > 0) {
            setAppointmentInfo(appointmentInfo => ({ ...appointmentInfo, departmentId: departments[0].id }));
            setAppointmentInfo(appointmentInfo => ({ ...appointmentInfo, doctorId: doctors[0].id }));
            setFilteredDoctors(doctors.filter(doctor => doctor.department.id === departments[0].id));
        }
    }, [departments, doctors]);
    useEffect(function () {
        if (filteredDoctors.length > 0) {
            setAppointmentInfo(appointmentInfo => ({ ...appointmentInfo, doctorId: filteredDoctors[0].id }));
        }
    }, [filteredDoctors]);

    const [form] = Form.useForm();
    function handleChange(e) {
        setAppointmentInfo({ ...appointmentInfo, [e.target.id]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        const fieldErrors = form.getFieldsError();
        if (fieldErrors.every(fieldError => fieldError.errors.length === 0) && fieldErrors.every(fieldError => appointmentInfo[fieldError.name[0]] !== "")) {
            navigate('/make-appointment', { state: appointmentInfo });
        }
    }

    return (
        <div className='bg-[--color-grey-0] py-[5px] px-[5px] md:py-[20px] md:px-[30px] rounded-2xl text-center border-2 shadow-lg w-full sm:min-w-[350px] md:min-w-[400px] max-w-[500px] space-y-[2rem]' data-aos={effect ? "fade-left" : ""} data-aos-duration="1000">
            <h3 className='font-extrabold mb-3 text-[1.5rem] md:text-[2.5rem]'>Book Appointment</h3>
            <div className='heading-bottom-border'></div>
            <Form
                form={form}
                initialValues={appointmentInfo}
                onChange={handleChange}
                onSubmitCapture={handleSubmit}
            >
                <Form.Item
                    name="patientName"
                    rules={[
                        {
                            required: true,
                            message: "Patient name required"
                        }
                    ]}
                >
                    <Input placeholder="Full Name" className="w-full h-[25px] md:h-[40px]" value={appointmentInfo.patientName} onChange={e => setAppointmentInfo({ ...appointmentInfo, patientName: e.target.value })} />
                </Form.Item>
                <Form.Item
                    name="patientAge"
                    rules={[
                        {
                            required: true,
                            message: "Patient age required"
                        }
                    ]}
                >
                    <Input placeholder="Age" type='number' min={0} className="w-full h-[25px] md:h-[40px]" value={appointmentInfo.patientAge} onChange={e => setAppointmentInfo({ ...appointmentInfo, patientAge: e.target.value })} />
                </Form.Item>
                <Form.Item
                    name="phoneNumber"
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
                    <Input
                        placeholder="Phone Number" className="w-full h-[25px] md:h-[40px]"
                        value={appointmentInfo.phoneNumber} onChange={e => setAppointmentInfo({ ...appointmentInfo, phoneNumber: e.target.value })}

                    />
                </Form.Item>
                <Form.Item>
                    <Select
                        showSearch
                        className="w-full h-[25px] md:h-[40px]"
                        placeholder="Select Department"
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
                <Form.Item>
                    <Select
                        showSearch
                        className="w-full h-[25px] md:h-[40px]"
                        placeholder="Select Doctor"
                        optionFilterProp="children"
                        filterOption={(input, option) => (option?.label ?? '').includes(input)}
                        filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        labelInValue
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
                <Form.Item>
                    <Select
                        showSearch
                        placeholder="Gender"
                        className="w-full h-[25px] md:h-[40px]"
                        options={[
                            {
                                value: 'MALE',
                                label: 'Male',
                            },
                            {
                                value: 'FEMALE',
                                label: 'Female',
                            },
                            {
                                value: 'NEUTRAL',
                                label: 'Neutral',
                            }
                        ]}
                        value={appointmentInfo.gender}
                        onChange={value => setAppointmentInfo({ ...appointmentInfo, gender: value })}
                    />
                </Form.Item>
                <Form.Item
                    name="symptoms"
                    rules={[
                        {
                            required: true,
                            message: "Symptoms details required"
                        }
                    ]}
                >
                    <Input placeholder="Give Some Symptoms" className="w-full h-[25px] md:h-[40px]" />
                </Form.Item>
                <Form.Item>
                    <DatePicker placeholder="Appointment Date" size='large' allowClear={false} disabledDate={(d) => d.isBefore(new Date())} className='w-full h-[25px] md:h-[40px] rounded-3xl' defaultValue={dayjs(getNextDate(new Date()), 'YYYY-MM-DD')} onChange={(e) => {
                        setAppointmentInfo({ ...appointmentInfo, appointmentDate: formatDate(new Date(e['$d'])) })
                    }
                    } />
                </Form.Item>
                <Button text='BOOK YOUR APPOINTMENT' size='full' type='main' btnType='submit' />
            </Form>
        </div>
    )
}

export default FormBookAppointment
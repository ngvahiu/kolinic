import { Col, Form, Input, Row, Select, Steps, Table, theme } from 'antd'
import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getCart, getTotalCartPrice } from '../../redux/cart.slice';
import Button from '../../ui/Button/Button';
import Heading from '../../ui/Heading/Heading';
import cashImage from '../../assets/img/cash.png';
import paypalImage from '../../assets/img/paypal.png';
import logoImage from '../../assets/img/logo.png';
import { getUser } from '../../redux/user.slice';
import { createDrugOrderAction } from '../../redux/drug.slice';
import Paypal from '../../components/Paypal/Paypal';

function Checkout() {
    const { token } = theme.useToken();
    const me = useSelector(getUser);
    const [current, setCurrent] = useState(0);
    const [information, setInformation] = useState({
        receiverName: me.fullName,
        contactNumber: me.phoneNumber,
        address: me.address,
        email: me.email,
        paymentMethod: "CASH"
    });
    const [showPaypalBtn, setShowPaypalBtn] = useState(false);

    const steps = useMemo(() => [
        {
            title: <span className='font-bold'>First</span>,
            description: "Confirm order",
            content: <FirstStepContent />
        },
        {
            title: <span className='font-bold'>Second</span>,
            description: "Provide information and payment method",
            content: <SecondStepContent information={information} setInformation={setInformation} />,
        },
        {
            title: <span className='font-bold'>Last</span>,
            description: "Complete checkout process",
            content: <LastStepContent paymentMethod={information.paymentMethod} />,
        },
    ], [information]);

    const { cart } = useSelector(state => state.cart);
    const totalPrice = useSelector(getTotalCartPrice);
    const { isCreating } = useSelector(state => state.drug);
    const dispatch = useDispatch();

    const next = () => {
        setCurrent(current + 1);
    };
    const prev = () => {
        setCurrent(current - 1);
    };
    const items = steps.map((item) => ({
        key: item.title,
        title: item.title,
        description: item.description
    }));

    return (
        <div className='flex flex-col items-center'>
            <Heading title="CHECKOUT PROCESS" />
            <Steps
                current={current} items={items}
            />
            <div style={{
                width: '80%',
                textAlign: 'center',
                color: token.colorTextTertiary,
                backgroundColor: token.colorFillAlter,
                borderRadius: token.borderRadiusLG,
                border: `1px dashed ${token.colorBorder}`,
                marginTop: 16,
            }}>
                {steps[current].content}
            </div>
            {
                (current === steps.length - 1 && showPaypalBtn) && <div className='inline-block mt-5'>
                    <Paypal information={information} cart={cart} total={totalPrice.toFixed(2)} />
                </div>
            }
            <div className='mt-12 flex justify-center gap-[1rem]'>
                {current > 0 && (
                    <Button
                        type='outline'
                        text="Previous"
                        style={{
                            margin: '0 8px',
                        }}
                        onClick={() => {
                            if (current === steps.length - 1) setShowPaypalBtn(false)
                            prev();
                        }}
                    />
                )}
                {(cart?.length > 0 && current < steps.length - 1) && (
                    <Button text="Next" onClick={() => next()} />
                )}
                {
                    (current === steps.length - 1 && !showPaypalBtn) && <Button
                        text={information.paymentMethod === "PAYPAL" ? "Complete & Start Payment" : "Complete Order"}
                        disabled={isCreating}
                        onClick={
                            () => {
                                if (information.paymentMethod === "PAYPAL") {
                                    setShowPaypalBtn(true);
                                } else {
                                    dispatch(createDrugOrderAction({
                                        ...information,
                                        listItems: cart.map(cartItem => ({
                                            drugId: cartItem.id,
                                            quantity: cartItem.quantity
                                        }))
                                    }));
                                }
                            }
                        }
                    />
                }
            </div>
        </div>
    )
}

function FirstStepContent() {
    const cart = useSelector(getCart);
    const totalPrice = useSelector(getTotalCartPrice);

    const columns = useMemo(() => [
        {
            title: '',
            dataIndex: 'img',
            key: 'img',
            render: (_, { img }) => <div className='flex justify-center'>
                <img className='w-[80px] h-[80px]' src={img} alt='drug-img' />
            </div>,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (_, { id, name }) => <span className='hover:text-[--main-color]'>{name}</span>
        },
        {
            title: 'Unit price',
            dataIndex: 'price',
            key: 'price',
            render: (_, { price }) => <span className='text-[1.2rem] md:text-[1.6rem] text-[--main-color]'>$ {price}</span>
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (_, { quantity }) => <span className='text-[--color-grey-500]'>{quantity}</span>
        },
        {
            title: 'Sub total',
            dataIndex: 'subTotal',
            key: 'subTotal',
            render: (_, { price, quantity }) => <span className='text-[1.2rem] md:text-[1.6rem] text-[--main-color]'>$ {price * quantity}</span>,
        }
    ], []);

    return <div className='mx-[1rem] md:mx-[2rem]'>
        <Table columns={columns} dataSource={cart} pagination={false} scroll={{
            x: true
        }} />
        <div className='w-full flex justify-end items-center gap-[2rem] my-[1rem]'>
            <span className='text-[1.4rem] md:text-[1.8rem] text-[--color-grey-600] font-bold'>Total</span>
            <span className='text-[1.4rem] md:text-[1.8rem] text-[--main-color] font-bold'>$ {totalPrice.toFixed(2)}</span>
        </div>
    </div>
}

function SecondStepContent({ information, setInformation }) {
    const [form] = Form.useForm();

    function handleChange(e) {
        setInformation({ ...information, [e.target.id]: e.target.value });
    }

    return <Form
        form={form}
        className='p-[2rem]'
        initialValues={information}
        onChange={handleChange}
    >
        <Row gutter={12}>
            <Col sm={{ span: 12 }} span={24}>
                <Form.Item name="receiverName" label="Receiver's name" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}
                    rules={[
                        {
                            required: true,
                            message: "Receiver's name required"
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
            </Col>
            <Col sm={{ span: 12 }} span={24}>
                <Form.Item name="contactNumber" label="Contact number" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}
                    rules={[
                        {
                            required: true,
                            message: "Contact number required"
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
            <Col md={{ span: 12 }} span={24}>
                <Form.Item name="address" label="Address" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}
                    rules={[
                        {
                            required: true,
                            message: "Address required"
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
            </Col>
            <Col sm={{ span: 12 }} span={24}>
                <Form.Item name="email" label="Email" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}
                    rules={[
                        {
                            required: true,
                            message: 'Email required'
                        },
                        {
                            type: "email",
                            message: "Should be in email format"
                        }
                    ]}
                >
                    <Input disabled />
                </Form.Item>
            </Col>
            <Col sm={{ span: 8 }} span={24}>
                <Form.Item name="paymentMethod" label="Payment method" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
                    <Select value={information.paymentMethod} onChange={(value) => setInformation({ ...information, paymentMethod: value })} allowClear>
                        <Select.Option value="CASH">
                            <p className='flex items-center gap-2'>
                                <img className='w-[30px] h-[30px]' src={cashImage} alt="cash-img" />
                                <span className='font-semibold text-[--color-grey-500]'>Cash</span>
                            </p>
                        </Select.Option>
                        <Select.Option value="PAYPAL">
                            <p className='flex items-center gap-2'>
                                <img className='w-[30px] h-[30px]' src={paypalImage} alt="cash-img" />
                                <span className='font-semibold text-[--color-grey-500]'>Paypal</span>
                            </p>
                        </Select.Option>
                    </Select>
                </Form.Item>
            </Col>
        </Row>
    </Form>
}

function LastStepContent({ paymentMethod }) {
    return <div className='flex flex-col items-center gap-[2rem] p-[2rem]'>
        <img src={logoImage} alt='logo' />
        <p className='text-[--color-grey-500]'>To complete your purchase, please click the {paymentMethod === "CASH" ? "'Complete Order'" : "'Complete & Start Payment'"} button below. By doing so, you acknowledge that all details are correct, and you agree to our terms and conditions.</p>
    </div>
}

export default Checkout
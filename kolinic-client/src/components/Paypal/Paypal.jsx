import React, { useState } from 'react'
import { useRef } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createDrugOrderAction } from '../../redux/drug.slice';
import { toast } from 'react-toastify';

function Paypal({ information, cart, total }) {
    const [sdkReady, setSdkReady] = useState(false);
    useEffect(() => {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.REACT_APP_PAYPAL_ID}`
        script.async = true;
        script.onload = () => {
            setSdkReady(true)
        }
        document.body.appendChild(script)
    }, [])
    const paypal = useRef();
    const dispatch = useDispatch();

    useEffect(() => {
        if (sdkReady) {
            window.paypal
                .Buttons({
                    createOrder: (data, actions, err) => {
                        return actions.order.create({
                            intent: "CAPTURE",
                            purchase_units: [
                                {
                                    description: "Payment for new order",
                                    amount: {
                                        currency_code: "USD",
                                        value: total,
                                    },
                                },
                            ],
                        });
                    },
                    onApprove: async (data, actions) => {
                        const order = await actions.order.capture();
                        toast.success("Pay for order successfully", {
                            position: "top-right"
                        });
                        dispatch(createDrugOrderAction({
                            ...information,
                            listItems: cart.map(cartItem => ({
                                drugId: cartItem.id,
                                quantity: cartItem.quantity
                            }))
                        }));
                    },
                    onError: (err) => {
                        toast.error(err, {
                            position: "top-right"
                        });
                    },
                })
                .render(paypal.current);
        }
    }, [sdkReady, total, dispatch, cart, information]);

    return (
        <div>
            <div ref={paypal}></div>
        </div>
    )
}

export default Paypal
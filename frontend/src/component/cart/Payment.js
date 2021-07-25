import React, { Fragment, useEffect } from 'react'


import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../layout/MetaData';
import { useAlert } from 'react-alert'
import { createOrder, clearErrors } from '../../actions/orderAction';
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js'

import axios from 'axios'

const options = {
    styles: {
        base: {
            fontSize: '16px'
        },
        invalid: {
            color: '#9e2146'
        }
    }
}

const Payment = ({ history }) => {

    const alert = useAlert()
    const stripe = useStripe()
    const elements = useElements()
    const dispatch = useDispatch()

    const { user } = useSelector(state => state.auth)
    const { cartItems, shippingInfo } = useSelector(state => state.cart)
    const { error } = useSelector(state => state.newOrder)

    useEffect(() => {

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

    }, [dispatch, alert, error])

    const order = {
        orderItems: cartItems,
        shippingInfo
    }

    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'))
    if (orderInfo) {
        order.itemPrice = orderInfo.itemsPrice
        order.shippingPrice = orderInfo.shippingPrice
        order.totalPrice = orderInfo.totalPrice
    }

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100)
    }

    const submitHandler = async (e) => {
        e.preventDefault()

        document.querySelector('.btn-payment').disabled = true

        let res

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            res = await axios.post('/api/v1/payment/process', paymentData, config)
            const clientSecret = res.data.client_secret

            if (!stripe || !elements) {
                return
            }

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email,
                    }
                }
            })

            if (result.error) {
                alert.error(result.error.message)
                document.querySelector('.btn-payment').disabled = false
            } else {
                if (result.paymentIntent.status === 'succeeded') {

                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status,
                    }

                    dispatch(createOrder(order))

                    history.push('/success')
                } else {
                    alert.error('Terjadi Kesalahan Saat Pembayaran')
                }
            }


        } catch (error) {
            document.querySelector('.btn-payment').disabled = false
            alert.error(error.response.data.message)
        }
    }

    return (
        <Fragment>
            <MetaData title={'Pembayaran'} />

            <div className="keranjang-isi">
                <div className="list-price">
                    <form className="price-box" onSubmit={submitHandler}>
                        <h5>Pembayaran</h5>
                        <div className="ringkasan-checkout">
                            <div className="form-group">
                                <label htmlFor="card_num_field">Card Number</label>
                                {/* 4000 0027 6000 3184 */}
                                <CardNumberElement
                                    type="text"
                                    className="form-control"
                                    options={options}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="card_exp_field">Card Expiry</label>
                                <CardExpiryElement
                                    type="text"
                                    className="form-control"
                                    options={options}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="card_cvc_field">Card Cvc</label>
                                <CardCvcElement
                                    type="text"
                                    className="form-control"
                                    options={options}
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="btn-payment"

                        >
                            Bayar {` - RP. ${orderInfo && orderInfo.totalPrice}`}
                        </button>
                    </form>
                </div>
            </div>

        </Fragment>
    )
}

export default Payment

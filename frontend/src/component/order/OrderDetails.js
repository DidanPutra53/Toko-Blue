import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Loader from '../layout/Loader'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../layout/MetaData';
import { getOrderDetails, clearErrors } from '../../actions/orderAction';

const OrderDetails = ({ match }) => {

    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading, error, order = {} } = useSelector(state => state.orderDetails)
    const { shippingInfo, orderItems, paymentInfo, user, totalPrice, orderStatus } = order

    useEffect(() => {
        dispatch(getOrderDetails(match.params.id))

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
    }, [dispatch, alert, error, match.params.id])

    const shippingDetails = shippingInfo && `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postialCode}`

    const isPaid = paymentInfo && paymentInfo.status === 'succeeded' ? true : false

    return (
        <Fragment>
            <MetaData title={'Order Details'} />
            {
                loading ? <Loader /> : (
                    <Fragment>
                        <div className="order-details">
                            <div className="order-info">
                                <div className="invoice">
                                    <h5 className="">Invoice #{order._id}</h5>
                                    <hr />
                                    <h4 className="">Shipping Info</h4>
                                    <div>
                                        <p>{user && user.name}</p>
                                    </div>
                                    <div>
                                        <p>{shippingInfo && shippingInfo.phoneNo}</p>
                                    </div>
                                    <div>
                                        <p>{shippingDetails}</p>
                                    </div>
                                    <div>
                                        <p><b>Total:</b> Rp. {totalPrice}</p>
                                    </div>
                                    <hr />
                                    <h4 className="my-4">Payment</h4>
                                    <p className={isPaid ? "greenColor" : "redColor"} ><b>{isPaid ? "PAID" : "NOT PAID"}</b></p>
                                    <h4 className="my-4">Order Status:</h4>
                                    <p className={order.orderStatus && String(order.orderStatus).includes('Delivered') ? "greencolor" : "redcolor"} ><b>{orderStatus}</b></p>
                                </div>
                            </div>
                            <div className="order-product">
                                {
                                    orderItems && orderItems.map(item => (
                                        <Fragment>
                                            <div className="card-product" key={item.product}>
                                                <div>
                                                    <img src={item.image} alt={item.name} />
                                                </div>
                                                <div>
                                                    <Link to={`/Produk/${item.product}`}>{item.name}</Link>
                                                </div>
                                                <div>
                                                    <p>Rp.{item.price}</p>
                                                </div>
                                                <div>
                                                    <p> {item.quantity} Barang</p>
                                                </div>
                                            </div>
                                        </Fragment>
                                    ))
                                }
                            </div>

                        </div>
                    </Fragment>
                )
            }
        </Fragment>
    )
}

export default OrderDetails

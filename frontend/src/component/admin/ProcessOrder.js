import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import Loader from '../layout/Loader'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetails, updateOrder, clearErrors } from '../../actions/orderAction'
import { orderConstant } from '../../constants/orderConstant'
import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar'

const ProcessOrder = ({ match }) => {

    const [status, setStatus] = useState('')

    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading, order = {} } = useSelector(state => state.orderDetails)
    const { shippingInfo, orderItems, paymentInfo, user, totalPrice, orderStatus } = order
    const { error, isUpdated } = useSelector(state => state.order)

    const orderId = match.params.id

    useEffect(() => {

        dispatch(getOrderDetails(orderId))

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        if (isUpdated) {
            alert.success('order sudah di ubah')
            dispatch({ type: orderConstant.UPDATE_ORDER_RESET })
        }
    }, [dispatch, alert, error, isUpdated, orderId])

    const updateOrderHandler = (id) => {
        const formData = new FormData();
        formData.set('status', status);

        dispatch(updateOrder(id, formData))
    }

    const shippingDetails = shippingInfo && `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postialCode}`
    const isPaid = paymentInfo && paymentInfo.status === 'succeeded' ? true : false;

    return (
        <Fragment>
            <MetaData title={`Proses Order # ${order && order._id}`} />
            <div className="product-list-admin">
                <div className="sidebar-dashboard">
                    <Sidebar />
                </div>
                <div className="x">
                    <h1>Pesanan #{order && order._id}</h1>
                    {
                        loading ? <Loader /> :
                            <div className="order-admin">
                                <div className="pengiriman" >
                                    <h5>Pengiriman</h5>
                                    <div>
                                        <p>Dikirim ke {user && user.name}</p>
                                    </div>
                                    <div>
                                        <p>Telp: {shippingInfo && shippingInfo.phoneNo}</p>
                                    </div>
                                    <div>
                                        <p>{shippingDetails}</p>
                                    </div>
                                    <div>
                                        <p>Rp. {totalPrice}</p>
                                    </div>
                                </div>
                                <hr />
                                <h4 className="my-4">Payment</h4>
                                <p className={isPaid ? "greenColor" : "redColor"} ><b>{isPaid ? "PAID" : "NOT PAID"}</b></p>
                                <h4 className="my-4">Stripe ID</h4>
                                <p><b>{paymentInfo && paymentInfo.id}</b></p>
                                <h4 className="my-4">Order Status:</h4>
                                <p className={order.orderStatus && String(order.orderStatus).includes('Delivered') ? "greencolor" : "redcolor"} ><b>{orderStatus}</b></p>
                                <hr />
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
                                <hr />
                                <div className="status-update">
                                    <h4>Status</h4>
                                    <div className="form-group">
                                        <select
                                            className="form-control"
                                            name="status"
                                            value={status}
                                            onChange={(e) => setStatus(e.target.value)}
                                        >
                                            <option value="Processing">Processing</option>
                                            <option value="Shipped">Perjalanan</option>
                                            <option value="Delivered">Sampai Tujuan</option>
                                        </select>
                                    </div>
                                </div>
                                <hr />
                                <div className="button-update-order">
                                    <button
                                        onClick={() => updateOrderHandler(order._id)}
                                    // disabled={loading ? true : false}
                                    >
                                        Ubah Pesanan
                                    </button>
                                </div>
                            </div>
                    }
                </div>
            </div>
        </Fragment>
    )
}

export default ProcessOrder

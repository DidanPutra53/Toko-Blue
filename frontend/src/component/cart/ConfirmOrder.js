import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import { useSelector } from 'react-redux';
import MetaData from '../layout/MetaData';


const ConfirmOrder = ({ history }) => {

    const { cartItems, shippingInfo } = useSelector(state => state.cart)
    const { user } = useSelector(state => state.auth)

    //calculate order price
    const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    const shippingPrice = itemsPrice > 50000 ? 5000 : 0
    const totalPrice = (itemsPrice + shippingPrice)

    const processToPayment = () => {
        const data = {
            itemsPrice,
            shippingPrice,
            totalPrice
        }
        sessionStorage.setItem('orderInfo', JSON.stringify(data))
        history.push('/Pembayaran')
    }

    return (
        <Fragment>

            <MetaData title={'Checkout'} />
            <div className="keranjang-isi">
                <div className="kiri-cart">
                    <div className="list-keranjang">
                        <h3>Checkout</h3>
                        <div>
                            <div className="pengiriman" >
                                <div>
                                    <p>{user && user.name}</p>
                                </div>
                                <div>
                                    <p>{shippingInfo && shippingInfo.phoneNo}</p>
                                </div>
                                <div>
                                    <p>{shippingInfo && shippingInfo.address}</p>
                                </div>
                                <div>
                                    <p>{`${shippingInfo.city}, ${shippingInfo.postialCode}`}</p>
                                </div>
                            </div>
                            {
                                cartItems.map(item => (
                                    <Fragment>
                                        <div className="card-keranjang" key={item.product}>
                                            <div>
                                                <img src={item.image} alt="" />
                                            </div>
                                            <div>
                                                <a>{item.name}</a>
                                            </div>
                                            <div>
                                                <p>{item.quantity} x Rp.{item.price} = <b>Rp.{item.quantity * item.price}</b></p>
                                            </div>
                                        </div>
                                    </Fragment>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className="list-price">
                    <div className="price-box">
                        <h5>Ringkasan Belanja</h5>
                        <div className="ringkasan-belanja">
                            <div className="total-barang">
                                <a>Total Harga (<span>{cartItems.reduce((acc, item) => (acc + Number(item.quantity)), 0)}</span> barang) : </a>
                                <a>Rp. <span>{itemsPrice}</span></a>
                            </div>
                            <div className="total-belanja">
                                <a>Biaya Ongkir : </a>
                                <a>Rp. <span>{shippingPrice}</span></a>
                            </div>
                            <div className="total-belanja">
                                <a>Total Tagihan : </a>
                                <a>Rp. <span>{totalPrice}</span></a>
                            </div>
                        </div>
                        <button onClick={processToPayment}>Beli</button>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default ConfirmOrder

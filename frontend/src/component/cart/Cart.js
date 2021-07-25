import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../layout/MetaData';
import { addItemToCart, removeItemFromCart } from '../../actions/cartAction';
import { FiTrash } from "react-icons/fi";




const Cart = ({ history }) => {
    const dispatch = useDispatch()
    const { cartItems } = useSelector(state => state.cart)

    const increaseQty = (id, quantity, stock) => {
        const newQty = quantity + 1
        if (newQty > stock) return
        dispatch(addItemToCart(id, newQty))
    }

    const decreaseQty = (id, quantity) => {
        const newQty = quantity - 1
        if (newQty <= 0) return
        dispatch(addItemToCart(id, newQty))
    }

    const removeCartItemHandler = (id) => {
        dispatch(removeItemFromCart(id))
    }

    const checkoutHandler = () => {
        history.push(`/Pengiriman`)
    }

    return (
        <Fragment>
            <MetaData title="Keranjang" />
            {cartItems.length === 0 ?

                <Fragment>
                    <div className="keranjang-kosong">
                        <h3>Keranjang kosong</h3>

                        <Link to="/Produk">
                            Isi keranjang dengan produk
                        </Link>
                    </div>
                </Fragment>

                : (
                    <Fragment>
                        <div className="keranjang-isi">
                            <div className="kiri-cart">
                                <div className="list-keranjang">
                                    <h3>Keranjang</h3>
                                    <div>
                                        {cartItems.map(item => (
                                            <Fragment>
                                                <div className="card-keranjang" key={item.product}>
                                                    <div>
                                                        <img src={item.image} alt="" />
                                                    </div>
                                                    <div>
                                                        <Link to={`/Produk/${item.product}`}>
                                                            {item.name}
                                                        </Link>
                                                    </div>
                                                    <div>
                                                        <a>Rp. {item.price}</a>
                                                    </div>
                                                    <div className="stockCounter d-flex">
                                                        <span className='btn btn-light border-dark minus' onClick={() => decreaseQty(item.product, item.quantity)}>
                                                            -
                                                        </span>

                                                        <input
                                                            type='number'
                                                            className='form-control count d-inline'
                                                            value={item.quantity}
                                                            readOnly
                                                        />

                                                        <span className='btn btn-primary plus' onClick={() => increaseQty(item.product, item.quantity, item.stock)}>
                                                            +
                                                        </span>
                                                    </div>
                                                    <button className="delete-button" onClick={() => removeCartItemHandler(item.product)}>
                                                        <FiTrash />
                                                    </button>
                                                </div>
                                            </Fragment>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="list-price">
                                <div className="price-box">
                                    <h5>Ringkasan Belanja</h5>
                                    <div className="ringkasan-belanja">
                                        <div className="total-barang">
                                            <a>Total Harga (<span>{cartItems.reduce((acc, item) => (acc + Number(item.quantity)), 0)}</span> barang) : </a>
                                            <a>Rp. <span>{cartItems.reduce((acc, item) => acc + (item.quantity * item.price), 0)}</span></a>
                                        </div>
                                        <div className="total-belanja">
                                            <a>Total Harga : </a>
                                            <a>Rp. <span>{cartItems.reduce((acc, item) => acc + (item.quantity * item.price), 0)}</span></a>
                                        </div>
                                    </div>
                                    <button onClick={checkoutHandler} >Beli</button>
                                </div>
                            </div>
                        </div>
                    </Fragment>
                )
            }
        </Fragment >
    )
}

export default Cart

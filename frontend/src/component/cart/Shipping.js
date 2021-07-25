import React, { Fragment, useState } from 'react'


import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../layout/MetaData';
import { saveShippingInfo } from '../../actions/cartAction';
import { Logodua } from '../images/Images';

const Shipping = ({ history }) => {

    const { shippingInfo } = useSelector(state => state.cart)

    const [address, setAddress] = useState(shippingInfo.address)
    const [city, setCity] = useState(shippingInfo.city)
    const [postialCode, setPostialCode] = useState(shippingInfo.postialCode)
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo)

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()

        dispatch(saveShippingInfo({ address, city, postialCode, phoneNo }))
        history.push('/order/confirm')
    }

    return (
        <Fragment>
            <MetaData title="Pengiriman" />
            <div className="shippingInfo">
                <div className="shippingcard">
                    <h3>Alamat Pengiriman</h3>
                    <form className="box-shipping" onSubmit={submitHandler}>
                        <div className="form-shipping">
                            <label htmlFor="address_field">Alamat Lengkap</label>
                            <input
                                label="Alamat"
                                placeholder="Alamat Lengkap"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </div>
                        <hr />
                        <div className="form-shipping">
                            <label htmlFor="city_field">Kota</label>
                            <input
                                label="Kota"
                                placeholder="Kota"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                            />
                        </div>
                        <hr />
                        <div className="form-shipping">
                            <label htmlFor="postial_code_field">Kode Pos</label>
                            <input
                                label="Kode Pos"
                                placeholder="Kode Pos"
                                value={postialCode}
                                onChange={(e) => setPostialCode(e.target.value)}
                                required
                            />
                        </div>
                        <hr />
                        <div className="form-shipping">
                            <label htmlFor="phoneNo_field">Nomor HP</label>
                            <input
                                label="Nomor HP"
                                placeholder="Nomor HP"
                                value={phoneNo}
                                onChange={(e) => setPhoneNo(e.target.value)}
                                required
                            />
                        </div>
                        <hr />
                        <div className="button-shipping">
                            <button >
                                Simpan Alamat
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default Shipping

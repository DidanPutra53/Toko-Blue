import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import MetaData from '../layout/MetaData';
import { HiBadgeCheck } from 'react-icons/hi'

const OrderSuccess = () => {
    return (
        <Fragment>
            <MetaData title={'Pesanan Sukses'} />
            <div className="Order-Success">
                <HiBadgeCheck />
                <h3>Pesanan Sudah Dibayar</h3>
                <Link to="/Profile/Pesanan">Pesanan Anda</Link>
            </div>
        </Fragment>
    )
}

export default OrderSuccess

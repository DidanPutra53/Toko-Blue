import React, { Fragment, useEffect } from 'react'
import Sidebar from './Sidebar'
import { Link } from 'react-router-dom'
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import { FiGrid, FiUser, FiBox, FiShoppingBag } from "react-icons/fi";
import { getAdminsProducts } from '../../actions/product.actions'
import { useDispatch, useSelector } from 'react-redux';
import { allOrders } from '../../actions/orderAction'

const Dashboard = () => {

    const dispatch = useDispatch()

    const { products } = useSelector(state => state.products)
    const { orders, totalAmount, loading } = useSelector(state => state.allOrder)

    let outOfStock = 0;
    products.forEach(product => {
        if (product.stock === 0) {
            outOfStock += 1;
        }
    })

    useEffect(() => {
        dispatch(getAdminsProducts())
        dispatch(allOrders())
    }, [dispatch])

    return (
        <Fragment>
            <div className="dashboard">
                <div className="sidebar-dashboard">
                    <Sidebar />
                </div>
                {
                    loading ? <Loader /> : (
                        <Fragment>
                            <MetaData title={'Admin Dashboard'} />
                            <div className="content-dashboard">
                                <h1>Dashboard</h1>
                                <div className="box-info-dashboard">
                                    <Link to="/admin/produk" className="box">
                                        <FiBox />
                                        <p>Produk</p>
                                        <b>{products && products.length} (Barang)</b>
                                    </Link>
                                    <Link to="/admin/pesanan" className="box">
                                        <FiShoppingBag />
                                        <p>Pesanan</p>
                                        <b>{orders && orders.length} (Pesanan)</b>
                                    </Link>
                                    <Link to="/admin/user" className="box">
                                        <FiUser />
                                        <p>User</p>
                                        <b>x (User)</b>
                                    </Link>
                                    <div className="box">
                                        <FiBox />
                                        <p>Barang Kosong</p>
                                        <b>{outOfStock} (Barang)</b>
                                    </div>
                                </div>
                                <div className="info-dashboard">
                                    <p>Pendapatan</p>
                                </div>
                            </div>
                        </Fragment>
                    )
                }
            </div>
        </Fragment>
    )
}

export default Dashboard

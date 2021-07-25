import React, { useState, Fragment } from 'react'
import { Link, Route } from 'react-router-dom'
import Search from './Search';
import { Logodua } from '../images/Images';
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { FiPower, FiShoppingCart, FiShoppingBag, FiServer, FiUser } from "react-icons/fi";
import { logoutUser } from '../../actions/userAction';

export const Header = () => {
    const alert = useAlert()
    const dispatch = useDispatch()

    const [sidebar, setSidebar] = useState(false)

    const showSidebar = () => setSidebar(!sidebar)


    const { user, loading } = useSelector(state => state.auth)
    const logoutHandler = () => {
        dispatch(logoutUser())
        alert.success('Akun Telah Keluar')
    }

    return (
        <Fragment>
            <div className="Header-Sidebar">
                <div className="Header">
                    <div className="bungkus">
                        <div className="logo-header">
                            <Link to="/">
                                <img src={Logodua} alt="logo" />
                            </Link>
                        </div>
                        <div className="middle-header">
                            <Route render={({ history }) => <Search history={history} />} />
                        </div>
                        <div className="Left-header">
                            <div className="product-header">
                                <Link to="/Produk" className="link-header">
                                    Produk
                                </Link>
                            </div>
                            <div className="infotoko-header">
                                <div to="#" className="link-header">
                                    Info Toko
                                </div>
                            </div>
                            <div className="masuk">
                                {
                                    user ? (
                                        // sidebar non active
                                        <div className="profile-header">
                                            <button className="button-profile" onClick={showSidebar}>
                                                <figure className="profilepicture-header">
                                                    <img
                                                        src={user.avatar && user.avatar.url}
                                                        alt={user && user.name}
                                                        className="rounded-circle"
                                                    />
                                                </figure>
                                            </button>
                                            <div className={sidebar ? 'sidebar-menu active' : 'sidebar-menu'}>
                                                {user && user.role !== 'admin' ? (
                                                    <Link to="/Keranjang" className="Link" onClick={showSidebar}>
                                                        <FiShoppingCart />
                                                        <span>
                                                            Keranjang
                                                        </span>
                                                    </Link>
                                                ) : (
                                                    <Link className="Link" to="/Dashboard" onClick={showSidebar}>
                                                        <FiServer />
                                                        <span>Dashboard</span>
                                                    </Link>
                                                )}
                                                <Link className="Link" to="/Profile/Pesanan" onClick={showSidebar}>
                                                    <FiShoppingBag />
                                                    <span>
                                                        Pesanan
                                                    </span>
                                                </Link>
                                                <Link className="Link" to="/Profile" onClick={showSidebar}>
                                                    <FiUser />
                                                    <span>
                                                        Profile
                                                    </span>
                                                </Link>
                                                <Link className="Link" to="/" onClick={logoutHandler}>
                                                    <FiPower />
                                                    <span>Logout</span>
                                                </Link>
                                            </div>
                                        </div>
                                    ) : !loading &&
                                    <Link to="/Masuk" className="link-header">
                                        Masuk
                                    </Link>
                                }
                            </div>
                        </div>
                    </div>
                </div >
            </div>
        </Fragment>
    )
}

export default Header
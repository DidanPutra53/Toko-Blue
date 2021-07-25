import React from 'react'
import { Link } from 'react-router-dom'
import { FiShoppingBag, FiPower, FiBox, FiUser } from "react-icons/fi";

const Sidebar = () => {
    return (
        <div className="sidebar-wrapper">
            <div className="list-sidebar">
                <ul>
                    <li>
                        <Link to="/Dashboard" className="nav-text">
                            <FiPower
                                className="icon-list"
                            />
                            <span>
                                Dashboard
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/produk" className="nav-text">
                            <FiBox
                                className="icon-list"
                            />
                            <span>
                                Semua Produk
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/produk/tambah" className="nav-text">
                            <FiBox
                                className="icon-list"
                            />
                            <span>
                                Tambah Produk
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/pesanan" className="nav-text">
                            <FiShoppingBag
                                className="icon-list"
                            />
                            <span>
                                Pesanan
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/user" className="nav-text">
                            <FiUser
                                className="icon-list"
                            />
                            <span>
                                User
                            </span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar

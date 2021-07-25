import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader'

const Profile = () => {

    const { user, loading } = useSelector(state => state.auth)

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'Profile'} />
                    <div className="Profile">
                        <div className="upper-profile">
                            <img src={user.avatar.url} alt={user.name} />
                        </div>
                        <div className="content-profile">
                            <div className="list-profile">
                                <ul>
                                    <li>
                                        <h1>{user.name}</h1>
                                    </li>
                                    <li>
                                        <a>{user.email}</a>
                                    </li>
                                    <hr />
                                    <li className="gabung">
                                        <p>Gabung :</p>
                                        <a>{String(user.createdAt).substring(0, 10)}</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="sidebar-profile">
                            <img src={user.avatar.url} alt={user.name} />
                            <div className="control-profile">
                                <Link to="/Profile/Ubah-Profile" className="ganti-profile">
                                    Ubah Profile
                                </Link>

                                {user.role !== 'admin' && (
                                    <Link to="/Profile/Pesanan" className="pesanan-password">
                                        Pesanan
                                    </Link>
                                )}

                                <Link to="/Password/Ubah-Password" className="pesanan-password">
                                    Ubah Password
                                </Link>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default Profile

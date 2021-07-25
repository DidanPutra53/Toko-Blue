import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'

import { updatePassword, clearError } from '../../actions/userAction'
import MetaData from '../layout/MetaData'

import { userConstants } from '../../constants/userConstant'

const UpdatePassword = ({ history }) => {

    const [oldpassword, setOldPassword] = useState('')
    const [password, setPassword] = useState('')

    const alert = useAlert()
    const dispatch = useDispatch()

    const { user } = useSelector(state => state.auth)
    const { error, isUpdated, loading } = useSelector(state => state.user)

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearError())
        }
        if (isUpdated) {
            alert.success('Update Password Berhasil')
            history.push('/Profile')
            dispatch({
                type: userConstants.UPDATE_PASSWORD_RESET
            })
        }
    }, [dispatch, alert, error, history, isUpdated])

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('oldpassword', oldpassword);
        formData.set('password', password);
        dispatch(updatePassword(formData))
    }

    return (
        <Fragment>
            <MetaData title={'Ubah Password'} />
            <form className="Profile" onSubmit={submitHandler}>
                <div className="upper-profile">
                    <img src={user.avatar.url} alt={user.name} />
                </div>
                <div className="content-profile">
                    <div className="list-profile">
                        <ul>
                            <li className="name-email-update">
                                <label htmlFor="name">Password Lama :</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={oldpassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                />
                            </li>
                            <hr />
                            <li className="name-email-update">
                                <label htmlFor="Email">Password Baru :</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="sidebar-profile">
                    <img src={user.avatar.url} alt={user.name} />
                    <div className="control-profile">
                        <button
                            className="simpan-profile"
                            type='submit'
                            disabled={loading ? true : false}
                        >
                            Simpan Password
                        </button>
                        <Link to="/Profile" className="batal-profile">Batal</Link>
                    </div>
                </div>
            </form>
        </Fragment>
    )
}

export default UpdatePassword

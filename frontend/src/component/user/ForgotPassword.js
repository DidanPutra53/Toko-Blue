import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'

import { forgotPassword, clearError } from '../../actions/userAction'
import MetaData from '../layout/MetaData'
import { Loginbg, Logobg } from '../images/Images'

const ForgotPassword = () => {

    const [email, setEmail] = useState('')

    const alert = useAlert()
    const dispatch = useDispatch()

    const { error, loading, message } = useSelector(state => state.forgotPassword)

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearError())
        }
        if (message) {
            alert.success(message)
        }
    }, [dispatch, alert, error, message])

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('email', email);
        dispatch(forgotPassword(formData))
    }


    return (
        <Fragment>
            <MetaData title={'Lupa Password'} />
            <div className="Login-Content">
                <img src={Loginbg} className="loginbg" alt="masuk" />
                <div className="lobang">
                    <div className="kiri">
                        <form className="login-page" onSubmit={submitHandler}>
                            <img src={Logobg} alt="logo" />
                            <div className="input">
                                <div className="E-mail">
                                    <label htmlFor="email_field">
                                        Masukan Email
                                    </label>
                                    <input
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        label="E-mail"
                                        placeholder="E-mail"
                                    />
                                </div>
                            </div>
                            <hr />
                            <div className="button-klik" type="submit" disabled={loading ? true : false}>
                                <button>
                                    Kirim Email
                                </button>
                            </div>
                            <hr />
                            <div className="keterangan">
                                <Link to="/Masuk">
                                    Kembali
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default ForgotPassword

import React, { Fragment, useState, useEffect } from 'react'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'

import { resetPassword, clearError } from '../../actions/userAction'
import MetaData from '../layout/MetaData'

import { Loginbg, Logobg } from '../images/Images'

const NewPassword = ({ history, match }) => {

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const alert = useAlert()
    const dispatch = useDispatch()

    const { error, success } = useSelector(state => state.forgotPassword)

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearError())
        }
        if (success) {
            alert.success('Password telah diubah')
            history.push('/Masuk')
        }
    }, [dispatch, alert, error, success, history])

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('password', password);
        formData.set('confrimPassword', confirmPassword);
        dispatch(resetPassword(match.params.token, formData))
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
                                    <label htmlFor="password_field">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        label="password"
                                        placeholder="password baru"
                                    />
                                </div>
                                <hr />
                                <div className="E-mail">
                                    <label htmlFor="password_field">
                                        Confirm Password
                                    </label>
                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        label="E-mail"
                                        placeholder="password baru"
                                    />
                                </div>
                            </div>
                            <hr />
                            <div className="button-klik" type="submit" >
                                <button>
                                    Password Baru
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default NewPassword

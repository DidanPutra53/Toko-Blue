import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'

import { login, clearError } from '../../actions/userAction'
import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'
import { Loginbg, Logobg } from '../images/Images'

const Login = ({ history, location }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const alert = useAlert()
    const dispatch = useDispatch()

    const { isAuthenticated, error, loading } = useSelector(state => state.auth)

    const redirect = location.search ? location.search.split(`=`)[1] : '/'

    useEffect(() => {
        if (isAuthenticated) {
            history.push(redirect)
        }
        if (error) {
            alert.error(error);
            dispatch(clearError())
        }
    }, [dispatch, alert, isAuthenticated, error, history])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'Masuk'} />
                    <div className="Login-Content">
                        <img src={Loginbg} className="loginbg" alt="masuk" />
                        <div className="lobang">
                            <div className="kiri">
                                <form className="login-page" onSubmit={submitHandler}>
                                    <img src={Logobg} alt="logo" />
                                    <div className="input">
                                        <div className="E-mail">
                                            <label htmlFor="email_field">
                                                E-mail
                                            </label>
                                            <input
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                label="E-mail"
                                                placeholder="E-mail"
                                            />
                                        </div>
                                        <hr />
                                        <div className="password">
                                            <label htmlFor="password_field">
                                                Password
                                            </label>
                                            <input
                                                value={password}
                                                type="password"
                                                onChange={(e) => setPassword(e.target.value)}
                                                label="Password"
                                                placeholder="Password"
                                            />
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="button-klik">
                                        <button>
                                            Masuk
                                        </button>
                                    </div>
                                    <hr />
                                    <div className="keterangan">
                                        <Link
                                            to="/Password/Lupa-Password">
                                            Lupa Password?
                                        </Link>
                                        <Link
                                            to="/Daftar">
                                            Daftar
                                        </Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )
            }
        </Fragment >
    )
}

export default Login

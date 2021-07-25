import React, { Fragment, useState, useEffect } from 'react'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'

import { register, clearError } from '../../actions/userAction'
import MetaData from '../layout/MetaData'
import { Loginbg, Logobg } from '../images/Images'

import { Link } from 'react-router-dom'

const Register = ({ history }) => {
    const [user, setUser] = useState({
        email: '',
        name: '',
        password: '',
    })

    const { email, name, password } = user

    const [avatar, setAvatar] = useState('')
    const [avatarPreview, setAvatarPreview] = useState('/images/download.jpg')

    const alert = useAlert()
    const dispatch = useDispatch()

    const { isAuthenticated, error, loading } = useSelector(state => state.auth)

    useEffect(() => {
        if (isAuthenticated) {
            history.push('/')
        }
        if (error) {
            alert.error(error);
            dispatch(clearError())
        }
    }, [dispatch, alert, isAuthenticated, error, history])

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('name', name);
        formData.set('email', email);
        formData.set('password', password);
        formData.set('avatar', avatar);
        dispatch(register(formData))
    }

    const onChange = e => {
        if (e.target.name === 'avatar') {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result)
                    setAvatar(reader.result)
                }
            }
            reader.readAsDataURL(e.target.files[0])
        } else {
            setUser({ ...user, [e.target.name]: e.target.value })
        }
    }

    return (
        <Fragment>
            <MetaData title={"Register"} />
            <div className="Login-Content">
                <img src={Loginbg} className="loginbg" alt="masuk" />
                <div className="lobang-register">
                    <div className="kiri">
                        <form className="login-page" onSubmit={submitHandler} encType="multipart/form-data">
                            <img src={Logobg} alt="logo" />
                            <div className="input-register">
                                <div className="input-from">
                                    <div className="form-group">
                                        <label htmlFor="email_field">Nama Pengguna</label>
                                        <input
                                            type="name"
                                            id="name_field"
                                            name='name'
                                            value={name}
                                            onChange={onChange}
                                        />
                                    </div>
                                    <hr />
                                    <div className="form-group">
                                        <label htmlFor="email_field">Email</label>
                                        <input
                                            type="email"
                                            id="email_field"
                                            className="form-control"
                                            name='email'
                                            value={email}
                                            onChange={onChange}
                                        />
                                    </div>
                                    <hr />
                                    <div className="form-group">
                                        <label htmlFor="password_field">Password</label>
                                        <input
                                            type="password"
                                            id="password_field"
                                            className="form-control"
                                            name='password'
                                            value={password}
                                            onChange={onChange}
                                        />
                                    </div>
                                    <hr />
                                    <div className="button-klik">
                                        <button
                                            type="submit"
                                            disabled={loading ? true : false}
                                        >
                                            Daftar
                                        </button>
                                    </div>
                                    <hr />
                                    <div className="button-back">
                                        <Link to="/Masuk">
                                            Batal Daftar
                                        </Link>
                                    </div>
                                </div>
                                <div className="input-profiepicture">
                                    <label htmlFor="password_field">
                                        Profile Picture
                                    </label>
                                    <div className='input-avatar'>
                                        <div>
                                            <figure className='avatar'>
                                                <img
                                                    src={avatarPreview}
                                                    className='rounded-circle'
                                                    alt='Avatar Preview'
                                                />
                                            </figure>
                                        </div>
                                        <div className='custom-file'>
                                            <input
                                                type='file'
                                                name='avatar'
                                                className='custom-file-input'
                                                id='customFile'
                                                accept="iamges/*"
                                                onChange={onChange}
                                            />
                                            <label className='custom-file-label' htmlFor='customFile'>
                                                Choose Avatar
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Register

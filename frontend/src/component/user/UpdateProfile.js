import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'

import { updateProfile, loadUser, clearError } from '../../actions/userAction'
import MetaData from '../layout/MetaData'

import { userConstants } from '../../constants/userConstant'

const UpdateProfile = ({ history }) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [avatar, setAvatar] = useState('')
    const [avatarPreview, setAvatarPreview] = useState('/images/download.jpg')

    const alert = useAlert()
    const dispatch = useDispatch()

    const { user } = useSelector(state => state.auth)
    const { error, isUpdated, loading } = useSelector(state => state.user)

    useEffect(() => {
        if (user) {
            setName(user.name)
            setEmail(user.email)
            setAvatarPreview(user.avatar.url)
        }
        if (error) {
            alert.error(error);
            dispatch(clearError())
        }
        if (isUpdated) {
            alert.success('Update User Berhasil')
            dispatch(loadUser())
            history.push('/Profile')
            dispatch({
                type: userConstants.UPDATE_PROFILE_RESET
            })
        }
    }, [dispatch, alert, error, history, isUpdated, user])

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('name', name);
        formData.set('email', email);
        formData.set('avatar', avatar);
        dispatch(updateProfile(formData))
    }

    const onChange = e => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result)
                setAvatar(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }


    return (
        <Fragment>
            <MetaData title={'Update Profile'} />
            <form className="Profile" onSubmit={submitHandler} encType='multipart/form-data'>
                <div className="upper-profile">
                    <img
                        src={avatarPreview}
                        alt='Avatar Preview'
                    />
                </div>
                <div className="content-profile">
                    <div className="list-profile">
                        <ul>
                            <li className="name-email-update">
                                <label htmlFor="name">Nama Pengguna :</label>
                                <input
                                    type="name"
                                    className="form-control"
                                    name='name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </li>
                            <hr />
                            <li className="name-email-update">
                                <label htmlFor="Email">Email :</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name='email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="sidebar-profile">
                    <img
                        src={avatarPreview}
                        alt='Avatar Preview'
                    />
                    <div className="control-profile">
                        <div className='custom-file'>
                            <input
                                type='file'
                                name='avatar'
                                className='custom-file-input'
                                accept="iamges/*"
                                onChange={onChange}
                            />
                            <label className='custom-file-label' htmlFor='customFile' disabled={loading ? true : false}>
                                Choose Avatar
                            </label>
                        </div>
                        <button
                            className="simpan-profile"
                            type='submit'
                            disabled={loading ? true : false}
                        >
                            Simpan Profile
                        </button>
                        <Link to="/Profile" className="batal-profile">Batal</Link>
                    </div>
                </div>
            </form>
        </Fragment>
    )
}

export default UpdateProfile

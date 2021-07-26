import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { allUsers, clearError, deleteUser } from '../../actions/userAction'
import { userConstants } from '../../constants/userConstant'

import { FiTrash, FiEdit } from "react-icons/fi";

const UsersList = ({ history }) => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, users } = useSelector(state => state.allUsers);
    const { isDeleted } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(allUsers());

        if (error) {
            alert.error(error);
            dispatch(clearError())
        }

        if (isDeleted) {
            alert.success('User deleted successfully');
            history.push('/admin/user');
            dispatch({ type: userConstants.DELETE_USER_RESET })
        }

    }, [dispatch, alert, error, history, isDeleted])

    const deleteUserHandler = (id) => {
        dispatch(deleteUser(id))
    }

    const setUsers = () => {
        const data = {
            columns: [
                {
                    label: 'User ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Email',
                    field: 'email',
                    sort: 'asc'
                },
                {
                    label: 'Role',
                    field: 'role',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        users.forEach(user => {
            data.rows.push({
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                actions:
                    <div className="delete-edit-btn" style={{ display: "flex", justifyContent: "space-between" }}>
                        <Link to={`/admin/user/${user._id}`}>
                            <FiEdit />
                        </Link>
                        <button style={{ border: "none", backgroundColor: "transparent" }} className="trash-user" onClick={() => deleteUserHandler(user._id)}>
                            <FiTrash />
                        </button>
                    </div>
            })
        })
        return data;
    }

    return (
        <Fragment>
            <MetaData title={'All Users'} />
            <div className="product-list-admin">
                <div className="sidebar-dashboard">
                    <Sidebar />
                </div>
                <div className="alluser">
                    <Fragment>
                        <h1 className="my-5">All Users</h1>
                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setUsers()}
                                className="px-3"
                                bordered
                                striped
                                hover
                            />
                        )}
                    </Fragment>
                </div>
            </div>
        </Fragment>
    )
}

export default UsersList

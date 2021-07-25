import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'
import Loader from '../layout/Loader'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux';
import { allOrders, clearErrors, deleteOrder } from '../../actions/orderAction'
import { orderConstant } from '../../constants//orderConstant'
import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar'
import { FaRegEye } from 'react-icons/fa'
import { FiTrash } from 'react-icons/fi'

const OrdersList = ({ history }) => {

    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading, error, orders } = useSelector(state => state.allOrder)
    const { isDeleted } = useSelector(state => state.order)

    useEffect(() => {
        dispatch(allOrders())

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        if (isDeleted) {
            alert.success('Produk Terhapus')
            history.push('/admin/pesanan')
            dispatch({
                type: orderConstant.DELETE_ORDER_RESET
            })
        }

    }, [dispatch, alert, error, isDeleted, history])

    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id))
    }

    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: 'Order ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'No of Items',
                    field: 'numofItems',
                    sort: 'asc'
                },
                {
                    label: 'Amount',
                    field: 'amount',
                    sort: 'asc'
                },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        orders.forEach(order => {
            data.rows.push({
                id: order._id,
                numofItems: order.orderItems.length,
                amount: `Rp. ${order.totalPrice}`,
                status: order.orderStatus && String(order.orderStatus).includes('Delivered')
                    ? <p style={{ color: 'green' }}>{order.orderStatus}</p>
                    : <p style={{ color: 'red' }}>{order.orderStatus}</p>,
                actions:
                    <div className="delete-edit-btn" style={{ display: "flex", justifyContent: "space-between" }}>
                        <Link to={`/admin/pesanan/ubah/${order._id}`} ><FaRegEye /></Link>
                        <button style={{ border: "none", backgroundColor: "transparent" }} className="trash-product" onClick={() => deleteOrderHandler(order._id)}><FiTrash /></button>
                    </div>
            })
        })
        return data
    }

    return (
        <Fragment>
            <MetaData title={'List Pesanan User'} />
            <div className="product-list-admin">
                <div className="sidebar-dashboard">
                    <Sidebar />
                </div>
                <div className="content-product-list-admin">
                    <h1>List Pesanan User</h1>
                    {
                        loading ? <Loader /> :
                            <div className="list-product-admin">
                                <MDBDataTable
                                    data={setOrders()}
                                    className="px-3"
                                    bordered
                                    striped
                                    hover
                                />
                            </div>
                    }
                </div>
            </div>
        </Fragment>
    )
}

export default OrdersList

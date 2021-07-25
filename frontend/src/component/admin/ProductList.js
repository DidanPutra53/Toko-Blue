import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'
import Loader from '../layout/Loader'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux';
import { getAdminsProducts, clearError, deleteProduct } from '../../actions/product.actions'
import { productConstansts } from '../../constants/product.Constant'
import { FiTrash, FiEdit } from "react-icons/fi";
import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar'


const ProductList = ({ history }) => {

    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading, error, products } = useSelector(state => state.products)
    const { error: deleteError, isDeleted } = useSelector(state => state.product)

    useEffect(() => {
        dispatch(getAdminsProducts())

        if (error) {
            alert.error(error)
            dispatch(clearError())
        }

        if (deleteError) {
            alert.error(deleteError)
            dispatch(clearError())
        }

        if (isDeleted) {
            alert.success('Produk Terhapus')
            history.push('/admin/produk')
            dispatch({
                type: productConstansts.DELETE_PRODUCT_RESET
            })
        }

    }, [dispatch, alert, error, deleteError, isDeleted, history])

    const setProducts = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Nama',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Price',
                    field: 'price',
                    sort: 'asc'
                },
                {
                    label: 'Stock',
                    field: 'stock',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        products.forEach(product => {
            data.rows.push({
                id: product._id,
                name: product.name,
                price: `Rp. ${product.price}`,
                stock: product.stock,
                actions:
                    <div className="delete-edit-btn" style={{ display: "flex", justifyContent: "space-between" }}>
                        <Link to={`/admin/produk/ubah/${product._id}`} ><FiEdit /></Link>
                        <button style={{ border: "none", backgroundColor: "transparent" }} className="trash-product" onClick={() => deleteProductHandler(product._id)}><FiTrash /></button>
                    </div>
            })
        })
        return data
    }

    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id))
    }

    return (
        <Fragment>
            <MetaData title={'Semua Produk'} />
            <div className="product-list-admin">
                <div className="sidebar-dashboard">
                    <Sidebar />
                </div>
                <div className="content-product-list-admin">
                    <h1>List Produk</h1>
                    {
                        loading ? <Loader /> :
                            <div className="list-product-admin">
                                <MDBDataTable
                                    data={setProducts()}
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

export default ProductList

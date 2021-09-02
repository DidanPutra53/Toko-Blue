import React, { Fragment, useState, useEffect } from 'react'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux';
import { newProduct, clearError } from '../../actions/product.actions'
import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar'
import { productConstansts } from '../../constants/product.Constant';

const NewProduct = ({ history }) => {

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [desc, setDesc] = useState('')
    const [category, setCategory] = useState('')
    const [stock, setStock] = useState(0)
    const [productimg, setProductImg] = useState([])
    const [productimgPreview, setproductimgPreview] = useState([])

    const categories = [
        'Minuman',
        'Makanan',
        'Perlengkapan Rumah Tangga',
        'Kesehatan & Kecantikan',
        'Ibu & Anak',
    ]

    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading, error, success } = useSelector(state => state.newProduct)

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearError())
        }
        if (success) {
            history.push('/admin/produk')
            alert.success('produk baru')
            dispatch({ type: productConstansts.NEW_PRODUCT_RESET })
        }
    }, [dispatch, alert, error, success, history])

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('name', name);
        formData.set('price', price);
        formData.set('desc', desc);
        formData.set('category', category);
        formData.set('stock', stock);
        productimg.forEach(image => {
            formData.set('productimg', image);
        })
        dispatch(newProduct(formData))
    }

    const onChange = e => {
        const files = Array.from(e.target.files)

        setproductimgPreview([])
        setProductImg([])

        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setproductimgPreview(oldArray => [...oldArray, reader.result])
                    setProductImg(oldArray => [...oldArray, reader.result])
                }
            }
            reader.readAsDataURL(file)
        })

    }



    return (
        <Fragment>
            <MetaData title={'Tambah Produk'} />
            <div className="product-list-admin">
                <div className="sidebar-dashboard">
                    <Sidebar />
                </div>
                <div className="content-product-list-admin">
                    <h1>Tambah Produk</h1>
                    <form className="create-product" onSubmit={submitHandler} encType="multipart/form-data">
                        <div className="input-product-from">
                            <div className="form-new-product">
                                <label htmlFor="email_field">Nama Barang</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="form-new-product">
                                <label htmlFor="email_field">Harga</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                            <div className="form-new-product">
                                <label htmlFor="category_field">Category</label>
                                <select className="form-control" id="category_field" value={category} onChange={(e) => setCategory(e.target.value)}>
                                    {categories.map(category => (
                                        <option key={category} value={category} >{category}</option>
                                    ))}

                                </select>
                            </div>
                            <div className="form-new-product">
                                <label htmlFor="stock_field">Stock Barang</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={stock}
                                    onChange={(e) => setStock(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="form-product-desc">
                            <label htmlFor="stock_field">Deskripsi Barang</label>
                            <textarea
                                className="form-control"
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                            />
                        </div>
                        <div className='form-product-images'>
                            <label>Gambar Produk</label>
                            <div className='custom-file'>
                                <input
                                    type='file'
                                    name='product_images'
                                    className='custom-file-input'
                                    id='customFile'
                                    onChange={onChange}
                                    multiple
                                />
                                <label className='custom-file-label' htmlFor='customFile'>
                                    Choose Images
                                </label>
                            </div>

                            {productimgPreview.map(img => (
                                <div className="image-preview">
                                    <label>Image Preview</label>
                                    <img src={img} key={img} alt="Images Preview" className="mt-3 mr-2" width="150" height="150" />
                                </div>
                            ))}

                        </div>
                        <div className="button-new-product">
                            <button
                                type="submit"
                            // disabled={loading ? true : false}
                            >
                                Tambah Produk
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default NewProduct

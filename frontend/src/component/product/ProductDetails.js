import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux';
import { MdArrowBack } from "react-icons/md";
import { getDetailProduct, clearError } from '../../actions/product.actions';
import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData';
import { addItemToCart } from '../../actions/cartAction';


const ProductDetails = ({ match }) => {

    const [quantity, setQuantity] = useState(1)

    const dispatch = useDispatch()
    const alert = useAlert()
    const { loading, error, product } = useSelector(state => state.productDetails)


    useEffect(() => {
        dispatch(getDetailProduct(match.params.id))
        if (error) {
            alert.error(error)
            dispatch(clearError())
        }
    }, [dispatch, alert, error, match.params.id])

    const addToCart = () => {
        dispatch(addItemToCart(match.params.id, quantity))
        alert.success('Berhasil ditambahkan Ke keranjang')
    }

    const increaseQty = () => {
        const count = document.querySelector('.count')
        if (count.valueAsNumber >= product.stock) return
        const qty = count.valueAsNumber + 1
        setQuantity(qty)
    }

    const decreaseQty = () => {
        const count = document.querySelector('.count')
        if (count.valueAsNumber <= 1) return
        const qty = count.valueAsNumber - 1
        setQuantity(qty)
    }

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={product.name} />
                    <div className="ProductDetailContent">
                        <div className="imgproduct">
                            {
                                product.productimg && product.productimg.map(image => (
                                    <div className="img" key={image.public_id}>
                                        <img src={image.url} alt={product.title} />
                                    </div>
                                ))
                            }
                        </div>
                        <div className="productdetail">
                            <div className="text-product">
                                <Link to="/Produk">
                                    <MdArrowBack />
                                </Link>
                                <hr />
                                <p>Product: {product._id}</p>
                                <hr />
                                <h1>{product.name}</h1>
                                <hr />
                                <h5>Status: <span className={product.stock > 0 ? 'greenColor' : 'redColor'}>{product.stock > 0 ? 'Stock' : 'Barang kosong'}</span></h5>
                                <hr />
                                <h3>Rp.{product.price},-</h3>
                                <hr />
                                <div className="stockCounter d-flex">
                                    <span className='btn btn-light border-dark minus' onClick={decreaseQty}>
                                        -
                                    </span>

                                    <input
                                        type='number'
                                        className='form-control count d-inline'
                                        value={quantity}
                                        readOnly
                                    />

                                    <span className='btn btn-primary plus' onClick={increaseQty}>
                                        +
                                    </span>
                                </div>
                                <hr />

                                <button type="button" className="btn btn-primary d-inline" disabled={product.stock === 0} onClick={addToCart} >+ Keranjang</button>

                                <hr />
                                <h4>Deskripsi</h4>
                                <p>{product.desc}</p>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )
            }
        </Fragment>
    )
}

export default ProductDetails

import React, { Fragment, useState, useEffect } from 'react'
import MetaData from '../layout/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { getProduct } from '../../actions/product.actions'
import Product from './Product.List'
import Loader from '../layout/Loader'
import { useAlert } from 'react-alert'

const Home = ({ match }) => {

    const [category, setCategory] = useState('')


    const categories = [
        'Makanan',
        'Minuman',
        'Perlengkapan Rumah Tangga',
        'Kesehatan & Kecantikan',
        'Ibu & Anak',
    ]

    const refreshPage = () => {
        window.location.reload()
    }

    const dispatch = useDispatch();
    const alert = useAlert()
    const { loading, products, error } = useSelector(state => state.products)
    const keyword = match.params.keyword

    useEffect(() => {
        if (error) {
            return alert.error(error)
        }
        dispatch(getProduct(keyword, category))
    }, [dispatch, alert, error, keyword, category])

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'Produk'} />
                    <div className="product-content">
                        {
                            keyword ? (
                                <Fragment>
                                    <div className="col-6 col-md-3 mt-5 mb-5">
                                        <div className="px-5">
                                            {products.map(product => (
                                                <Product key={product._id} product={product} col={4} />
                                            ))}
                                        </div>
                                    </div>
                                </Fragment>
                            ) : (
                                <Fragment>
                                    <div className="category-list">
                                        <div className="category-list-dua">
                                            <button onClick={refreshPage}>
                                                Category
                                            </button>
                                            <ul className="ul-category">
                                                {categories.map(category => (
                                                    <li
                                                        style={{
                                                            cursor: 'pointer',
                                                            listStyleType: 'none'
                                                        }}
                                                        key={category}
                                                        onClick={() => setCategory(category)}
                                                    >
                                                        {category}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="product-list">
                                        {products.map(product => (
                                            <Product key={product._id} product={product} col={4} />
                                        ))}
                                    </div>
                                </Fragment>
                            )}
                    </div>
                </Fragment >
            )}
        </Fragment>
    )
}

export default Home

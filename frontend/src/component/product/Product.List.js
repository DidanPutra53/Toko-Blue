import React from 'react'
import { Link } from 'react-router-dom'

const ProductList = ({ product }) => {
    return (
        <div className="card">
            <div className="card-content">
                <Link to={`/Produk/${product._id}`}>
                    <img
                        className="card-img"
                        src={product.productimg[0].url}
                        alt=""
                    />
                </Link>
                <div className="card-body">
                    <h5 className="card-title">
                        <Link to={`/Produk/${product._id}`}>{product.name}</Link>
                    </h5>
                    <p className="card-text">Rp.{product.price}</p>
                </div>
            </div>
        </div>
    )
}

export default ProductList

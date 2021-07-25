import React, { Fragment, useState } from 'react'
import MetaData from '../layout/MetaData'
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { cikiballs, oreo } from '../images/Images';
import { Link } from 'react-router-dom'

const Home = () => {
    const categories = [
        'Makanan',
        'Minuman',
        'Perlengkapan Rumah Tangga',
        'Kesehatan & Kecantikan',
        'Ibu & Anak',
    ]

    return (
        <Fragment>
            <MetaData title={''} />
            <div className="carousel">
                <Carousel
                    renderThumbs={() => { }}
                >
                    <div className="img-carousel">
                        <img src={cikiballs} />
                        <p>Chiki Balls</p>
                    </div>
                    <div className="img-carousel">
                        <img src={oreo} />
                        <p>Oreo Soft-Cake</p>
                    </div>
                </Carousel>
            </div>
            <div className="categories">
                <p>Kategori</p>
                <div className="categories-home">
                    {categories.map(category => (
                        <Link to="/Produk" className="categories-list"
                            key={category}
                        >
                            <span>{category}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </Fragment>
    )
}

export default Home

import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'

const Search = ({ history }) => {

    const [keyword, setKeyword] = useState('');

    const searchHandler = (e) => {
        e.preventDefault()

        if (keyword.trim()) {
            history.push(`/search/${keyword}`)
        } else {
            history.push('/Produk')
        }
    }

    return (
        <form onSubmit={searchHandler} >
            <div className="input">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Product Name ..."
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <div className="input-btn">
                    <button className="btn">
                        <FaSearch />
                    </button>
                </div>
            </div>
        </form>
    )
}

export default Search
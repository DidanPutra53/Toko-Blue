import axios from 'axios'
import { productConstansts, getSingleProduct } from '../constants/product.Constant'

//get allproducts
export const getProduct = (keyword = '', category) => async (dispatch) => {
    try {
        dispatch({
            type: productConstansts.ALL_PRODUCT_REQUEST
        })

        let link = `/api/v1/Products?keyword=${keyword}`
        if (category) {
            link = `/api/v1/Products?category=${category}`
        }
        const { data } = await axios.get(link)
        dispatch({
            type: productConstansts.ALL_PRODUCT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: productConstansts.ALL_PRODUCT_FAILURE,
            payload: error.response.data.message
        })
    }
}

//get single product
export const getDetailProduct = (id) => async (dispatch) => {
    try {
        dispatch({
            type: getSingleProduct.PRODUCT_DETAIL_REQUEST
        })
        const { data } = await axios.get(`/api/v1/Products/${id}`)
        dispatch({
            type: getSingleProduct.PRODUCT_DETAIL_SUCCESS,
            payload: data.product
        })
    } catch (error) {
        dispatch({
            type: getSingleProduct.PRODUCT_DETAIL_FAILURE,
            payload: error.response.data.message
        })
    }
}




export const getAdminsProducts = () => async (dispatch) => {
    try {
        dispatch({
            type: productConstansts.ADMIN_PRODUCT_REQUEST
        })
        const { data } = await axios.get(`/api/v1/admin/Products`)
        dispatch({
            type: productConstansts.ADMIN_PRODUCT_SUCCESS,
            payload: data.products
        })
    } catch (error) {
        dispatch({
            type: productConstansts.ADMIN_PRODUCT_FAILURE,
            payload: error.response.data.message
        })
    }
}

export const newProduct = (productData) => async (dispatch) => {
    try {
        dispatch({ type: productConstansts.NEW_PRODUCT_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/v1/admin/products/new', productData, config)

        dispatch({
            type: productConstansts.NEW_PRODUCT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: productConstansts.NEW_PRODUCT_FAILURE,
            payload: error.response.data.message
        })
    }
}

export const deleteProduct = (id) => async (dispatch) => {
    try {
        dispatch({ type: productConstansts.DELETE_PRODUCT_REQUEST })

        const { data } = await axios.delete(`/api/v1/admin/products/${id}`)

        dispatch({
            type: productConstansts.DELETE_PRODUCT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: productConstansts.DELETE_PRODUCT_FAILURE,
            payload: error.response.data.message
        })
    }
}

export const updateProduct = (id, productData) => async (dispatch) => {
    try {
        dispatch({ type: productConstansts.UPDATE_PRODUCT_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/admin/products/${id}`, productData, config)

        dispatch({
            type: productConstansts.UPDATE_PRODUCT_SUCCESS,
            payload: data.success,
        })
    } catch (error) {
        dispatch({
            type: productConstansts.UPDATE_PRODUCT_FAILURE,
            payload: error.response.data.message
        })
    }
}

//clear error
export const clearError = () => async (dispatch) => {
    dispatch({
        type: productConstansts.CLEAR_ERRORS
    })
}


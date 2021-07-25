import axios from 'axios'
import { orderConstant } from "../constants/orderConstant";

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({ type: orderConstant.CREATE_ORDER_REQUEST })
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/v1/cart/tambah', order, config)

        dispatch({
            type: orderConstant.CREATE_ORDER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: orderConstant.CREATE_ORDER_FAILURE,
            payload: error.response.data.message
        })
    }
}

export const myOrders = () => async (dispatch) => {
    try {

        dispatch({ type: orderConstant.MY_ORDERS_REQUEST });

        const { data } = await axios.get('/api/v1/orders/me')

        dispatch({
            type: orderConstant.MY_ORDERS_SUCCESS,
            payload: data.orders,
        })
    } catch (error) {
        dispatch({
            type: orderConstant.MY_ORDERS_FAILURE,
            payload: error.response.data.message
        })
    }
}

export const getOrderDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: orderConstant.ORDER_DETAILS_REQUEST });

        const { data } = await axios.get(`/api/v1/order/${id}`)

        dispatch({
            type: orderConstant.ORDER_DETAILS_SUCCESS,
            payload: data.order,
        })
    } catch (error) {
        dispatch({
            type: orderConstant.ORDER_DETAILS_FAILURE,
            payload: error.response.data.message
        })
    }
}

export const allOrders = () => async (dispatch) => {
    try {

        dispatch({ type: orderConstant.ALL_ORDERS_REQUEST });

        const { data } = await axios.get(`/api/v1/admin/orders`)

        dispatch({
            type: orderConstant.ALL_ORDERS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: orderConstant.ALL_ORDERS_FAILURE,
            payload: error.response.data.message
        })
    }
}

export const updateOrder = (id, orderData) => async (dispatch, getState) => {
    try {
        dispatch({ type: orderConstant.UPDATE_ORDER_REQUEST })
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/admin/cart/${id}`, orderData, config)

        dispatch({
            type: orderConstant.UPDATE_ORDER_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: orderConstant.UPDATE_ORDER_FAILURE,
            payload: error.response.data.message
        })
    }
}

export const deleteOrder = (id) => async (dispatch) => {
    try {

        dispatch({ type: orderConstant.DELETE_ORDER_REQUEST })

        const { data } = await axios.delete(`/api/v1/admin/cart/${id}`)

        dispatch({
            type: orderConstant.DELETE_ORDER_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: orderConstant.DELETE_ORDER_FAILURE,
            payload: error.response.data.message
        })
    }
}


export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: orderConstant.CLEAR_ERROR
    })
}
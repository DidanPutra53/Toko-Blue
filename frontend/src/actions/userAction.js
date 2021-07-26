import { authConstants, userConstants } from "../constants/userConstant";
import axios from 'axios'


//LOGIN 
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: authConstants.LOGIN_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post('/api/v1/masuk', { email, password }, config)
        dispatch({
            type: authConstants.LOGIN_SUCCESS,
            payload: data.user
        })
    } catch (error) {
        dispatch({
            type: authConstants.LOGIN_FAILURE,
            payload: error.response.data.message
        })
    }
}

//REGISTER
export const register = (userData) => async (dispatch) => {
    try {
        dispatch({ type: authConstants.USER_REGISTER_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        const { data } = await axios.post('/api/v1/daftar', userData, config)
        dispatch({
            type: authConstants.USER_REGISTER_SUCCESS,
            payload: data.user
        })
    } catch (error) {
        dispatch({
            type: authConstants.USER_REGISTER_FAILURE,
            payload: error.response.data.message
        })
    }
}

//LOAD USER
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: authConstants.USER_LOAD_REQUEST })

        const { data } = await axios.get('/api/v1/profile')
        dispatch({
            type: authConstants.USER_LOAD_SUCCESS,
            payload: data.user
        })
    } catch (error) {
        dispatch({
            type: authConstants.USER_LOAD_FAILURE,
            payload: error.response.data.message
        })
    }
}

//UPDATE PROFILE
export const updateProfile = (userData) => async (dispatch) => {
    try {
        dispatch({ type: userConstants.UPDATE_PROFILE_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        const { data } = await axios.put('/api/v1/profile/ubah-profile', userData, config)
        dispatch({
            type: userConstants.UPDATE_PROFILE_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: userConstants.UPDATE_PROFILE_FAILURE,
            payload: error.response.data.message
        })
    }
}

//LOGOUT USER
export const logoutUser = () => async (dispatch) => {
    try {
        await axios.get('api/v1/keluar')
        dispatch({
            type: authConstants.USER_LOGOUT_SUCCESS,
        })
    } catch (error) {
        dispatch({
            type: authConstants.USER_LOGOUT_FAILURE,
            payload: error.response.data.message
        })
    }
}

//UPDATE PASSWORD
export const updatePassword = (passwords) => async (dispatch) => {
    try {
        dispatch({ type: userConstants.UPDATE_PASSWORD_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.put('/api/v1/password/ubah-password', passwords, config)
        dispatch({
            type: userConstants.UPDATE_PASSWORD_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: userConstants.UPDATE_PASSWORD_FAILURE,
            payload: error.response.data.message
        })
    }
}

//FORGOT PASSWORD
export const forgotPassword = (email) => async (dispatch) => {
    try {
        dispatch({ type: userConstants.FORGOT_PASSWORD_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post('/api/v1/password/reset-password', email, config)
        dispatch({
            type: userConstants.FORGOT_PASSWORD_SUCCESS,
            payload: data.message
        })
    } catch (error) {
        dispatch({
            type: userConstants.FORGOT_PASSWORD_FAILURE,
            payload: error.response.data.message
        })
    }
}

//RESET PASSWORD
export const resetPassword = (token, passwords) => async (dispatch) => {
    try {
        dispatch({ type: userConstants.NEW_PASSWORD_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.put(`/api/v1/password/reset-password/${token}`, passwords, config)
        dispatch({
            type: userConstants.NEW_PASSWORD_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: userConstants.NEW_PASSWORD_FAILURE,
            payload: error.response.data.message
        })
    }
}


////ADMIN ROUTES////
export const allUsers = () => async (dispatch) => {
    try {

        dispatch({ type: userConstants.ALL_USERS_REQUEST })

        const { data } = await axios.get('/api/v1/admin/users')

        dispatch({
            type: userConstants.ALL_USERS_SUCCESS,
            payload: data.users
        })

    } catch (error) {
        dispatch({
            type: userConstants.ALL_USERS_FAILURE,
            payload: error.response.data.message
        })
    }
}

// Delete user - ADMIN
export const deleteUser = (id) => async (dispatch) => {
    try {

        dispatch({ type: userConstants.DELETE_USER_REQUEST })

        const { data } = await axios.delete(`/api/v1/admin/users/${id}`)

        dispatch({
            type: userConstants.DELETE_USER_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: userConstants.DELETE_USER_FAILURE,
            payload: error.response.data.message
        })
    }
}


//clear error
export const clearError = () => async (dispatch) => {
    dispatch({
        type: authConstants.CLEAR_ERRORS
    })
}
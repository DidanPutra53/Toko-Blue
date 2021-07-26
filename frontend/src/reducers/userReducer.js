import { authConstants, userConstants } from "../constants/userConstant"

export const authReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case authConstants.LOGIN_REQUEST:
        case authConstants.USER_REGISTER_REQUEST:
        case authConstants.USER_LOAD_REQUEST:
            return {
                loading: true,
                isAuthenticated: false
            }
        case authConstants.LOGIN_SUCCESS:
        case authConstants.USER_REGISTER_SUCCESS:
        case authConstants.USER_LOAD_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload
            }
        case authConstants.USER_LOGOUT_SUCCESS:
            return {
                loading: false,
                isAuthenticated: false,
                user: null
            }
        case authConstants.USER_LOAD_FAILURE:
            return {
                loading: false,
                isAuthenticated: false,
                user: action.payload
            }
        case authConstants.USER_LOGOUT_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        case authConstants.LOGIN_FAILURE:
        case authConstants.USER_REGISTER_FAILURE:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }
        case authConstants.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}

export const userReducer = (state = {}, action) => {
    switch (action.type) {
        case userConstants.UPDATE_PROFILE_REQUEST:
        case userConstants.UPDATE_PASSWORD_REQUEST:
        case userConstants.DELETE_USER_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case userConstants.UPDATE_PROFILE_SUCCESS:
        case userConstants.UPDATE_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }
        case userConstants.DELETE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }
        case userConstants.UPDATE_PROFILE_RESET:
        case userConstants.UPDATE_PASSWORD_RESET:
            return {
                ...state,
                isUpdated: false
            }
        case userConstants.DELETE_USER_RESET:
            return {
                ...state,
                isDeleted: false
            }

        case userConstants.UPDATE_PROFILE_FAILURE:
        case userConstants.UPDATE_PASSWORD_FAILURE:
        case userConstants.DELETE_USER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case userConstants.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}

export const forgotPasswordReducer = (state = {}, action) => {
    switch (action.type) {
        case userConstants.FORGOT_PASSWORD_REQUEST:
        case userConstants.NEW_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            }
        case userConstants.FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload
            }
        case userConstants.NEW_PASSWORD_SUCCESS:
            return {
                ...state,
                success: action.payload
            }
        case userConstants.FORGOT_PASSWORD_FAILURE:
        case userConstants.NEW_PASSWORD_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case userConstants.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}

export const allUsersReducer = (state = { users: [] }, action) => {
    switch (action.type) {

        case userConstants.ALL_USERS_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case userConstants.ALL_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload
            }

        case userConstants.ALL_USERS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case userConstants.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}
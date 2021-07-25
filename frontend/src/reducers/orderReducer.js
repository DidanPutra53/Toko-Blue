import { orderConstant } from "../constants/orderConstant";

export const newOrderReducer = (state = {}, action) => {
    switch (action.type) {
        case orderConstant.CREATE_ORDER_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case orderConstant.CREATE_ORDER_SUCCESS:
            return {
                loading: false,
                order: action.payload,
            }
        case orderConstant.CREATE_ORDER_FAILURE:
            return {
                loading: false,
                error: action.payload
            }
        case orderConstant.CLEAR_ERROR:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}


export const myOrdersReducer = (state = { orders: [] }, action) => {
    switch (action.type) {

        case orderConstant.MY_ORDERS_REQUEST:
            return {
                loading: true,
            }

        case orderConstant.MY_ORDERS_SUCCESS:
            return {
                loading: false,
                orders: action.payload
            }
        case orderConstant.MY_ORDERS_FAILURE:
            return {
                loading: false,
                error: action.payload
            }
        case orderConstant.CLEAR_ERROR:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}


export const orderDetailsReducer = (state = { order: {} }, action) => {
    switch (action.type) {

        case orderConstant.ORDER_DETAILS_REQUEST:
            return {
                loading: true,
            }

        case orderConstant.ORDER_DETAILS_SUCCESS:
            return {
                loading: false,
                order: action.payload
            }
        case orderConstant.ORDER_DETAILS_FAILURE:
            return {
                loading: false,
                error: action.payload
            }
        case orderConstant.CLEAR_ERROR:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}

export const allOrderReducer = (state = { orders: [] }, action) => {
    switch (action.type) {

        case orderConstant.ALL_ORDERS_REQUEST:
            return {
                loading: true,
            }

        case orderConstant.ALL_ORDERS_SUCCESS:
            return {
                loading: false,
                orders: action.payload.orders,
                totalAmount: action.payload.totalAmount
            }
        case orderConstant.ALL_ORDERS_FAILURE:
            return {
                loading: false,
                error: action.payload
            }
        case orderConstant.CLEAR_ERROR:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}

export const orderReducer = (state = {}, action) => {
    switch (action.type) {
        case orderConstant.UPDATE_ORDER_REQUEST:
        case orderConstant.DELETE_ORDER_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case orderConstant.UPDATE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }
        case orderConstant.DELETE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }
        case orderConstant.UPDATE_ORDER_FAILURE:
        case orderConstant.DELETE_ORDER_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        case orderConstant.UPDATE_ORDER_RESET:
            return {
                ...state,
                isUpdated: false,
            }
        case orderConstant.DELETE_ORDER_RESET:
            return {
                ...state,
                isDeleted: false
            }
        case orderConstant.CLEAR_ERROR:
            return {
                ...state,
                error: null,
            }
        default:
            return state
    }
}
import { productConstansts, getSingleProduct } from '../constants/product.Constant'

export const productsReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case productConstansts.ALL_PRODUCT_REQUEST:
        case productConstansts.ADMIN_PRODUCT_REQUEST:
            return {
                loading: true,
                products: []
            }
        case productConstansts.ALL_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                productsCount: action.payload.productsCount,
                resPerPage: action.payload.resPerPage
            }
        case productConstansts.ADMIN_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: action.payload
            }
        case productConstansts.ALL_PRODUCT_FAILURE:
        case productConstansts.ADMIN_PRODUCT_FAILURE:
            return {
                loading: false,
                error: action.payload
            }
        case productConstansts.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}

export const getSingleProductReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case getSingleProduct.PRODUCT_DETAIL_REQUEST:
            return {
                ...state,
                loading: true
            }
        case getSingleProduct.PRODUCT_DETAIL_SUCCESS:
            return {
                loading: false,
                product: action.payload
            }
        case getSingleProduct.PRODUCT_DETAIL_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        case getSingleProduct.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}

export const newProductReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case productConstansts.NEW_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case productConstansts.NEW_PRODUCT_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                product: action.payload.product,
            }
        case productConstansts.NEW_PRODUCT_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        case productConstansts.NEW_PRODUCT_RESET:
            return {
                ...state,
                success: false,
            }
        case productConstansts.CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state
    }
}

export const productReducer = (state = {}, action) => {
    switch (action.type) {
        case productConstansts.DELETE_PRODUCT_REQUEST:
        case productConstansts.UPDATE_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case productConstansts.DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }
        case productConstansts.UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }
        case productConstansts.DELETE_PRODUCT_FAILURE:
        case productConstansts.UPDATE_PRODUCT_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        case productConstansts.DELETE_PRODUCT_RESET:
            return {
                ...state,
                isDeleted: false,
            }
        case productConstansts.UPDATE_PRODUCT_RESET:
            return {
                ...state,
                isUpdated: false,
            }
        case productConstansts.CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state
    }
}
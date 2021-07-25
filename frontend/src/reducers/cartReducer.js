import { cartConstant } from "../constants/cartConstants";
import { shippingConstant } from "../constants/shippingConstant";

export const cartReducer = (state = { cartItems: [], shippingInfo: {} }, action) => {
    switch (action.type) {
        case cartConstant.ADD_TO_CART:
            const item = action.payload
            const isItemExists = state.cartItems.find(i => i.product === item.product)
            if (isItemExists) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(i => i.product === isItemExists.product ? item : i)
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }

        case cartConstant.REMOVE_ITEM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter(i => i.product !== action.payload)
            }

        case shippingConstant.SAVE_SHIPPING_INFO:
            return {
                ...state,
                shippingInfo: state.payload
            }

        default:
            return state
    }
}
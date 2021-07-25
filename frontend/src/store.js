import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productsReducer, getSingleProductReducer, newProductReducer, productReducer } from './reducers/product.Reducers'
import { authReducer, userReducer, forgotPasswordReducer, allUsersReducer } from './reducers/userReducer'
import { cartReducer } from './reducers/cartReducer'
import { newOrderReducer, myOrdersReducer, orderDetailsReducer, allOrderReducer, orderReducer } from './reducers/orderReducer'

const reducer = combineReducers({
    products: productsReducer,
    productDetails: getSingleProductReducer,
    newProduct: newProductReducer,
    product: productReducer,
    auth: authReducer,
    user: userReducer,
    allUsers: allUsersReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    allOrder: allOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    order: orderReducer
})

let initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
        shippingInfo: localStorage.getItem('shippingInfo')
            ? JSON.parse(localStorage.getItem('shippingInfo'))
            : []
    }
}

const middleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store
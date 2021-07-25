import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useSelector } from 'react-redux'

import Header from './component/layout/Header';
import Footer from './component/layout/Footer'
import './App.scss';
import Produk from './component/product/ProductHome'
import ProductDetails from './component/product/ProductDetails';
import Home from './component/Home/Home'
import ListOrders from './component/order/ListOrders';

import Login from './component/user/Login'
import Register from './component/user/Register'
import ForgotPassword from './component/user/ForgotPassword';
import NewPassword from './component/user/NewPassword'

import Profile from './component/user/Profile';
import UpdateProfile from './component/user/UpdateProfile'
import UpdatePassword from './component/user/UpdatePassword'

import { loadUser } from './actions/userAction';
import store from './store'
import ProtectedRoute from './component/route/ProtectedRoute';
import Cart from './component/cart/Cart';
import Shipping from './component/cart/Shipping'
import ConfirmOrder from './component/cart/ConfirmOrder';
import Payment from './component/cart/Payment'
import OrderSuccess from './component/cart/OrderSuccess';
import OrderDetail from './component/order/OrderDetails';


//ADMIN ROUTE
import Dashboard from './component/admin/Dashboard';
import ProductList from './component/admin/ProductList';
import newProduct from './component/admin/NewProduct';
import UpdateProduct from './component/admin/UpdateProduct';
import OrdersList from './component/admin/OrdersList';
import ProcessOrder from './component/admin/ProcessOrder';
import UsersList from './component/admin/UsersList';

//payment element
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import axios from 'axios'

function App() {

  const [stripeApiKey, setStripeApiKey] = useState('')

  useEffect(() => {
    store.dispatch(loadUser());

    async function getStripeApiKey() {
      const { data } = await axios.get('/api/v1/stripeapi');
      setStripeApiKey(data.stripeApiKey)
    }

    getStripeApiKey()
  }, [])

  const { user, isAuthenticated, loading } = useSelector(state => state.auth)

  return (
    <Router>
      <div className="App">
        <Header />
        <div className="content">
          <Route path="/" exact component={Home} />
          <Route path="/search/:keyword" component={Produk} />
          <Route path="/Produk" exact component={Produk} />
          <Route path="/Produk/:id" component={ProductDetails} />

          <Route path="/Keranjang" exact component={Cart} />
          <ProtectedRoute path="/Pengiriman" component={Shipping} />
          <ProtectedRoute path="/order/confirm" component={ConfirmOrder} />
          <ProtectedRoute path="/success" component={OrderSuccess} />
          {
            stripeApiKey &&
            <Elements stripe={loadStripe(stripeApiKey)}>
              <ProtectedRoute path="/Pembayaran" component={Payment} />
            </Elements>
          }

          <Route path="/Masuk" component={Login} />
          <Route path="/Daftar" component={Register} />
          <Route path="/Password/Lupa-Password" component={ForgotPassword} exact />
          <Route path="/Password/reset-password/:token" component={NewPassword} exact />

          <ProtectedRoute path="/Profile" exact component={Profile} />
          <ProtectedRoute path="/Profile/Ubah-Profile" exact component={UpdateProfile} />
          <ProtectedRoute path="/Password/Ubah-Password" exact component={UpdatePassword} />

          <ProtectedRoute path="/Profile/Pesanan" exact component={ListOrders} />
          <ProtectedRoute path="/Pesanan/:id" exact component={OrderDetail} />



          <ProtectedRoute path="/Dashboard" isAdmin={true} exact component={Dashboard} />
          <ProtectedRoute path="/admin/produk" isAdmin={true} exact component={ProductList} />
          <ProtectedRoute path="/admin/produk/tambah" isAdmin={true} exact component={newProduct} />
          <ProtectedRoute path="/admin/produk/ubah/:id" isAdmin={true} exact component={UpdateProduct} />
          <ProtectedRoute path="/admin/pesanan" isAdmin={true} exact component={OrdersList} />
          <ProtectedRoute path="/admin/pesanan/ubah/:id" isAdmin={true} exact component={ProcessOrder} />
          <ProtectedRoute path="/admin/user" isAdmin={true} exact component={UsersList} />
        </div>
        {
          !loading && (!isAuthenticated || user.role !== 'admin') && (
            <Footer />
          )
        }
      </div>
    </Router>
  );
}

export default App;

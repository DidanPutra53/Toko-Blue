const express = require('express');
const router = express.Router();

const { newOrder, getSingleOrder, myOrders, allOrder, updateOrder, deleteOrder } = require('../controllers/order.controller')
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

router.route('/cart/tambah').post(isAuthenticatedUser, newOrder)
router.route('/order/:id').get(isAuthenticatedUser, getSingleOrder)
router.route('/orders/me').get(isAuthenticatedUser, myOrders)


router.route('/admin/orders').get(isAuthenticatedUser, authorizeRoles('admin'), allOrder)
router.route('/admin/cart/:id')
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateOrder)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteOrder)
module.exports = router
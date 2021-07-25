const express = require('express')
const router = express.Router()
const {
    getProducts,
    newProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    getAdminProducts
} = require('../controllers/product.controller')
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')


//user route
router.route('/Products').get(getProducts)
router.route('/Products/:id').get(getSingleProduct)

//admin route
router.route('/admin/Products').get(getAdminProducts)
router.route('/admin/products/new').post(isAuthenticatedUser, authorizeRoles('admin'), newProduct)
router.route('/admin/products/:id')
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct)

module.exports = router
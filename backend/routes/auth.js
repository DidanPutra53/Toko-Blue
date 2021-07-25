const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
    logout,
    forgotPassword,
    resetPassword,
    getUserProfile,
    updatePassword,
    updateProfile,
    allUsers,
    getUserDetails,
    updateUser,
    deleteUser
} = require('../controllers/auth.controller')
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

router.route('/daftar').post(registerUser)
router.route('/masuk').post(loginUser)
router.route('/keluar').get(logout)


router.route('/password/reset-password').post(forgotPassword)
router.route('/password/reset-password/:token').put(resetPassword)


router.route('/profile').get(isAuthenticatedUser, getUserProfile)
router.route('/password/ubah-password').put(isAuthenticatedUser, updatePassword)
router.route('/profile/ubah-profile').put(isAuthenticatedUser, updateProfile)

//ADMIN ROUTES
router.route('/admin/users').get(isAuthenticatedUser, authorizeRoles('admin'), allUsers)
router.route('/admin/users/:id')
    .get(isAuthenticatedUser, authorizeRoles('admin'), getUserDetails)
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateUser)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteUser)

module.exports = router;
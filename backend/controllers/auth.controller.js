const User = require('../models/user')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const sendToken = require('../utils/jwt.token')
const sendEmail = require('../utils/sendEmail')
const crypto = require('crypto')
const cloudinary = require('cloudinary')


//Register A user => /api/v1/daftar
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    let avatar = {
        public_id: 'DEFAULT_AVATAR',
        url: 'images/download.jpg',
    };

    if (req.body.avatar) {
        const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: 'avatar',
            width: 150,
            crop: 'scale',
        });

        avatar = {
            public_id: result.public_id,
            url: result.secure_url,
        };
    }

    const {
        email,
        password,
        name
    } = req.body
    const user = await User.create({
        email,
        password,
        name,
        avatar
    })
    sendToken(user, 200, res)
})

//login User => /api/v1//masuk
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const {
        email,
        password
    } = req.body
    //check if email && password is entered by user
    if (!email || !password) {
        return next(new ErrorHandler('Masukan Email dan Password', 400))
    }
    //finding user in database
    const user = await User.findOne({ email }).select('+password')
    if (!user) {
        return next(new ErrorHandler('Email dan Password Salah', 401))
    }
    //check if password is correct or not
    const isPasswordMatched = await user.comparePassword(password)
    if (!isPasswordMatched) {
        return next(new ErrorHandler('Email dan Password Salah', 401))
    }
    sendToken(user, 200, res)
})

//logout user => api/v1/keluar
exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        message: 'Akun sudah Keluar'
    })
})





//get currently loginUser details => /api/v1/profile
exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id)
    res.status(200).json({
        success: true,
        user
    })
})

//update profile user => /api/v1/profile/ubah-profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email
    }
    //update avatar
    if (req.body.avatar !== '') {
        const user = await User.findById(req.user.id)
        const image_id = user.avatar.public_id
        const res = await cloudinary.v2.uploader.destroy(image_id)
        const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: 'avatar',
            width: 150,
            crop: 'scale',
        })
        newUserData.avatar = {
            public_id: result.public_id,
            url: result.secure_url
        }
    }
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    })
    res.status(200).json({
        success: true,
        message: 'Akun sudah diperbarui'
    })
})






//forgot password => /api/v1/password/reset-password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({
        email: req.body.email
    })
    if (!user) {
        return next(new ErrorHandler('Email tidak ditemukan', 404))
    }
    // Get reset token
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });
    // Create reset password url
    const resetUrl = `${req.protocol}://${req.get('host')}/password/reset-password/${resetToken}`;
    const message = `Your password reset token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it.`;
    try {
        await sendEmail({
            email: user.email,
            subject: 'Toko Blue Password Recovery',
            message,
        });
        res.status(200).json({
            success: true,
            message: `Email sent to: ${user.email}`,
        });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined
        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(error.message, 500));
    }
});

//reset password => /api/v1/password/reset-password/:token
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
    // hash URL token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })
    if (!user) {
        return next(new ErrorHandler('Password token tidak cocok atau tidak berlaku', 400))
    }
    if (req.body.password !== req.body.confrimPassword) {
        return next(new ErrorHandler('Password tidak cocok', 400))
    }
    //setup new password
    user.password = req.body.password
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined
    await user.save()
    sendToken(user, 200, res)
})

//update password /change password => /api/v1/password/ubah-password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password')
    //check previous password
    const isMatched = await user.comparePassword(req.body.oldpassword)
    if (!isMatched) {
        return next(new ErrorHandler('Old password is incorrect', 400))
    }
    user.password = req.body.password
    await user.save()
    sendToken(user, 200, res)
})



//ADMIN ROUTES

//get all user accounts => /api/v1/admin/users
exports.allUsers = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find()
    res.status(200).json({
        success: true,
        users
    })
})

//get user details => /api/v1/admin/users/:id
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id)
    if (!user) {
        return next(new ErrorHandler(`User does not found with id: ${req.params.id}`));
    }
    res.status(200).json({
        success: true,
        user
    })
})

//update profile user => /api/v1/admin/users/:id
exports.updateUser = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }
    //update avatar


    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    })
    res.status(200).json({
        success: true,
        message: 'Akun sudah diperbarui'
    })
})

//delete user => /api/v1/admin/users/:id
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id)
    if (!user) {
        return next(new ErrorHandler(`User does not found with id: ${req.params.id}`));
    }
    //remove avatar user 

    await user.remove()
    res.status(200).json({
        success: true,
        message: 'Akun sudah dihapus'
    })
})

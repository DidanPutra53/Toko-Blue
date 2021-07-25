const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const crypto = require('crypto')


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Silakan Isi Email'],
        unique: true,
        validate: [validator.isEmail, 'Email Tidak Valid']
    },
    password: {
        type: String,
        required: [true, 'Silakan Isi Password'],
        minlength: [6, 'Minimal Password lebih dari 6 karakter'],
        select: false,
    },
    name: {
        type: String,
        required: [true, 'Silakan Isi Nama Pengguna'],
        minlength: [3, 'Maksimal username tidak lebih dari 3 karakter'],
    },
    avatar: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        }
    },
    role: {
        type: String,
        default: 'user',
    },
    createdat: {
        type: Date,
        default: Date.now,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
},
    { timestamps: true });

//encrypt password
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

//Compare Password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

//retun JWT
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    })
}

//generate password reset token
userSchema.methods.getResetPasswordToken = function () {
    //generate token
    const resetToken = crypto.randomBytes(20).toString('hex')
    //hash and set to reset password resetToken
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')
    //set token expired time
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000
    return resetToken
}


module.exports = mongoose.model('User', userSchema)
const Product = require('../models/product')
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const APIFeatures = require('../utils/api.Features')
const cloudinary = require('cloudinary')

//crerate new product  => /api/v1/admin/products/new
exports.newProduct = catchAsyncErrors(async (req, res, next) => {

    let productimg = []
    if (typeof req.body.productimg === 'string') {
        productimg.push(req.body.productimg)
    } else {
        productimg = req.body.productimg
    }

    let productimgLinks = []
    for (let i = 0; i < productimg.length; i++) {
        const result = await cloudinary.v2.uploader.upload(productimg[i], {
            folder: 'product'
        })
        productimgLinks.push({
            public_id: result.public_id,
            url: result.secure_url
        })
    }
    req.body.productimg = productimgLinks
    req.body.user = req.user.id

    req.body.user = req.user.id
    const product = await Product.create(req.body)
    res.status(201).json({
        success: true,
        product
    })
})

//get all product =>  /api/v1/products
exports.getProducts = catchAsyncErrors(async (req, res, next) => {
    const productsCount = await Product.countDocuments();
    const apiFeatures = new APIFeatures(Product.find(), req.query)
        .search()
        .filter()
    const products = await apiFeatures.query;
    res.status(200).json({
        success: true,
        productsCount,
        products
    })

})

//get single product detail => /api/v1/products/:id
exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id)
    if (!product) {
        return next(new ErrorHandler('product not found', 404))
    }
    res.status(200).json({
        success: true,
        product
    })
})





//get all product admin=>  /api/v1/admin/products
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
    const products = await Product.find();
    res.status(200).json({
        success: true,
        products
    })

})

//get Update Product => /api/v1/admin/products/:id
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id)
    if (!product) {
        return next(new ErrorHandler('product not found', 404))
    }

    let productimg = []
    if (typeof req.body.productimg === 'string') {
        productimg.push(req.body.productimg)
    } else {
        productimg = req.body.productimg
    }

    if (productimg !== undefined) {
        for (let i = 0; i < product.productimg.length; i++) {
            const result = await cloudinary.v2.uploader.destroy(product.productimg[i].public_id)
        }
        let productimgLinks = []
        for (let i = 0; i < productimg.length; i++) {
            const result = await cloudinary.v2.uploader.upload(productimg[i], {
                folder: 'product'
            })
            productimgLinks.push({
                public_id: result.public_id,
                url: result.secure_url
            })
        }
        req.body.productimg = productimgLinks
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true,
        product
    })
})

//delete product => /api/v1/admin/products/:id
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id)
    if (!product) {
        return next(new ErrorHandler('product not found', 404))
    }

    for (let i = 0; i < product.productimg.length; i++) {
        const result = await cloudinary.v2.uploader.destroy(product.productimg[i].public_id)
    }

    await product.remove()
    res.status(200).json({
        success: true,
        message: 'Product is deleted'
    })
})
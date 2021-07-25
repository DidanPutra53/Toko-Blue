const Order = require('../models/order')
const Product = require('../models/product')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')

//create new order => /api/v1/cart/tambah
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
    const {
        orderItems,
        shippingInfo,
        itemPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
    } = req.body

    const order = await Order.create({
        orderItems,
        shippingInfo,
        itemPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user._id
    })

    res.status(200).json({
        success: true,
        order
    })
})

//get single order => /api/v1/cart/:id
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')
    if (!order) {
        return next(new ErrorHandler('no order with this id', 404))
    }
    res.status(200).json({
        success: true,
        order
    })
})

//get logged in user order => /api/v1/cart
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find({
        user: req.user.id
    })
    res.status(200).json({
        success: true,
        orders
    })
})

//get all order => /api/v1/admin/cart
exports.allOrder = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find()
    let totalAmount = 0
    orders.forEach(order => {
        totalAmount += order.totalPrice
    })
    res.status(200).json({
        success: true,
        totalAmount,
        orders
    })
})

//update order => /api/v1/admin/cart/:id
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id)
    if (order.orderStatus === 'Delivered') {
        return next(new ErrorHandler('You have already delivered this order', 400))
    }
    order.orderItems.forEach(async item => {
        await updateStock(item.product, item.quantity)
    })
    order.orderStatus = req.body.status,
        order.deliveredAt = Date.now()
    await order.save()
    res.status(200).json({
        success: true,
    })
})

async function updateStock(id, quantity) {
    const product = await Product.findById(id);
    product.stock = product.stock - quantity;
    await product.save({ validateBeforeSave: false })
}

//delete order => /api/v1/admin/cart/:id
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id)
    if (!order) {
        return next(new ErrorHandler('no order with this id', 404))
    }
    await order.remove()
    res.status(200).json({
        success: true,
    })
})

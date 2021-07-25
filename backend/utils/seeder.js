const Product = require('../models/product')
const dotenv = require('dotenv')
const connectDatabase = require('../config/database')

const products = require('../data/product.json')

dotenv.config({ path: 'backend/config/config.env ' })

connectDatabase()

const seedProduct = async () => {
    try {
        await Product.deleteMany()
        console.log('Product are deleted')
        await Product.insertMany(products)
        console.log('all product are added')
        process.exit()
    } catch (error) {
        console.log(error.message)
        process.exit()
    }
}

seedProduct()
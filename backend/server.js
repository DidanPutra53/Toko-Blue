const app = require('./app')
// const dotenv = require('dotenv')
const connectDatabase = require('./config/database')
const cloudinary = require('cloudinary')

//handle uncaught exception
process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.message} `);
    console.log(`Shutting down due to uncaught exception`);
    process.exit(1)
})

// setting up config cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


//seting config file
if (process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({ path: 'backend/config/config.env' })

//connecting database
connectDatabase()

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
})

process.on('unhandleRejection', err => {
    console.log(`ERROR: ${err.message} `);
    console.log(`Shutting down the server due to unhandled promise rejection`);
    server.close(() => {
        process.exit(1)
    })
})
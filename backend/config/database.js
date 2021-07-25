const mongoose = require('mongoose')

const connectDatabase = () => {
    mongoose.connect(
        `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.0gedn.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        }
    ).then(con => {
        console.log(`MongoDB Database connected with HOST: ${con.connection.host}`)
        console.log('Database conencted')
    });
}

module.exports = connectDatabase
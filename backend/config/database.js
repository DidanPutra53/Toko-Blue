const mongoose = require('mongoose')

const connectDatabase = () => {
    mongoose.connect(process.env.DB_URL,
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
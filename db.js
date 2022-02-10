require('dotenv').config();

const mongoose = require('mongoose');

const options = {
  keepAlive: true,
  connectTimeoutMS: 30000,
  socketTimeoutMS: 0,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let connection;

const db_uri = process.env.MONGO_URL || process.env.DB_URL;

connection = mongoose.createConnection(db_uri, options, (error) => {
    if (error) {
        console.log('MongoDB connection failed', error);
        process.exit(1);
    }
    console.log('MongoDB connected');
    //require('./initModels')
    ;
});

module.exports = connection;

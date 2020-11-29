
const mongoose = require('mongoose');

const connectionString = 'mongodb://mongodb:27017/darkdb';

mongoose.connect(connectionString, { useNewUrlParser: true }, function(err, db) {
    if (err) {
        console.log('Unable to connect to the server. Please start the server. Error:', err);
    } else {
        console.log('Connected to Server successfully!');
    }
});


const db = mongoose.connection;

module.exports = db;
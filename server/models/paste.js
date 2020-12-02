const mongoose = require('mongoose')
const Schema = mongoose.Schema
const connectionString = 'mongodb://mongo:27017/dark';

mongoose.connect(connectionString, { useNewUrlParser: true }, function(err, db) {
    if (err) {
        console.log('Unable to connect to the server. Please start the server. Error:', err);
    } else {
        console.log('Connected to Mongo successfully!');
    }
});


const pasteSchema = new Schema(
    {
        Author: { type: String },
        Title: { type: String },
        Content: { type: String },
        Date: { type: String },
        Lables: { type: Array },
        hide: {type: Boolean },
    },
)

const logsSchema = new Schema(
    {
        status: { type: String },
        new_pastes: { type: Number},
        date: { type: String },
        hide: {type: Boolean },
    },
)



const Paste = mongoose.model('Paste', pasteSchema)
const Log = mongoose.model('Log', logsSchema)

module.exports = { Paste, Log }

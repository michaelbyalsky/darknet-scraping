const mongoose = require('mongoose')
const Schema = mongoose.Schema

const pasteSchema = new Schema(
    {
        Author: { type: String },
        Title: { type: String, required: true },
        Content: { type: String },
        Date: { type: String },
    },
)


const Paste = mongoose.model('User', pasteSchema)

module.exports = Paste
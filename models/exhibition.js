const mongoose = require('mongoose')

const exhibitionSchema = mongoose.Schema({
    title : {
        type: String,
        required: true
    },
    review: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Exhibition', exhibitionSchema)
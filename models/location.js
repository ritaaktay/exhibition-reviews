const mongoose = require('mongoose')

const locationSchema = mongoose.Schema({
    place: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    //HOW TO STORE ARRAY OF ID'S IN EXHIBITIONS
    exhibitions : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Exhibition'
    }
})

module.exports = mongoose.model('Location', locationSchema)
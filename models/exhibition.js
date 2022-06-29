const mongoose = require('mongoose')

const exhibitionSchema = mongoose.Schema({
    title : {
        type: String,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
    },
    location: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Location'
    },
    rating: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    imageNames: {
        type: Array
    }
})

module.exports = mongoose.model('Exhibition', exhibitionSchema)
const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required: true
    },
    exhibition_id : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Exhibition'
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    content: {
        type: String,
        required: true
    },
    images: {
        type: Array
    },
    comment_ids: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
})

module.exports = mongoose.model('Review', reviewSchema)
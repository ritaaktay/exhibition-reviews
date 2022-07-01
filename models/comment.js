const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required: true
    },
    review_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    content : {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Comment', commentSchema)
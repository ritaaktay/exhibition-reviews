const mongoose = require('mongoose')
const Review = require('./review')

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

//MIDDLEWARE DELETES COMMENT REFERENCE IN PARENT REVIEW
commentSchema.pre('remove', async function(next){
    await Review.updateOne(
        {_id: this.review_id}, 
        {$pull : {comment_ids : this._id}}
        )
    next()
})

module.exports = mongoose.model('Comment', commentSchema)
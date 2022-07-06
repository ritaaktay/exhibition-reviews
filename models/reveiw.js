const mongoose = require('mongoose')
const path = require('path')
const Exhibition = require('./exhibition')
const Comment = require('./comment')

const imageBasePath = 'uploads/review_images'

const reviewSchema = mongoose.Schema({
    // user_id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     // required: true
    // },
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

//DELETES ALL CHILDREN COMMENTS AND REFERENCE IN PARENT EXHIBITION
reviewSchema.pre('remove', async function(next) {
    await Exhibition.updateOne(
        {_id: this.exhibition_id},
        { $pull : {review_ids: this._id}}
        )
    for (let id in this.comment_ids) {
        await Comment.deleteOne({_id: id})
    }
    next()
})

reviewSchema.virtual('imagePaths').get(function() {
    return this.images.map( image => {
        return path.join('public', imageBasePath, image)
    })
})

module.exports = mongoose.model('Review', reviewSchema)
module.exports.imageBasePath = imageBasePath
const mongoose = require('mongoose')
const path = require('path')
const Exhibition = require('./exhibition')
const Comment = require('./comment')

const reviewSchema = mongoose.Schema({
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
        //{data : JSON encoded, type: MIME type}
    },
    comment_ids: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
})

//deletes all comments and removes reference in exhibition
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

//returns array of data URLs for encoded images
reviewSchema.virtual('decodedImages').get(function() {
    let decoded= []
    this.images.forEach(image => {
        decoded.push(
            `data:${image.type};charset=utf-8;base64,${image.data.toString('base64')}`
        )
    })
    return decoded
})

module.exports = mongoose.model('Review', reviewSchema)
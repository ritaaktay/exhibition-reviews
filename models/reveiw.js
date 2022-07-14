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
    //use an array of objects {data : JSON , type: imageType}
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

//this is for a single image
reviewSchema.virtual('decodedImages').get(function() {
    if (this.images != null) {
        let decoded= []
        this.images.forEach(image => {
            decoded.push(
                `data:${image.type};charset=utf-8;base64,${image.data.toString('base64')}`
            )
        })
        return decoded
    }
})

module.exports = mongoose.model('Review', reviewSchema)
module.exports.imageBasePath = imageBasePath
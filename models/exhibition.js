const mongoose = require('mongoose')
const Review = require('./review')
const Location = require('./location')
const Comment = require('./comment')
const fs = require('fs')
const path = require('path')

const exhibitionSchema = mongoose.Schema({
    title : {
        type: String,
        required: true
    },
    location_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Location'
    },
    review_ids: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
        required: true,
    }],
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})

//deletes reviews and comments, removes exhibition id from location
exhibitionSchema.pre('remove', async function(next) {
    await Location.updateOne(
        {_id: this.location_id},
        {$pull : {exhibition_ids: this._id}}
    )
    for (let id of this.review_ids) {
        let review = await Review.findOne({_id: id})
        for (let comment of review.comment_ids) {
            await Comment.deleteOne({_id: comment})
        }
        await Review.deleteOne({_id:id})
    }
    next()
})


module.exports = mongoose.model('Exhibition', exhibitionSchema)
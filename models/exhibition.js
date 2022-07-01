const mongoose = require('mongoose')

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
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date
    },
    rating: {
        type: Number
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    //This should be updated to the created at date 
    //of the last review added to exhibition
    lastActive: {
        type: Date,
        required: true,
        default: Date.now
    },
    review_ids: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
        required: true,
    }
})

module.exports = mongoose.model('Exhibition', exhibitionSchema)
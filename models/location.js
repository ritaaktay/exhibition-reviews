const mongoose = require('mongoose')

const locationSchema = mongoose.Schema({
    location: {
        type: String,
        required: true
    },
    city: {
        type: String
    },
    exhibition_ids : [{
        type: mongoose.Schema.Types.ObjectId,
        // locations still get creates with empty exhibition_ids array
        required: true,
        ref: 'Exhibition'
    }]
})

module.exports = mongoose.model('Location', locationSchema)
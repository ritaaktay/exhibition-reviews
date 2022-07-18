const mongoose = require('mongoose')

const locationSchema = mongoose.Schema({
    location: {
        type: String,
        required: true
    },
    exhibition_ids : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exhibition'
    }]
})

locationSchema.pre('remove', function(next) {
    if (this.exhibition_ids.length > 0) next(new Error('Cannot delete a location that has reviews'))
    else next()
})

module.exports = mongoose.model('Location', locationSchema)
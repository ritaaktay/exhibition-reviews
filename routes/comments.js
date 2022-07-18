const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Exhibition = require('../models/exhibition')
const Review = require('../models/review')
const Comment = require('../models/comment')


router.post('/', async (req, res) => {
    var comment = new Comment ({
        content: req.body.comment,
        review_id: new mongoose.Types.ObjectId(`${req.body.review}`)
    })
    try {
        await comment.save()
        let review = await Review.findOneAndUpdate(
            {_id: req.body.review},
            { $push : {comment_ids: comment._id}},
            {new : true}
        )
        console.log(review)
        res.redirect(`exhibitions/${review.exhibition_id.toString()}`)
    } catch (err) {
        res.send(err.message)
    }
})

router.get('/:id/edit',(req, res) => {
    res.send(`edit comment: ${req.params.id}`)
})

router.route('/:id')
.put((req, res) => {
    res.send(`update comment: ${req.params.id}`)
})
.delete((req, res) => {
    res.send(`delete comment: ${req.params.id}`)
})

module.exports = router
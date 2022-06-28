const express = require('express')
const router = express.Router()
const Exhibition = require('../models/exhibition')

router.route('/')
//ALL EXHIBITIONS
.get((req, res) => {
    res.render('exhibitions/index')
})
//CREATE NEW EXHIBITION
.post((req, res) => {
    const exhibition = new Exhibition({
        title: req.body.title,
        review: req.body.review
    })
    //this method saves object to model
    //and takes a cb for err and new object 
    exhibition.save((err, newExhibition) => {
        if (err) {
            res.render('exhibitions/new', {
                exhibition: exhibition,
                errMEssage: "Unable to create new exhibition"
            })
        } else {
            res.redirect(`exhibitions/${newExhibition.id}`)
        }
    })
})
//NEW EXHIBITION FORM
//the new exhibition here is for the update form to display exhibition name and review 
router.get('/new', (req,res) => {
    res.render('exhibitions/new', { exhibition : new Exhibition()})
})

router.route('/:id')
//ONE EXHIBITION
.get((req, res) => {
    res.send(`Exhibition: ${req.params.id}`)
})
//UPDATE EXHIBITION
.put((req, res) => {
    res.send(`Update Exhibition: ${req.params.id}`)
})
//DELETE EXHIBITION
.delete((req, res) => {
    res.send(`Delete Exhibition: ${req.params.id}`)
})

module.exports = router
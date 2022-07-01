const express = require('express')
const router = express.Router()
const Exhibition = require('../models/exhibition')
const Location = require('../models/location')
const Review = require('../models/reveiw')
const User = require('../models/user')


//ALL EXHIBITIONS
//ADD RECENTLY ADDED, HIGHEST RATED, MOST HEATED
router.get('/', async (req, res) => {
    try {
        const exhibitions = await Exhibition.find()
        res.render('exhibitions/index', {
            exhibitions: exhibitions,
        })
    } catch (err) {
        res.redirect('/', {errMessage: "Unable to retreive exhibitions"})
    }
})
//SEARCH EXHIBITIONS
//ADD SUPPORT FOR MULTIPLE SEARCH PARAMETERS
router.get('/search', async (req,res) => {
    let searchOptions = {}
    if (req.query.title != null && req.query.title != "") {
        searchOptions.title = new RegExp (req.query.title, 'i')
    }
    if (req.query.keyword != null && req.query.keyword != "") {
        searchOptions.review = new RegExp (req.query.keyword, 'i')
    }
    try {
        const exhibitions = await Exhibition.find(searchOptions)
        res.render('exhibitions/search', {
            exhibitions: exhibitions,
            searchOptions : req.query
        })
    } catch (err) {
        res.redirect('/', {errMessage: "Unable to retreive exhibitions"})
    }
})

//NEW EXHIBITION FORM
//the new exhibition here is for the update form to display exhibition name and review 
router.get('/new', async (req,res) => {
    const locations = await Location.find({});
    res.render('exhibitions/new', { 
        exhibition : new Exhibition(),
        locations: locations
        })
})
//CREATE NEW EXHIBITION
router.post('/', async (req, res) => {
    //EXHIBITION
    var exhibition = new Exhibition({
        title: req.body.title,
        startDate: req.body.startDate,
        endDate: req.body.endDate
    })
    //HELPER FUNC TO RE-RENDER FORM IN CATCH BLOCKS
    async function rerender(message) {
        let locations = await Location.find({})
        res.render('exhibitions/new', { exhibition : exhibition,
            locations : locations,
            errMessage : message})
    }
    //LOCATION
    //figure out how to select existing or add new 
    var location = await Location.findOne({_id : req.body.location})
    try {
        await location.save()
        exhibition.location_id = location._id
    } catch {
        rerender("Could not create location")
    }
    // REVIEW
    let review = new Review ({content: req.body.review, exhibition_id: exhibition._id})
    try {
        await review.save()
        exhibition.review_ids = [review._id]
    } catch {
        rerender("Could not create review")
    }
    try {
        await exhibition.save()
        //if this is the first exhibition being added to that location we cannot push
        if (location.exhibition_ids != null) location.exhibition_ids.push(exhibition._id)
        else location.exhibition_ids = [exhibition._id]
        //here .id (not ._id) because we want a string in the url
        res.redirect(`exhibitions/${exhibition.id}`)
    } catch {
        rerender("Could not create exhibition")
    }
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
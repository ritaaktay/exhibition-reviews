const express = require('express')
const multer = require('multer')
const path = require('path')
const router = express.Router()
const Exhibition = require('../models/exhibition')
const Location = require('../models/location')
const Review = require('../models/reveiw')
const User = require('../models/user')

//ALL EXHIBITIONS
//ADD RECENTLY ADDED, HIGHEST RATED, MOST HEATED
router.get('/', async (req, res) => {
    renderExhibitions(res)
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
router.get('/new', async (req,res) => {
    const locations = await Location.find({});
    res.render('exhibitions/new', { 
        //still don't understand locals  the locals object - 
        //is there no better way than passing in 
        //empty document or doing conditionals in the view?
        review: "",
        exhibition: new Exhibition(),
        locations: locations
        })
})

//CONFIG MULTER 
const imageMimeTypes = ['image/png', 'image/jpeg', 'image/gif', 'image/webp']
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join('public', Review.imageBasePath))
  },
  filename: function (req, file, cb) {
    let title = req.body.title.split(" ")[0]
    cb(null, title + '_' + Date.now() + '.png')
  }
});
const upload = multer({ 
    storage: storage,
    fileFilter: (req, file, cb) => {
        cb(null, imageMimeTypes.includes(file.mimetype))
    }
})

// CREATE NEW EXHIBITION
router.post('/', upload.array('image', 10), async (req, res) => {
    //EXHIBITION
    var exhibition = new Exhibition({
        title: req.body.title,
    })
    //HELPER FUNC TO RE-RENDER FORM IN CATCH BLOCKS
    async function rerender(message) {
        let locations = await Location.find({})
        res.render('exhibitions/new', { 
            exhibition : exhibition,
            locations : locations,
            review : req.body.review,
            errMessage : message})
    }
    //LOCATION
    var location = await Location.findOne({_id : req.body.location})
    if (location == null) return rerender("Please select a location")
    else exhibition.location_id = location._id
    // REVIEW
    let review = new Review ({content: req.body.review, 
                              exhibition_id: exhibition._id,
                              images: []})
    //IMAGES
    req.files.forEach(file => review.images.push(file.filename))
    try {
        await review.save()
        exhibition.review_ids = [review._id]
    } catch {
        rerender("Could not create review")
    }
    try {
        await exhibition.save()
        location.exhibition_ids.push(exhibition._id)
        await location.save()
        //here .id (not ._id) because we want a string in the url
        res.redirect(`exhibitions/${exhibition.id}`)
    } catch {
        //delete review if exhibition save fails
        await Review.deleteOne({ _id: review._id }) 
        //exhibition._Id was only added to location on succesfull exhibition save
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
.delete(async (req, res) => {
    var exhibition = await Exhibition.findOne({_id:`${req.params.id}`})
    await exhibition.remove()
    res.redirect('/exhibitions')
})

//FUNCTIONS
async function renderExhibitions(res) {
    try {
        const exhibitions = await Exhibition.find()
        var reviewMap = {};
        for (let exhibition of exhibitions) {
            //displays first submitted review of exhibition 
            let review = await Review.findOne({_id : exhibition.review_ids[0]})
            reviewMap[exhibition._id] = review
        }
        res.render('exhibitions/index', {
            exhibitions: exhibitions,
            reviewMap : reviewMap
        })
    } catch (err) {
        res.send(err.message)
    }
}

module.exports = router
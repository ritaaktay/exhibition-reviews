const Review = require('../models/reveiw')
const multer = require('multer')
const path = require('path')

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

module.exports = upload
const express = require('express');
const path = require('path');
const GalleryRouter=express.Router();
const multer = require('multer');
const { galleryController } = require("../controllers");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/gallery/'); // Destination folder for storing images
    },
    filename: function (req, file, cb) {
        // Generate a unique filename using the current timestamp and original name
        const uniqueSuffix = Date.now() + '-' + Math.floor(Math.random());
        const extension = path.extname(file.originalname);
        cb(null, `${uniqueSuffix}${extension}`);
    }
});

// Filter to ensure only images are uploaded
const imageFilter = function (req, file, cb) {
    // Accept images only
    if (!file.mimetype.startsWith('image/')) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

// Initialize multer with storage and file filter
const upload = multer({
    storage: storage,
    fileFilter: imageFilter
});

// Define the fields for multiple image uploads
const uploadFields = upload.fields([
    { name: 'image_one', maxCount: 1 },
    { name: 'image_two', maxCount: 1 },
    { name: 'image_three', maxCount: 1 },
    { name: 'image_four', maxCount: 1 },
    { name: 'image_five', maxCount: 1 },
    { name: 'image_six', maxCount: 1 },
    { name: 'image_seven', maxCount: 1 }
]);

GalleryRouter.post('/',uploadFields,galleryController.addGallery);
GalleryRouter.get('/:id',galleryController.GetGallery);

module.exports=GalleryRouter;
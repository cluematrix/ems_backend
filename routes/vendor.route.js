const express = require('express');
const VendorRouter=express.Router();
const multer = require('multer');
const { vendorController } = require("../controllers");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/vendor/'); // Destination folder for storing images
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Keep original filename
    }
});
const upload = multer({ storage: storage });

// ......................
VendorRouter.post('/login',upload.single('logo_image'),vendorController.loginVendor);
VendorRouter.post('/',upload.single('logo_image'),vendorController.addVendor);
VendorRouter.get('/',vendorController.getVendor);

module.exports=VendorRouter;
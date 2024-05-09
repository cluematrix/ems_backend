const express = require('express');
const LoginRouter=express.Router();
const multer = require('multer');
const { loginController } = require("../controllers");


// ......................
LoginRouter.post('/',loginController.getOtp);
// VendorRouter.get('/',vendorController.getAllService);

module.exports=LoginRouter;
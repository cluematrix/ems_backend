const express=require('express');
const locationRouter=express.Router();
const { LocationController } = require("../../controllers");

locationRouter.get('/pincode/:pincode',LocationController.getPincodeData);

module.exports=locationRouter;
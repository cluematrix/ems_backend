const express=require('express');
const eventRouter=express.Router();
const { eventController } = require("../controllers");


eventRouter.get('/',eventController.getAllEvent);

eventRouter.post('/addEvent',eventController.addEvent);

eventRouter.post('/eventPackage',eventController.addEventPkg);

module.exports=eventRouter;
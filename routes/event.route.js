const express=require('express');
const eventRouter=express.Router();
const { eventController } = require("../controllers");


eventRouter.get('/',eventController.getAllEvent);

eventRouter.post('/addEvent',eventController.addEvent);

eventRouter.post('/eventPackage',eventController.addEventPkg);

eventRouter.get('/eventPackage',eventController.getAllEventPackage);

eventRouter.post('/eventadd',eventController.addEventManage);

eventRouter.get('/geteventofCust',eventController.geteventofCust);

eventRouter.get('/geteventDates',eventController.geteventDates);


module.exports=eventRouter;
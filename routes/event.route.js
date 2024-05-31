const express=require('express');
const eventRouter=express.Router();
const { eventController } = require("../controllers");


eventRouter.get('/:id',eventController.getAllEvent);

eventRouter.post('/addEvent',eventController.addEvent);

eventRouter.post('/eventPackage',eventController.addEventPkg);

eventRouter.get('/eventPackage/:id',eventController.getAllEventPackage);

eventRouter.post('/eventadd',eventController.addEventManage);

eventRouter.get('/geteventofCust/:id',eventController.geteventofCust);

eventRouter.get('/geteventDates/:id',eventController.geteventDates);

eventRouter.get('/getLastPayment/:id',eventController.getLastPayment);

eventRouter.get('/geteventbydate/:date/:id',eventController.geteventbydate);

eventRouter.post('/Makepayment',eventController.Makepayment);

eventRouter.get('/getCustomerEvents/:id',eventController.getCustomerEvents);

eventRouter.post('/updatePaymentUrl',eventController.updatePaymentPdfUrl);

eventRouter.post('/TransferEvent',eventController.TransferEvent);

eventRouter.get('/Exposing/:id',eventController.Exposing);

eventRouter.get('/ExposedTo/:id',eventController.ExposedTo);

eventRouter.get('/getVendorList/:id',eventController.getVendorList);

eventRouter.get('/Getexpense/:id/:type',eventController.Getexpense);

eventRouter.post('/getAlltotal/:id',eventController.getAlltotal);
module.exports=eventRouter;
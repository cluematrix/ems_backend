const express=require('express');
const serviceRouter=express.Router();
const { serviceController } = require("../../controllers");

serviceRouter.post('/',serviceController.addService);
serviceRouter.get('/',serviceController.getAllService);
serviceRouter.get('/:id',serviceController.getoneAllService);
//servicePackage
serviceRouter.get('/servicePkg',serviceController.getAllServicepkg);
serviceRouter.post('/servicePkg',serviceController.addServicepkg);
serviceRouter.get('/servicePkg/:id',serviceController.getOneServicepkg);

module.exports=serviceRouter;
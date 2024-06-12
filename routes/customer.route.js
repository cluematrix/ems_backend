const express = require('express');
const customerRouter = express.Router();
const { customerController } = require("../controllers")

customerRouter.get('/:id',customerController.getCustomer);

module.exports=customerRouter;
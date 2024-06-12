const express = require('express');
const employeeRouter = express.Router();
const { employeeController } = require("../controllers")

employeeRouter.post('/', employeeController.AddEmployee);
employeeRouter.get('/:id', employeeController.getEmployee);

module.exports=employeeRouter; 
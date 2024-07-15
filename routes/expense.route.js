const express = require('express');
const expenseRouter = express.Router();
const { expenseController } = require("../controllers");

// eventRouter.get('/:id',expenseController.getAllEvent);
expenseRouter.post('/addExpense',expenseController.addExpense);

module.exports=expenseRouter;
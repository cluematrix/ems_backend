const express = require('express');
const adminRouter = express.Router();
const { adminController } = require("../controllers")

adminRouter.post('/login', adminController.Newadminlogin);
adminRouter.get('/', adminController.getpassword);

module.exports=adminRouter; 
const httpStatus = require("http-status");
require("dotenv").config();
const {  Events } = require('../models');
const {  eventPackage } = require('../models');
const {  eventDate } = require('../models');
const {  Vendor } = require('../models');
const {  Customer } = require('../models');
const {  eventManagement } = require('../models');
const {  eventPayment } = require('../models');
const {  transferEvent } = require('../models');
const {  Expense } = require('../models');


const addExpense = async(req,res)=>{ 
    try{
        const Event=new Expense(req.body);
        await Event.save();
        res.status(httpStatus.OK).json({msg:'Expense Added Successfully',expense:Event});
    }
    catch(error){
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: 'Server error' });
    }
}



module.exports = {
    addExpense
}
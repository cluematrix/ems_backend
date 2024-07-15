const httpStatus = require("http-status");
require("dotenv").config();
const {  Events } = require('../models');
const {  eventPackage } = require('../models');
const {  eventDate } = require('../models');
const {  Customer } = require('../models');
const {  eventManagement } = require('../models');

const getCustomer=async(req,res)=>{
  try{
     const vendor_id=req.params.id;
     const evnt=await Customer.findAll({where:{is_delete:false,vendor_id:vendor_id}});
     res.status(httpStatus.OK).json({data:evnt})
  }
  catch(error){
    console.error('Error saving event pkg data:', error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({mesg:'server error'});
  }
}
module.exports = {
    getCustomer
}
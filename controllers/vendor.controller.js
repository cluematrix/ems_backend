const httpStatus = require("http-status");
require("dotenv").config();
const {  Vendor } = require('../models');

const addVendor = async(req,res)=>{
    try{
        const vendor=new Vendor(req.body);
        await vendor.save();
        res.status(httpStatus.CREATED).json({msg:'Service Added Successfully',vendor:vendor});
    }
    catch(error){
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: 'Server error' });
    }
}


module.exports = {
    addVendor
}
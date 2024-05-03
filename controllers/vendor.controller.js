const httpStatus = require("http-status");
require("dotenv").config();
const {  Vendor } = require('../models');

const addVendor = async(req,res)=>{ 
    try{
        const image = req.file ? req.file.path : null;
        req.body.logo_image=image;
        const vendor=new Vendor(req.body);
        await vendor.save();
        res.status(httpStatus.CREATED).json({msg:'Vendor Added Successfully',vendor:vendor});
    }
    catch(error){
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: 'Server error' });
    }
}


module.exports = {
    addVendor
}
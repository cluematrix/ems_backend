const httpStatus = require("http-status");
require("dotenv").config();
const {  Vendor } = require('../models');
const {  Service } = require('../models');
const {  servicePackage } = require('../models');


const addVendor = async(req,res)=>{ 
    try{
        const image = req.file ? req.file.path : null;
        req.body.logo_image=image;
        const spkg= await servicePackage.findOne({where:{is_delete:false,id: req.body.service_pkg_id}});
        const now = new Date();
        // console.log(now);
        const expdays = now.getTime() + spkg['validity_in_days'] * 24 * 60 * 60 * 1000;
        const expiry_date = new Date(expdays);
        req.body.expiry_date=expiry_date.toISOString().split('T')[0];
        // console.log(expiry_date);
        const vendor=new Vendor(req.body);
        await vendor.save();
        res.status(httpStatus.CREATED).json({msg:'Vendor Added Successfully',vendor:req.body});
    }
    catch(error){
        console.error('Error saving vendor data:', error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: 'Server error' });
    }
}


module.exports = {
    addVendor
}
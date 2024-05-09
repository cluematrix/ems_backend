const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const httpStatus = require("http-status")
require("dotenv").config();
const { superAdmin } = require('../models');
const { Vendor } = require('../models');


function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

const getOtp = async(req,res)=> {
    try {
        const  mobile_no  = req.body['mobile_no'];
        // console.log(mobile_no);
        const admin = await Vendor.findOne({where:{ mob_no: mobile_no }});
        if(admin!='' || admin!=null){
            otp=getRandomNumber(1000,9999);
            res.status(httpStatus.OK).json({ msg:'OTP Sent Successfully',otp:otp });
        }else{
             res.status(httpStatus.BAD_REQUEST).json({ msg: 'Invalid Mobile Number' });
        }
    }
    catch(error){
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: 'Server error' });
        console.log(error);
    }
}

const loginAdmin = async (req, res) => {
    try {
      const { email, password } = req.body;
      const admin = await Vendor.findOne({ email: email });
      
      if (!admin) {
        return res.status(httpStatus.BAD_REQUEST).json({ msg: 'Invalid email or password' });
      }
  
      const blockedAdmin = await AdminModel.findOne({ email: email });
      if (blockedAdmin.isBlocked === true) {
        return res.status(httpStatus.FORBIDDEN).json({ error: 'Your account is blocked' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, admin.password);
      if (!isPasswordValid) {
        return res.status(httpStatus.BAD_REQUEST).json({ msg: 'Invalid email or password' });
      }
  
      const token = jwt.sign({ adminId: admin._id }, 'Bearar');
      await admin.save();
      if(admin){
        const role = admin.role;
      }
    } catch (error) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: 'Server error' });
      console.log(error);
    }
  };

  module.exports = {
    getOtp
  }
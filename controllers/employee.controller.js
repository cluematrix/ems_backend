const httpStatus = require("http-status");
require("dotenv").config();
const {  employee } = require('../models');

const AddEmployee = async(req,res)=>{
    try{
        const Event=new employee(req.body);
        await Event.save();
        res.status(httpStatus.OK).json({msg:'Employee Added Successfully',employee:Event});
    }
    catch(error){
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: 'Server error' });
    }
}


module.exports = {
    AddEmployee
}
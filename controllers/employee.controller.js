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


const getEmployee=async(req,res)=>{
    try{
       const vendor_id=req.params.id;
       const evnt=await employee.findAll({where:{is_delete:false,vendor_id:vendor_id}});
       res.status(httpStatus.OK).json({data:evnt})
    }
    catch(error){
      console.error('Error saving event pkg data:', error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({mesg:'server error'});
    }
  }


module.exports = {
    AddEmployee,getEmployee
}
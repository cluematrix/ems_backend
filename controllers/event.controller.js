const httpStatus = require("http-status");
require("dotenv").config();
const {  Events } = require('../models');
const {  eventPackage } = require('../models');


const addEvent = async(req,res)=>{ 
    try{
        const Event=new Events(req.body);
        await Event.save();
        res.status(httpStatus.OK).json({msg:'Event Added Successfully',Event:Event});
    }
    catch(error){
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: 'Server error' });
    }
}


const addEventPkg = async(req,res)=>{ 
    try{
        const Eventpkg=new eventPackage(req.body);
        await Eventpkg.save();
        res.status(httpStatus.OK).json({msg:'Event Added Successfully',EventPackage:Eventpkg});
    }
    catch(error){
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: 'Server error' });
    }
}

const getAllEvent=async(req,res)=>{
    try{
        console.log('ddd');
     const evnt=await Events.findAll({where:{is_delete:false}});
     res.status(httpStatus.OK).json({ data: evnt });
    }catch(error){
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({msg:'server error'});
    }
}


module.exports = {
    addEvent,addEventPkg,getAllEvent
}
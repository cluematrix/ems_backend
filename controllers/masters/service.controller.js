const httpStatus = require("http-status");
const { body, validationResult } = require('express-validator');
require("dotenv").config();
const {  Service } = require('../../models');
const {  servicePackage } = require('../../models');

const addService = async(req,res)=>{
    try{
        const service=new Service(req.body);
        await service.save();
        res.status(httpStatus.CREATED).json({msg:'Service Added Successfully',service:service});
        
    }
    catch(error){
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: 'Server error' });
    }
}


const getAllService=async(req,res)=>{
    try{
     const service=await Service.findAll({where:{is_delete:false}});
     res.status(httpStatus.OK).json({ data: service });
    }catch(error){
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({msg:'server error'});
    }
}


const getoneAllService=async(req,res)=>{
    try{  
        const service=await servicePackage.findAll({where:{is_delete:false,service_id:req.params.id}});
        res.status(httpStatus.OK).json({ data: service });
    }catch(error){
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({msg:'server error'});
    }
}



//servicePackage

const addServicepkg = async(req,res)=>{
    try{ 
        const servicepkg=new servicePackage(req.body);
        await servicepkg.save();
        res.status(httpStatus.CREATED).json({msg:'Service Added Successfully',servicepkg:servicepkg});
    }
    catch(error){
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: 'Server error' });
    }
}

const getAllServicepkg=async(req,res)=>{
    try{
     const servicepkg=await servicePackage.findAll({where:{is_delete:false}});
     res.status(httpStatus.OK).json({ data: servicepkg });
    }catch(error){
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({msg:'server error'});
    }
}

const getOneServicepkg=async(req,res)=>{
    try{
        id=req.params.id;
     const servicepkg=await servicePackage.findAll({where:{is_delete:false,id:id}});
     res.status(httpStatus.OK).json({ data: servicepkg });
    }catch(error){
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({msg:'server error'});
    }
}

module.exports = {
    addService,
    getAllService,
    addServicepkg,
    getAllServicepkg,
    getOneServicepkg,
    getoneAllService
}
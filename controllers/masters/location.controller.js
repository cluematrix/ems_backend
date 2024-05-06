const httpStatus = require('http-status');
require("dotenv").config();
const {  Country } = require('../../models');
const {  State } = require('../../models');
const {  City} = require('../../models');
const {  Location } = require('../../models');


const getPincodeData = async (req,res)=>{
    try{
        const data={};
        const loc=await Location.findOne({where:{is_delete:false,pincode:req.params.pincode}});
         if(loc) {
            const country= await Country.findOne({where:{is_delete:false,id:loc['country_id']}});
            const state= await State.findOne({where:{is_delete:false,id:loc['state_id']}});
            const city= await City.findOne({where:{is_delete:false,id:loc['city_id']}});
            const datas = {
                location:loc,
                country:country,
                state:state,
                city:city
            }
            res.status(httpStatus.OK).json({data:datas});
         } else
         {
         res.status(httpStatus.OK).json({data:{},msg:'No data found'});
        }
    }
    catch(error){
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({msg:error});
    }
}


module.exports = {
    getPincodeData
}
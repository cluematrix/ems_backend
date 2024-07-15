const { boolean } = require("joi");
const sequelize = require("../config");
// const service = require("./service.model");

const servicePackage = sequelize.define('service_packages',{
    service_id:{
        type:Number,
        required: true
    },
    package_name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    validity_in_days:
    {
        type:String,
        required:true
    },
    amount:{
     type:Number,
     min: 0 ,
     required:true
    },
    is_active:{
        type:boolean
    },
    is_delete:{
        type:boolean
    }
});
module.exports=servicePackage;
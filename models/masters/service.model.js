const {  boolean } = require("joi");
const sequelize = require("../config");

const Service = sequelize.define('services',{
    service_name:{
        type:String,
        required : true
    },
    description:{
        type:String,
        required: true
    },
    is_active:{
        type:boolean,
        required: false
    },
    is_delete:{
        type:boolean,
        required: true
    }
});

module.exports=Service;
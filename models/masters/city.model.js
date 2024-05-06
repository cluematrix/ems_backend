const {  boolean } = require("joi");
const sequelize = require("../config");

const city = sequelize.define('cities',{
    country_id:{
       type:Number,
       required:true
    },
    state_id:{
        type:Number,
        required:true
     },
    name:{
        type:String,
        required : true
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

module.exports=city;
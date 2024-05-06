const {  boolean } = require("joi");
const sequelize = require("../config");

const country = sequelize.define('countries',{
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

module.exports=country;
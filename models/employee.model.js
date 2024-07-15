const { boolean } = require("joi");
const sequelize = require("./config");

const employee = sequelize.define('employees',{
    vendor_id:{
        type:Number,
        required:true
    },
    employee_name:{
        type:String,
        required:true
    },
    dob:{
        type:String,
        required:true
    },
    anniversary_date:{
        type:Number,
        required:true
    },
    mob_no:{
        type:Number,
        required:true
    },
    alt_mob_no:{
        type:Number,
        required:true
    },
    address:{
        type:Number,
        required:true
    },
    pincode:{
        type:Number,
        required:true
    },
    country_id:{
        type:Number,
        required:true
    },
    state_id:{
        type:Number,
        required:true
    },
    city_id:{
        type:Number,
        required:true
    },
    salary_type:{
        type:Number,
        required:true
    },
    salary_amount:{
        type:Number,
        required:true
    },
    account_no:{
        type:Number,
        required:true
    },
    ifsc_code:{
        type:String,
        required:true
    },
    adhar_no:{
        type:String,
        required:true
    },
    branch_name:{
        type:String,
        required:true
    },
    bank_name:{
        type:String,
        required:true
    },
    
});

module.exports=employee;
const { boolean } = require('joi');
const sequelize = require('./config');

const Customer = sequelize.define('customers',{
    vendor_id:{
        type:Number,
        required:true
      },
      customer_name:{
        type:String,
        required:true
      },
      dob:{
        type:Date,
        required:true
      },
      anniversary_date:{
        type:Date,
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
        type:String,
        required:true
      },
      country_id:{
        type:String,
        required:true
      },
      pincode:{
        type:String,
        required:true
      },

      state_id:{
        type:String,
        required:true
      },
      city_id:{
        type:String,
        required:true
      },
      is_active:{
        type:Number
      },
      is_delete:{
        type:Number
      },
});
module.exports=Customer;
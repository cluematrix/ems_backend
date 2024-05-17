const { boolean } = require("joi");
const sequelize = require("./config");

const Vendor = sequelize.define('vendors',{
    service_id: {
      type:Number,
      required: true
    },
    service_pkg_id: {
        type:Number,
        required: true
      },
      company_name: {
        type:String,
        required: true
      },
      owner_name:{
         type:String,
         required:true,
      },
      
      logo_image: {
        type: String,
        // required: fa,
      },
      mob_no: {
        type:Number,
        required: true
      },
      alt_mob_no: {
        type:Number,
        required: true
      },
      password: {
        type:String,
        required: true
      },
      address: {
        type:String,
        required: true
      },
      pincode: {
        type:Number,
        required: true
      },
      location_id: {
        type:Number,
        required: true
      },
      country_id:{
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
      is_active: {
        type:boolean,
      },
      is_delete: {
        type:boolean,
      },

      expiry_date: {
        type:Date,
      },
});




module.exports = Vendor;
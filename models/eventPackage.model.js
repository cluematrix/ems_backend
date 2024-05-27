const { boolean } = require('joi');
const sequelize = require('./config');

const eventPackage = sequelize.define('event_packages',{
  event_id:{
    type:Number,
    required:true
  },
  vendor_id:{
    type:Number,
    required:true
  },
  package_name:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  amount:{
    type:String,
    required:true
  },
  is_active:{
    type:boolean,
    required:true
  },
  is_delete:{
    type:boolean,
    required:true
  },
});

module.exports=eventPackage;
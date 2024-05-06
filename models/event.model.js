const { boolean } = require('joi');
const sequelize = require('./config');

const event = sequelize.define('events',{
  vendor_id:{
    type:Number,
    required:true
  },
  event_name:{
    type:String,
    required:true
  },
  description:{
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

module.exports=event;
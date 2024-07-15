const { boolean } = require('joi');
const sequelize = require('./config');
const  eventManagement  = require('./eventManagement.model');
const transferEvent = sequelize.define('transfer_events',{
  event_manage_id:{
    type:Number,
    required:true
  },
  vendor_from:{
    type:Number,
    required:true
  },
  vendor_to:{
    type:Number,
    required:true
  },
  original_event_amount:{
    type:String,
    required:true
  },
  exposing_amount:{
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
transferEvent.belongsTo(eventManagement, { foreignKey: 'event_manage_id' });
module.exports=transferEvent;
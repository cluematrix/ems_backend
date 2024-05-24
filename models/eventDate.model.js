const { boolean } = require('joi');
const sequelize = require('./config');
const  eventManagement  = require('./eventManagement.model');
const eventDate = sequelize.define('event_dates',{
    event_manage_id:{
    type:Number,
    required:true
  },
  from_date:{
    type:Date,
    required:true
  },
  to_date:{
    type:Date,
    required:true
  },
  from_time:{
    type:String,
    required:true
  },
  to_time:{
    type:String,
    required:true
  },
  remark:{
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
eventDate.belongsTo(eventManagement, { foreignKey: 'event_manage_id' });
module.exports=eventDate;
const sequelize = require('../config');

const location = sequelize.define('locations',{
   pincode : {
    type:Number,
    required:true
   },
   name:{
    type:String,
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
   is_active:{
    type:Number,
    required:true
   },
   is_delete:{
    type:Number,
    required:true
   }
});

module.exports=location;
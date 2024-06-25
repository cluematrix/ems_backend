const { boolean } = require("joi");
const sequelize = require("./config");

const Gallery = sequelize.define('gallerys',{
    vendor_id:{
        type:Number,
        required:true
    },
    event_id:{
        type:String,
        required:true
    },
    images:{
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

module.exports=Gallery;
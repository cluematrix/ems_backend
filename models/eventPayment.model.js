const { boolean } = require("joi");
const sequelize = require("./config");

const eventPayment = sequelize.define('event_payments',{
    event_manage_id:{
        type:Number,
        required:true
    },
    vendor_id:{
        type:Number,
        required:true
    },
    amount:{
        type:String,
        required:true
    },
    discount:{
        type:String,
        required:true
    },
    final_amount:{
       type:String,
       required:true
    },
    advance_amount:{
        type:String,
        required:true
    },
    paid_amount:{
        type:String,
        required:true
    },
    paid_date:{
        type:Date,
        required:true
    },
    remaining_amount:{
        type:String,
        required:true
    },
    pdf_url:{
        type:String,
        required:true
    },
    pdf_name:{
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

module.exports=eventPayment;
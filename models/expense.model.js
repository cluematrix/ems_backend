const { boolean } = require("joi");
const sequelize = require("./config");

const Expense = sequelize.define('expenses',{
    vendor_id:{
        type:Number,
        required:true
    },
    expense_name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    expense_to_whom:{
       type:String,
       required:true
    },
    expense_to_vendor:{
        type:String,
        required:true
     },
     event_manage_id:{
        type:String,
        required:true
     },
    employee_id:{
        type:Number,
        required:true
    },
    remaining_amount:{
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

module.exports=Expense;
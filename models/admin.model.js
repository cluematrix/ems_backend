const { boolean } = require("joi");
const sequelize = require("./config");

const superAdmin = sequelize.define('super_admin',{
   
    company_name: {
        type:String,
        required: true
      },
      company_mob_no: {
        type:String,
        required: true
      },
      company_email: {
        type: String,
        required: true,
        lowercase: true,
      },
      address: {
        type:String,
        required: true
      },
      pincode: {
        type:String,
        required: true
      },
      location_id: {
        type:String,
        required: true
      },
      authorized_person: {
        type:String,
        required: true
      },
      authorized_person_mob_no: {
        type:String,
        required: true
      },
      authorized_person_email: {
        type:String,
        required: true,
        lowercase: true
      },
      password: {
        type:String,
        required: true
      },
      is_delete: {
        type:boolean,
        required: true
      },

      is_active: {
        type:boolean,
        required: true
      },
});




module.exports = superAdmin;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const httpStatus = require("http-status")
require("dotenv").config();
const { superAdmin } = require('../models');

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const domainRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email) && domainRegex.test(email);
  }

  
  const getpassword = async (req,res)=> {
     const password ='12345678';
     const hashedPassword = await bcrypt.hash(password, 10);
    //  console.log (hashedPassword);
     res.status(httpStatus.CREATED).json({ msg: hashedPassword});
  }



const Newadminlogin = async (req,res)=> {
   try {
    const { username, password } = req.body;
    const admin = await superAdmin.findOne({ company_email: username });
    // console.log(admin);
   (admin.company_email!=username) ? res.status(httpStatus.BAD_REQUEST).json({ msg: 'Invalid email or password' }):'';
    
    (admin.is_delete == true) ? res.status(httpStatus.FORBIDDEN).json({ error: 'Your account is deleted' }) : '';
   
    (admin.is_active == false) ? res.status(httpStatus.FORBIDDEN).json({ error: 'Your account is deactive' }) : '';

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    (!isPasswordValid) ?res.status(httpStatus.BAD_REQUEST).json({ msg: 'Invalid email or password' }) : '';
    
    const token = jwt.sign({ adminId: admin.id }, 'Bearar');
    await admin.save();
    (admin) ? res.status(httpStatus.OK).json({ msg: `Welcome ${admin.company_name}`, token: token, data:admin }):res.status(httpStatus.BAD_REQUEST).json({ msg: 'Invalid email or password' });
   }catch(error){
     res.status(httpStatus.INTERNAL_SERVER_ERROR).json({msg:'sertver error'});
   }
  
}


  const loginAdmin = async (req, res) => {
    try {
      const { email, password } = req.body;
      const admin = await AdminModel.findOne({ email: email });
      
      if (!admin) {
        return res.status(httpStatus.BAD_REQUEST).json({ msg: 'Invalid email or password' });
      }
  
      const blockedAdmin = await AdminModel.findOne({ email: email });
      if (blockedAdmin.isBlocked === true) {
        return res.status(httpStatus.FORBIDDEN).json({ error: 'Your account is blocked' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, admin.password);
      if (!isPasswordValid) {
        return res.status(httpStatus.BAD_REQUEST).json({ msg: 'Invalid email or password' });
      }
  
      const token = jwt.sign({ adminId: admin._id }, 'Bearar');
      await admin.save();
      if(admin){
        const role = admin.role;
        if(role === 'doctor'){
          const existingDoctor = await ConsultantModel.find({ _id: admin.refId });
          const Admin = await AdminModel.findOne({ _id: existingDoctor[0].basicDetails.user.toString()  });
          const existingCompany = await CompanySetupModel.find({  _id: Admin.refId.toString() });
          res.status(httpStatus.OK).json({ msg: `Welcome ${admin.name}`, token: token, adminId: admin._id, Email: admin.email, Name: admin.name, role:admin.role, roleId: admin.roleId, login:  existingDoctor[0] , logo:existingCompany[0].hospitalLogo.data, hospitalName:existingCompany[0].hospitalName, mobileNumber:existingCompany[0].mobileNumber, landLineNumber:existingCompany[0].landlineNumber   });
        }else if(role === 'employee'){
          const existingEmployee = await EmployeeModel.find({  _id: admin.refId });
          const Admin = await AdminModel.findOne({ _id: existingEmployee[0].basicDetails.user.toString()  });
          const existingCompany = await CompanySetupModel.find({  _id: Admin.refId.toString() });
          res.status(httpStatus.OK).json({ msg: `Welcome ${admin.name}`, token: token, adminId: admin._id, Email: admin.email, Name: admin.name, role:admin.role, roleId: admin.roleId, login: existingEmployee[0], logo:existingCompany[0].hospitalLogo.data});
        }else if(role === 'admin'){
          const existingCompany = await CompanySetupModel.find({  _id: admin.refId });
          res.status(httpStatus.OK).json({ msg: `Welcome ${admin.name}`, token: token, adminId: admin._id, Email: admin.email, Name: admin.name, role:admin.role, roleId: admin.roleId, login:existingCompany[0]});
        }else{
          res.status(httpStatus.OK).json({ msg: `Welcome ${admin.name}`, token: token, adminId: admin._id, Email: admin.email, Name: admin.name, role:admin.role, roleId: admin.roleId});
        }
      }
    } catch (error) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: 'Server error' });
      console.log(error);
    }
  };
  
  module.exports = {
    getpassword,
    Newadminlogin
    // loginAdmin,
    // getAllAdmin,
    // getAdmin,
    // deleteAdmin,
    // blockAdmin,
    // unblockAdmin,
    // getBlockedAdmin,
  };
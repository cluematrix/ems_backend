const mysql = require('mysql');
require("dotenv").config();
const con= mysql.createConnection({
  host:process.env.HOST,
  user:process.env.DB_USER,
  password:process.env.DB_PASS,
  database:process.env.DB_NAME
});

con.connect((err)=>{
    err ? console.log(err) : console.log('connected');
});
module.exports=con; 
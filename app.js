const express = require('express');
require("dotenv").config();
const cors = require("cors");
const connection = require("./config/config");
const routes = require("./routes")
const path = require('path');
const app = express();
const corsOptions ={
    origin:'*',
    credentials:true, 
    optionSuccessStatus:200,
 }
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);

app.listen(process.env.DEV_PORT, async () => {
    try {
        await connection;
        // console.log("Connected to Mongo Atlas");
        console.log(`Server started on port ${process.env.DEV_PORT}`);
    } catch (err) {
        console.log(err);
        console.log("Couldn't connect to Mongo Atlas");
    }
});
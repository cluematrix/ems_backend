const express = require('express');
require("dotenv").config();
const cors = require("cors");
const connection = require("./config/config");
const routes = require("./routes")
const path = require('path');
const app = express();
const multer = require('multer');
const bodyParser = require('body-parser');
const corsOptions ={
    origin:'*',
    credentials:true, 
    optionSuccessStatus:200,
 }
app.use(cors(corsOptions));
// // for parsing application/json
// app.use(bodyParser.urlencoded({ extended: true }));

// // Parse JSON bodies (as sent by API clients)
// app.use(bodyParser.json());
 


// console.log(1)
// setTimeout(console.log(2), 100);
// setTimeout(console.log(3), 0);
// console.log(4);

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);
// app.use('/images',express.static(path.join(__dirname+"/public", 'images')));
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Destination folder for storing images
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Keep original filename
    }
});
const upload = multer({ storage: storage });

app.use('/images', express.static('images'));

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
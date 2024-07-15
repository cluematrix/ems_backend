const httpStatus = require("http-status");
require("dotenv").config();
const {  Gallery } = require('../models');

// const addGallery = async(req,res)=>{ 
//     try{ 
//          req.body.is_active=1;
//         req.body.image_one = req.files['image_one'] ? req.files['image_one'][0].filename : null;
//         req.body.image_two = req.files['image_two'] ? req.files['image_two'][0].filename : null;
//         req.body.image_three = req.files['image_three'] ? req.files['image_three'][0].filename : null;
//         req.body.image_four = req.files['image_four'] ? req.files['image_four'][0].filename : null;
//         req.body.image_five = req.files['image_five'] ? req.files['image_five'][0].filename : null;
//         req.body.image_six = req.files['image_six'] ? req.files['image_four'][0].filename : null;
//         req.body.image_seven = req.files['image_seven'] ? req.files['image_five'][0].filename : null;
//         console.log(req.body);
//          const vendor=new Gallery(req.body);
//          await vendor.save();
//          res.status(httpStatus.CREATED).json({msg:'Gallery Added Successfully',vendor:req.body});
//     }
//     catch(error){
//         console.error('Error saving vendor data:', error);
//         res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: 'Server error' });
//     }
// }

const addGallery = async (req, res) => { 
    try {
        req.body.is_active = 1;
        const img = req.body.images  = req.files ? req.files.map(file => file.filename) : [];
        img.map(file =>{
            req.body.images	= file;
            const gallery = new Gallery(req.body);
             gallery.save();
        });
        res.status(httpStatus.CREATED).json({ msg: 'Gallery Added Successfully', gallery: req.body });
    } catch (error) {
        console.error('Error saving gallery data:', error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: 'Server error' });
    }
}


const GetGallery = async(req,res)=>{
    try{
        const spkg= await Gallery.findAll({where:{is_delete:false,vendor_id:req.params.id}});
        res.status(httpStatus.OK).json({msg:'Gallery Fetch Successfully',vendor:spkg});
    }catch(error){
        console.error('Error saving vendor data:', error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: 'Server error' });
    }
}

module.exports = {
    addGallery , GetGallery
}
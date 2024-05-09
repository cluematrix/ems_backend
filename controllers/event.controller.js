const httpStatus = require("http-status");
require("dotenv").config();
const {  Events } = require('../models');
const {  eventPackage } = require('../models');


const addEvent = async(req,res)=>{ 
    try{
        const Event=new Events(req.body);
        await Event.save();
        res.status(httpStatus.OK).json({msg:'Event Added Successfully',Event:Event});
    }
    catch(error){
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: 'Server error' });
    }
}


const addEventPkg = async(req,res)=>{ 
    try{
        const Eventpkg=new eventPackage(req.body);
        await Eventpkg.save();
        res.status(httpStatus.OK).json({msg:'Event Added Successfully',EventPackage:Eventpkg});
    }
    catch(error){
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: 'Server error' });
    }
}

const getAllEvent=async(req,res)=>{
    try{
        console.log('ddd');
     const evnt=await Events.findAll({where:{is_delete:false}});
     res.status(httpStatus.OK).json({ data: evnt });
    }catch(error){
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({msg:'server error'});
    }
}

const getAllEventPackage=async(req,res)=>{
    try{




     const evnt=await eventPackage.findAll({where:{is_delete:false}});
     
     await Promise.all(evnt.map(async (obj) => {
        // Split event_id to get event ids
        const evntid = obj.event_id.split('#');
        console.log(evntid);
    
        // Fetch events for each event id
        const evnts = await Events.findAll({ where: { id: evntid } });
        console.log(evnts);
    
        // Add a new key 'newKey' to dataValues property with the fetched events
        obj.dataValues.newKey = evnts;
    }));


    //  evnt.forEach(obj => {
    //     const evntid=(obj.event_id).split('#');
    //     console.log(evntid);
    //     const evnts= Events.findAll({where:{id:evntid}});
    //     console.log(evnts);
    //     obj.dataValues.newKey = evnts; // Adding a new key 'newKey' with value 'newValue'
    // });
    
    
    //     evnt.forEach((e, index) => {
    //     // console.log(evnt[index].event_id);
    //     const evntid=(evnt[index].event_id).split('#');
    //     const evnts= Events.findAll({where:{id:evntid}});
    //     evnt[index].newKey = { ...evnts }; // Creating a new key with the new object for each index
    //   });
      console.log(evnt);

    //  evnt.forEach((e , i) => {
    //     const evntid=(evnt[i].event_id).split('#');
    //     const evnts=  Events.findAll({where:{id:evntid}});
    //     evnt[i]['events']=evnts;
    //     // console.log();
    //     // const ent='fdfsgsfgg';
    //     // e.total_amt='gfhgnhgh'
    //     // console.log(e);
    //   });
    //  forea(var i = 0; i < evnt.length;i++){
        // const evnts=;
            // const evntid=(evnt[i].event_id).split('#');
            // console.log(evntid);
            // const evnts= await Events.findAll({where:{id:evntid}});
            //  console.log(evnts);
            // //  eventlist=evnts;
            // evnt[i].eventlist=evnts;
            // console.log(e);
        // } ;
     res.status(httpStatus.OK).json({ data: evnt });
    }catch(error){
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({msg:'server error'});
    }
}


module.exports = {
    addEvent,addEventPkg,getAllEvent,getAllEventPackage
}
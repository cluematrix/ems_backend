const httpStatus = require("http-status");
require("dotenv").config();
const {  Events } = require('../models');
const {  eventPackage } = require('../models');
const {  eventDate } = require('../models');
const {  Customer } = require('../models');
const {  eventManagement } = require('../models');
const {  eventPayment } = require('../models');
const {  transferEvent } = require('../models');

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
        console.error('Error saving event pkg data:', error);
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
        // Add a new key 'newKey' to dataValues property with the fetched events
        obj.dataValues.newKey = evnts;
    }));
    
    res.status(httpStatus.OK).json({ data: evnt });
    }catch(error){
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({msg:'server error'});
    }
}

const addEventManage=async(req,res)=>{
    try{
   const customer={};  const eventmanageadd = {}; const eventpay = {}; 
   customer.vendor_id=req.body.vendor_id; 
   customer.customer_name=req.body.customer_name; 
   customer.dob=req.body.dob;
   customer.anniversary_date=req.body.anniversary_date;
   customer.mob_no=req.body.mob_no;
   customer.alt_mob_no=req.body.alt_mob_no;
   customer.address=req.body.address;
   customer.pincode=req.body.pincode;
   customer.country_id=req.body.country_id;
   customer.state_id=req.body.state_id;
   customer.city_id=req.body.city_id;
   const customeradd=new Customer(customer);
   await customeradd.save();  //customer add
   const cust_id = customeradd.dataValues.id;
   eventmanageadd.vendor_id=req.body.vendor_id;
   eventmanageadd.event_pkg_id=req.body.event_pkg_id;
   eventmanageadd.customer_id=cust_id;
   eventmanageadd.description=req.body.description;
   eventmanageadd.amount=req.body.amount;
   eventmanageadd.discount=req.body.discount;
   eventmanageadd.final_amount=req.body.final_amount;
   eventmanageadd.advance_amount=req.body.advance_amount;
   eventmanageadd.remaining_amount=req.body.remaining_amount;
   eventmanageadd.event_address=req.body.event_address;
   const evntmng=new eventManagement(eventmanageadd);
   await evntmng.save();  // Event_management
   const event_manage_id = evntmng.dataValues.id;
   const evdates = req.body.event_dates;

  const event_data_array=[];
    // Proceed with using map
   await Promise.all(evdates.map(async (obj) => {
        const edate = {};
         edate.event_manage_id=event_manage_id;
         edate.from_date=obj.from_date;
         edate.to_date=obj.to_date;
         edate.from_time=obj.from_time;
         edate.to_time=obj.to_time;
         edate.remark=obj.remark;
         const evntime=new eventDate(edate);
         await evntime.save();  // Event_management
         event_data_array.push(evntime);
   }));
  
   eventpay.event_manage_id=event_manage_id;
   eventpay.amount=req.body.amount;
   eventpay.discount=req.body.discount;
   eventpay.final_amount=req.body.final_amount;
   eventpay.paid_amount=req.body.advance_amount;
   eventpay.advance_amount=req.body.advance_amount;
   eventpay.remaining_amount=req.body.remaining_amount;
   var cdate = (new Date()).toISOString().split('T')[0];
   eventpay.paid_date=cdate;
   const eventpaynew=new eventPayment(eventpay);
   await eventpaynew.save();  // Event_management

   const data={};
   data.customerdata=customeradd;
   data.eventdata=evntmng;
   data.event_dates=event_data_array;
   data.event_payment=eventpay;
   res.status(httpStatus.OK).json({ msg:"Added Successfully", data: data });
    }
  catch(error){
    console.error('Error saving event pkg data:', error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({msg:'server error'});
  }

}

const geteventofCust= async(req,res)=>{
    try{
        const vendor_id=req.params.id;
        const evnt=await eventManagement.findAll({where:{is_delete:false,vendor_id:vendor_id}});
        await Promise.all(evnt.map(async (obj) => {
            // Split event_id to get event ids
            const cust_id=obj.customer_id;
            const event_manage_id=obj.id;
            const event_pkg_id=obj.event_pkg_id;
            // Fetch events for each event id
            const customer = await Customer.findAll({ where: { id: cust_id } });
            const event_dates = await eventDate.findAll({ where: { event_manage_id: event_manage_id } });
            const event_pkg = await eventPackage.findAll({ where: { id: event_pkg_id } });
            const event_payment = await eventPayment.findAll({ where: { event_manage_id: event_manage_id } });
            // // Add a new key 'newKey' to dataValues property with the fetched events
            obj.dataValues.customerdata = customer;
            obj.dataValues.event_dates = event_dates;
            obj.dataValues.event_pkg = event_pkg;
            obj.dataValues.event_payment = event_payment;
        }));
        res.status(httpStatus.OK).json({ data: evnt });
    }catch(error){
        console.error('Error saving event pkg data:', error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({msg:'server error'});
    }
}

const geteventDates =async(req,res)=>{

    try{
        const evnt=await eventDate.findAll({where:{is_delete:false}});
        res.status(httpStatus.OK).json({ data: evnt });
       }catch(error){
           res.status(httpStatus.INTERNAL_SERVER_ERROR).json({msg:'server error'});
       }

}

const getLastPayment = async(req,res)=>{
    try{
        const lastpay = await eventPayment.findAll({where:{is_delete:false,event_manage_id:req.params.id},
            order: [['id', 'DESC']]});
        res.status(httpStatus.OK).json({data:lastpay});

    }catch(error){
        console.log('getting error-------------'+error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({msg:'server error'});
    }
}

const geteventbydate = async(req,res)=>{
    try{
        const getalldate = await eventDate.findAll({where:{is_delete:false,from_date:req.params.id},attributes:[],
           group:['event_manage_id']});
              const alldatewise = [];
            //   console.log(getalldate);
           await Promise.all(getalldate.map(async (obj) => {
            // Split event_id to get event ids
            const event_manage_id=obj.event_manage_id;
            // Fetch events for each event id
            const eventdata=await eventManagement.findOne({where:{is_delete:false,id:event_manage_id}});
            const cust_id=eventdata.dataValues.customer_id;
            const event_pkg_id=eventdata.dataValues.event_pkg_id;
            const customer = await Customer.findAll({ where: { id: cust_id } });
            const event_dates = await eventDate.findAll({ where: { event_manage_id: event_manage_id } });
            const event_pkg = await eventPackage.findAll({ where: { id: event_pkg_id } });
            const event_payment = await eventPayment.findAll({ where: { event_manage_id: event_manage_id } });
            // // Add a new key 'newKey' to dataValues property with the fetched events
            obj=eventdata;
            obj.dataValues.customerdata = customer;
            obj.dataValues.event_dates = event_dates;
            obj.dataValues.event_pkg = event_pkg;
            obj.dataValues.event_payment = event_payment;
            alldatewise.push(obj)
        }));
        res.status(httpStatus.OK).json({data:alldatewise});

    }catch(error){
        console.log('getting error-------------'+error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({msg:'server error'});
    }
}

const Makepayment = async(req,res)=>{
    try{
        const Event=new eventPayment(req.body);
        await Event.save();
        // const evntup = await eventManagement.findByIdAndUpdate({ id: req.body.event_manage_id }, req.body, { new: true });
          
        const eve = await eventManagement.update({remaining_amount:req.body.remaining_amount} ,{where:{id:req.body.event_manage_id}})

        res.status(httpStatus.OK).json({msg:'Payment Added Successfully',Event:Event});
    }catch(error)
    {
        console.log('error--------'+error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({msg:'Internal sserver error'});
    }
}

const getCustomerEvents= async(req,res)=>{
    try{
   const customer_id=req.params.id;
   const evnt=await eventManagement.findAll({where:{is_delete:false,customer_id:customer_id}});
    await Promise.all(evnt.map(async (obj) => {
        // Split event_id to get event ids
        const event_manage_id=obj.id;
        const event_pkg_id=obj.event_pkg_id;
        // console.log(event_manage_id);
        // Fetch events for each event id
        const customer = await Customer.findAll({ where: { id: customer_id } });
        const event_dates = await eventDate.findAll({ where: { event_manage_id: event_manage_id } });
        const event_pkg = await eventPackage.findAll({ where: { id: event_pkg_id } });
        const event_payment = await eventPayment.findAll({ where: { event_manage_id: event_manage_id } });
        // // Add a new key 'newKey' to dataValues property with the fetched events
        obj.dataValues.customerdata = customer;
        obj.dataValues.event_dates = event_dates;
        obj.dataValues.event_pkg = event_pkg;
        obj.dataValues.event_payment = event_payment;
    }));
    res.status(httpStatus.OK).json({ data: evnt });
}catch(error){
    console.error('Error saving event pkg data:', error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({msg:'server error'});
}
}

const updatePaymentPdfUrl=async(req,res)=>{
    try{
    const eve = await eventPayment.update({pdf_url:req.body.pdf_url,pdf_name:req.body.pdf_name} ,{where:{id:req.body.event_pay_id}})
    res.status(httpStatus.OK).json({ data: eve });
   }catch(error){
    console.error('Error saving event pkg data:', error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({msg:'server error'});
   }
}

const TransferEvent=async(req,res)=>{
    
}

module.exports = {
    addEvent,addEventPkg,getAllEvent,getAllEventPackage,addEventManage,geteventofCust,
    geteventDates,getLastPayment,geteventbydate,Makepayment,getCustomerEvents,updatePaymentPdfUrl
}
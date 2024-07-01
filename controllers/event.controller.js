const httpStatus = require("http-status");
require("dotenv").config();
const {  Events } = require('../models');
const {  eventPackage } = require('../models');
const {  eventDate } = require('../models');
const {  Vendor } = require('../models');
const {  Customer } = require('../models');
const {  eventManagement } = require('../models');
const {  eventPayment } = require('../models');
const {  transferEvent } = require('../models');
const {  Expense } = require('../models');
const {  employee } = require('../models');
const { Op } = require('sequelize');
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
     const evnt=await Events.findAll({where:{is_delete:false,vendor_id:req.params.id}});
     res.status(httpStatus.OK).json({ data: evnt });
    }catch(error){
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({msg:'server error'});
    }
}

const getAllEventPackage=async(req,res)=>{
    try{
     const evnt=await eventPackage.findAll({where:{is_delete:false,vendor_id:req.params.id}});
     await Promise.all(evnt.map(async (obj) => {
        // Split event_id to get event ids
        const evntid = obj.event_id.split('#');
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
   eventpay.vendor_id=req.body.vendor_id; 
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
            const trnsf=await transferEvent.findOne({where:{event_manage_id:event_manage_id,vendor_from:vendor_id}});
            // // Add a new key 'newKey' to dataValues property with the fetched events
            if(trnsf){ obj.dataValues.transfer = 1; }else{obj.dataValues.transfer = 0;}
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
        var evnt=await eventDate.findAll({where:{is_delete:false} ,  include: [{
            model: eventManagement, // The model to join
            required: true, // Inner join, use `false` for left join
            where: {
                vendor_id: req.params.id // Condition on eventManagement table
              }
          }]});
          await Promise.all(evnt.map(async (objss) => {
            objss.dataValues.transfer = 0;
          }));
          var nvct=[];
          const tft=await transferEvent.findAll({where:{is_delete:false,vendor_to:req.params.id}});
          await Promise.all(tft.map(async (obj) => {
                nvct=await eventDate.findAll({where:{is_delete:false,event_manage_id:obj.event_manage_id} ,  include: [{
                    model: eventManagement, // The model to join
                    required: true, // Inner join, use `false` for left join
                    where: {
                        vendor_id: obj.vendor_from // Condition on eventManagement table
                    }
                }]});
          }));
          await Promise.all(nvct.map(async (objs) => {
            objs.dataValues.transfer = 1;
          }));
          if(evnt.length>0 && nvct.length>0){evnt=evnt.concat(nvct);}
          if(evnt.length==0 && nvct.length>0){evnt=nvct;}


        res.status(httpStatus.OK).json({ data: evnt });
       }catch(error){
        console.log('gettting error---'+error);
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
        const getalldate = await eventDate.findAll({where:{is_delete:false,from_date:req.params.date},
           group:['event_manage_id']});
              const alldatewise = [];
            //   console.log(getalldate);
           await Promise.all(getalldate.map(async (obj) => {
            // Split event_id to get event ids
            const event_manage_id=obj.event_manage_id;
            // Fetch events for each event id
            const eventdata=await eventManagement.findOne({where:{is_delete:false,id:event_manage_id,vendor_id:req.params.id}});
            if(eventdata){
            const cust_id=eventdata.dataValues.customer_id;
            const event_pkg_id=eventdata.dataValues.event_pkg_id;
            const customer = await Customer.findAll({ where: { id: cust_id } });
            const event_dates = await eventDate.findAll({ where: { event_manage_id: event_manage_id } });
            const event_pkg = await eventPackage.findAll({ where: { id: event_pkg_id } });
            const event_payment = await eventPayment.findAll({ where: { event_manage_id: event_manage_id } });
            const trnsf=await transferEvent.findOne({where:{event_manage_id:event_manage_id,vendor_from:req.params.id}});
            // // Add a new key 'newKey' to dataValues property with the fetched events
            obj=eventdata;
            obj.dataValues.customerdata = customer;
            obj.dataValues.event_dates = event_dates;
            obj.dataValues.event_pkg = event_pkg;
            if(trnsf){ obj.dataValues.transfer = 1; }else{obj.dataValues.transfer = 0;}
            obj.dataValues.event_payment = event_payment;
            alldatewise.push(obj);
           }
        }));

        if(alldatewise.length!=0){
          res.status(httpStatus.OK).json({data:alldatewise});
        }else
        {
            res.status(httpStatus.OK).json({msg:"No Data Found",data:[]});
        }

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
    try{

        const customeradd=new transferEvent(req.body);
        await customeradd.save();  //customer add
        res.status(httpStatus.OK).json({msg:'Event Transfer Successfully',Transfer:customeradd});
    }catch(error)
    {
        res.send(httpStatus.INTERNAL_SERVER_ERROR).json({msg:'server error'});
    }
    
}

const Exposing=async(req,res)=>{
    try{
           const trnsf=await transferEvent.findAll({where:{is_delete:false,vendor_from:req.params.id}});
            const alldatewise = [];
            await Promise.all(trnsf.map(async (obj) => {
                // Split event_id to get event ids
                const event_manage_id=obj.event_manage_id;
                // Fetch events for each event id
                const eventdata=await eventManagement.findOne({where:{is_delete:false,id:event_manage_id,vendor_id:req.params.id}});
                if(eventdata){
                const cust_id=eventdata.dataValues.customer_id;
                const event_pkg_id=eventdata.dataValues.event_pkg_id;
                const customer = await Customer.findAll({ where: { id: cust_id } });
                const event_dates = await eventDate.findAll({ where: { event_manage_id: event_manage_id } });
                const event_pkg = await eventPackage.findAll({ where: { id: event_pkg_id } });
                const event_payment = await eventPayment.findAll({ where: { event_manage_id: event_manage_id } });
                const exposedfrom = await Vendor.findOne({ where: { id: obj.vendor_from } });
                const exposedto = await Vendor.findOne({ where: { id: obj.vendor_to } });
                const transfer_evnt = await transferEvent.findOne({ where: { id: obj.id } });
                const expense_payment = await Expense.findAll({ where: { event_manage_id: event_manage_id,vendor_id:obj.vendor_from,expense_to_vendor:obj.vendor_to } });
                // // Add a new key 'newKey' to dataValues property with the fetched events
                obj=eventdata;
                obj.dataValues.customerdata = customer;
                obj.dataValues.event_dates = event_dates;
                obj.dataValues.event_pkg = event_pkg;
                obj.dataValues.event_payment = event_payment;
                obj.dataValues.exposed_from = exposedfrom;
                obj.dataValues.exposed_to = exposedto;
                obj.dataValues.transfer_event = transfer_evnt;
                obj.dataValues.expense_payment = expense_payment;
                alldatewise.push(obj)
            }
            }));
            if(alldatewise.length!=0){
            res.status(httpStatus.OK).json({data:alldatewise});
            }else
            {
                res.status(httpStatus.OK).json({msg:"No Data Found",data:[]});
            }
    }
    catch(error)
    {  
        console.log('getting error--'+error);
        res.send(httpStatus.INTERNAL_SERVER_ERROR).json({msg:'server error'});
    }
}

const ExposedTo=async(req,res)=>{
    try{
        const trnsf=await transferEvent.findAll({where:{is_delete:false,vendor_to:req.params.id}});
        const alldatewise = [];
        await Promise.all(trnsf.map(async (obj) => {
             // Split event_id to get event ids
             const event_manage_id=obj.event_manage_id;
             // Fetch events for each event id
             const eventdata=await eventManagement.findOne({where:{is_delete:false,id:event_manage_id,vendor_id:obj.vendor_from}});
             if(eventdata){
             const cust_id=eventdata.dataValues.customer_id;
             const event_pkg_id=eventdata.dataValues.event_pkg_id;
             const customer = await Customer.findAll({ where: { id: cust_id } });
             const event_dates = await eventDate.findAll({ where: { event_manage_id: event_manage_id } });
             const event_pkg = await eventPackage.findAll({ where: { id: event_pkg_id } });
             const event_payment = await eventPayment.findAll({ where: { event_manage_id: event_manage_id } });
             const exposedfrom = await Vendor.findOne({ where: { id: obj.vendor_from } });
             const exposedto = await Vendor.findOne({ where: { id: obj.vendor_to } });
             const transfer_evnt = await transferEvent.findOne({ where: { id: obj.id } });
             const expense_payment = await Expense.findAll({ where: { event_manage_id: event_manage_id,vendor_id:obj.vendor_from,expense_to_vendor:obj.vendor_to } });
             // // Add a new key 'newKey' to dataValues property with the fetched events
             obj=eventdata;
             obj.dataValues.customerdata = customer;
             obj.dataValues.event_dates = event_dates;
             obj.dataValues.event_pkg = event_pkg;
             obj.dataValues.event_payment = event_payment;
             obj.dataValues.exposed_from = exposedfrom;
             obj.dataValues.exposed_to = exposedto;
             obj.dataValues.transfer_event = transfer_evnt;
             obj.dataValues.expense_payment = expense_payment;
             alldatewise.push(obj);
         }
         }));
         if(alldatewise.length!=0){
         res.status(httpStatus.OK).json({data:alldatewise});
         }else
         {
             res.status(httpStatus.OK).json({msg:"No Data Found",data:[]});
         }
 }
 catch(error)
 {  
     console.log('getting error--'+error);
     res.send(httpStatus.INTERNAL_SERVER_ERROR).json({msg:'server error'});
 }
}


const getVendorList=async(req,res)=>{
    try{
        const trnsf=await transferEvent.findAll({where:{is_delete:false,vendor_to:req.params.id}});
         const alldatewise = [];
         await Promise.all(trnsf.map(async (obj) => {
             // Split event_id to get event ids
             const event_manage_id=obj.event_manage_id;
             // Fetch events for each event id
             const eventdata=await eventManagement.findOne({where:{is_delete:false,id:event_manage_id,vendor_id:obj.vendor_from}});
             if(eventdata){
             const cust_id=eventdata.dataValues.customer_id;
             const event_pkg_id=eventdata.dataValues.event_pkg_id;
             const customer = await Customer.findAll({ where: { id: cust_id } });
             const event_dates = await eventDate.findAll({ where: { event_manage_id: event_manage_id } });
             const event_pkg = await eventPackage.findAll({ where: { id: event_pkg_id } });
             const event_payment = await eventPayment.findAll({ where: { event_manage_id: event_manage_id } });
             const exposedfrom = await Vendor.findOne({ where: { id: obj.vendor_from } });
             const exposedto = await Vendor.findOne({ where: { id: obj.vendor_to } });
             const transfer_evnt = await transferEvent.findOne({ where: { id: obj.id } });
             const expense_payment = await Expense.findAll({ where: { event_manage_id: event_manage_id,vendor_id:obj.vendor_from,expense_to_vendor:obj.vendor_to } });
             // // Add a new key 'newKey' to dataValues property with the fetched events
             obj=eventdata;
             obj.dataValues.customerdata = customer;
             obj.dataValues.event_dates = event_dates;
             obj.dataValues.event_pkg = event_pkg;
             obj.dataValues.event_payment = event_payment;
             obj.dataValues.exposed_from = exposedfrom;
             obj.dataValues.exposed_to = exposedto;
             obj.dataValues.transfer_event = transfer_evnt;
             obj.dataValues.expense_payment = expense_payment;
             alldatewise.push(obj);
         }
         }));
         if(alldatewise.length!=0){
         res.status(httpStatus.OK).json({data:alldatewise});
         }else
         {
             res.status(httpStatus.OK).json({msg:"No Data Found",data:[]});
         }
 }
 catch(error)
 {  
     console.log('getting error--'+error);
     res.send(httpStatus.INTERNAL_SERVER_ERROR).json({msg:'server error'});
 }
}

const Getexpense=async(req,res)=>{
     try{
       var vendor_id=req.params.id;
        if(req.params.type=='emp'){
            const expense_to_vendor=0;
            var expense_payment = await Expense.findAll({ where: { vendor_id:vendor_id,expense_to_vendor:expense_to_vendor} });
        }
        else if(req.params.type=='vendor'){
          const employee_id=0;
            var expense_payment = await Expense.findAll({ where: { vendor_id:vendor_id,employee_id:employee_id} });
        }
        
        const alldatewise = [];
        await Promise.all(expense_payment.map(async (obj) => {
             // Split event_id to get event ids
           
             const event_manage_id=obj.event_manage_id;
       
            
             // Fetch events for each event id
             if(event_manage_id!='0'){
              
             const eventdata=await eventManagement.findOne({where:{is_delete:false,id:event_manage_id,vendor_id:obj.vendor_id}});
             if(eventdata){
             const cust_id=eventdata.dataValues.customer_id;
             const customer = await Vendor.findOne({ where: { id: obj.expense_to_vendor } });
             obj.dataValues.vendor = customer;
             obj.dataValues.employee={};
             alldatewise.push(obj);
            }
          }
          if(event_manage_id=='0'){
           
            obj.dataValues.vendor = {};
            const employeev = await employee.findOne({ where: { id: obj.employee_id } });
            obj.dataValues.employee = employeev;
            alldatewise.push(obj);
          }
         }));
         if(alldatewise.length!=0){
            res.status(httpStatus.OK).json({data:alldatewise});
         }else
         {
            res.status(httpStatus.OK).json({msg:"No Data Found",data:[]});
         }
     }catch(error){
        console.log('error-------'+error);
        res.send(httpStatus.INTERNAL_SERVER_ERROR).json({msg:'server error'});
     }
}

 const getAlltotal=async(req,res)=>{
    try{
        console.log(req.body)
        const vendor_id=req.params.id;
        const startDate = req.body.from_date; const toDate = req.body.to_date;
        const startDates = req.body.from_date+' 00:00:00'; const toDates = req.body.to_date+' 23:59:59';;
        var sumOfExpenses = await Expense.sum('amount', { where: { vendor_id: vendor_id,
            createdAt: {
                [Op.between]: [startDates, toDates]
              }
        } });
        var sumOfpayment = await eventPayment.sum('paid_amount', { where: { vendor_id: vendor_id ,
            paid_date: {
                [Op.between]: [startDate, toDate]
              }
        } });
        if(sumOfpayment==null){sumOfpayment=0;}if(sumOfExpenses==null){sumOfExpenses=0;}
        // console.log(sumOfExpenses);
        const getpay  = await eventPayment.findAll( { where: { vendor_id: vendor_id ,
            paid_date: {
                [Op.between]: [startDate, toDate]
              }
         } });
        const alldatewise = [];
        await Promise.all(getpay.map(async (obj) => {
            const event_manage_id=obj.event_manage_id;   
             // Fetch events for each event id
             const eventdata=await eventManagement.findOne({where:{is_delete:false,id:event_manage_id,vendor_id:vendor_id}});
             if(eventdata){
                const cust_id=eventdata.dataValues.customer_id;
                const customer = await Customer.findOne({ where: { id: cust_id } });
                obj.dataValues.customerdata = customer;
                alldatewise.push(obj);
             }
        }));
        const getexp  = await Expense.findAll( { where: { vendor_id: vendor_id , 
            createdAt: {
                [Op.between]: [startDates, toDates]
              }
        } });
        const alldatewises = [];
        await Promise.all(getexp.map(async (objs) => {
            const event_manage_id=objs.event_manage_id;   
            var vendor = await Vendor.findOne({ where: { id: objs.expense_to_vendor } });
                var emp = await employee.findOne({ where: { id: objs.employee_id } });
                if(emp==null){emp={}};if(vendor==null){vendor={}};
                objs.dataValues.vendor = vendor;
                objs.dataValues.employee = emp;  
                alldatewises.push(objs);  
        }));
        const arr={
            'sum_expense':sumOfExpenses,
            'sum_pay':sumOfpayment,
            'get_pay':alldatewise,
            'get_expense':alldatewises
        }
        res.status(httpStatus.OK).json({data:arr});
    }catch(error){
        console.log('error-------'+error);
        res.send(httpStatus.INTERNAL_SERVER_ERROR).json({msg:'server error'});
    }
 }

module.exports = {
    addEvent,addEventPkg,getAllEvent,getAllEventPackage,addEventManage,geteventofCust,
    geteventDates,getLastPayment,geteventbydate,Makepayment,getCustomerEvents,updatePaymentPdfUrl, 
    TransferEvent,Exposing,ExposedTo,getVendorList,Getexpense,getAlltotal
}
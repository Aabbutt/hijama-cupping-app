const express = require('express');
const schedule = require('../models/schedulemodel');


//  create schedule   

const creatschedule =  async(res,req)=> {
  
   
    try {
        const { practitionerid,dayofweek,review,date } =  req.body;
   
         const neweschedule = new schedule(req.body);
         await neweschedule.save();
         res.status(201).json({
           message: "session was created",
           session:{
             patientid: newschedule.patientid , 
             treatmentid : newschedule.treartmentid,
             appointmentid : newschedule.appointmentid,
             sessiondate: newschedule.sessiondate,
             postsession: newschedule.postsession
       
           },
         });
         
       } catch (error) {
         console.error(error);
         res.status(500).json({ error: " session not create " });
       }
};

// get all schedule 


const getallschedule =  async(req , res )=> {
  
    try {
        const result = await schedule.find();
        res.json(result);
    }
    catch(error){
        console.error(error);
        res.status(500).json({error: " schedule not create "});
    }
};


// get schedule by id 

const getschedulebyid =  async(req,res) => {

    try {
        const schedule = req.session;
        res.status(200).json({
          message: "schedule found",
          schedule,
          success : true,
        });
        
       } catch (error) {
          res.status(404).json({error : "session not created"})
       }
};

// update schedule

const updateschedule =  async(req,res) => {

    try { 
        const session = req.body;
        const { practitionerid,dayofweek,review,date }=req.body;
        practitionerid && (schedule.practitionerid = practitionerid );
        dayofweek && (schedule.dayofweek = dayofweek );
        review && ( schedule.review = review);
        date && ( schedule.date = date);

        await session.save();
        res.status(200).json({
          message : 'schedule updated',
          data: session,
          success : true ,
        });
        
      } catch (error) {
        res.status(404).json({error : "session not updated"})
      
      }
   };

   // delete schedule

   const destroyschedule =  async(req,res) => {
    try {
      const id = req.params.id;
      if (!id) {
        return res
          .status(400)
          .json({ message: "schedule id is required", success: false });
      }
      const result = await session.findByIdAndDelete(id);
      res.status(200).json({
        message: "schedule was deleted",
        success: true,
      }); 
      
     } catch (error) {
      return res.status(404).json({
        message: "schedule not found",
        success: false,
      });
    } res.status(500).json({error: " Internal Server error "});
     };

   module.exports =  {  getallschedule , getschedulebyid , destroyschedule , updateschedule , creatschedule } ; 

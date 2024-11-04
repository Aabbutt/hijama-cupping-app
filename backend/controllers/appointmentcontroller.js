const express = require('express');
const appointment = require('../models/appointmentmodel');

//  create appointment   

const creatappointment =   async(req , res )=> {
  
    
    try {
        const { patientid,practitionerid,date,time,status } =  req.body;
   
         const newappointment = new appointment(req.body);
         await newappointment.save();
         res.status(201).json({
           message: "appointment was created",
           appointment:{
            patientid: newappointment.patientid , 
            practitionerid : newappointment.practitionerid,
             appointmentid : newappointment.appointmentid,
             time: newappointment.time,
             status: newappointment.status
       
           },
         });
         
       } catch (error) {
         console.error(error);
         res.status(500).json({ error: " appointment not create " });
       }
   };

// get all appointment 


const getallappointment = async(req , res )=> {
  
    try {
        const result = await appointment.find();
        res.json(result);
    }
    catch(error){
        console.error(error);
        res.status(500).json({error: " appointment not create "});
    }
};


// get appointment by id 

const getappointmentbyid = async(req,res) => {

    try {
        const appointment = req.appointment;
        res.status(200).json({
          message: "appointment found",
          appointment,
          success : true,
        });
        
       } catch (error) {
          res.status(404).json({error : "appointment not created"})
       }
};

// update appointment

const updateappointment =  async(req,res) => {

    try { 
        const appointment = req.body;
        const { patientid,practitionerid,date,time,status }=req.body;
        patientid && (appointment.patientid = patientid );
        practitionerid && (appointment.practitionerid = practitionerid );
        date && ( appointment.date = date);
        time && ( appointment.time = time);
        status && ( appointment.status = status);

        await appointment.save();
        res.status(200).json({
          message : 'appointment updated',
          data: appointment,
          success : true ,
        });
        
      } catch (error) {
        res.status(404).json({error : "appointment not updated"})
      
      }
   };

   //destroy appointment

   const destroyappointment =  async(req,res) => {

    try {
        const id = req.params.id;
        if (!id) {
          return res
            .status(400)
            .json({ message: "appointment id is required", success: false });
        }
        const result = await appointment.findByIdAndDelete(id);
        res.status(200).json({
          message: "appointment was deleted",
          success: true,
        }); 
        
       } catch (error) {
        return res.status(404).json({
          message: "appointment not found",
          success: false,
        });
      } res.status(500).json({error: " Internal Server error "});
       };

   module.exports = { creatappointment , getallappointment , getappointmentbyid , updateappointment , destroyappointment} ; 


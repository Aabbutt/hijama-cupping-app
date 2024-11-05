const express = require('express');
const session = require('../models/sessionmodel');


//  create session   

const creatsession =  async(req , res )=> {
  

    try {
     const { patientid,treatmentid,appointmentid,sessiondate,postsession } =  req.body;

      const newsession = new session(req.body);
      await newsession.save();
      res.status(201).json({
        message: "session was created",
        session:{
          patientid: newsession.patientid , 
          treatmentid : newsession.treatmentid,
          appointmentid : newsession.appointmentid,
          sessiondate: newsession.sessiondate,
          postsession: newsession.postsession
    
        },
      });
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: " session not create " });
    }
};

// get all session 


const getallsession=  async(req , res )=> {
  
    try {
        const result = await session.find();
        res.json(result);
    }
    catch(error){
        console.error(error);
        res.status(500).json({error: " session not create "});
    }
};


// get session by id 

const getsessionbyid =  async(req,res) => {
    try {
        const session = req.session;
        res.status(200).json({
          message: "session found",
          session,
          success : true,
        });
        
       } catch (error) {
          res.status(404).json({error : "session not created"})
       }
};

// update session

const updatesesison =  async(req,res) => {

    try { 
        const session = req.body;
        const { patientid,treatmentid,appointmentid,sessiondate,postsession }=req.body;
        patientid && (session.patientid = patientid );
        treatmentid && (session.treatmentid = treatmentid );
        appointmentid && ( session.appointmentid = appointmentid);
        sessiondate && ( session.sessiondate = sessiondate);
        postsession && ( session.postsession = postsession);

        await session.save();
        res.status(200).json({
          message : 'session updated',
          data: session,
          success : true ,
        });
        
      } catch (error) {
        res.status(404).json({error : "session not updated"})
      
      }
   };

   // delete session

   const destroysession =  async(req,res) => {

    try {
        const id = req.params.id;
        if (!id) {
          return res
            .status(400)
            .json({ message: "session id is required", success: false });
        }
        const result = await session.findByIdAndDelete(id);
        res.status(200).json({
          message: "session was deleted",
          success: true,
        }); 
        
       } catch (error) {
        return res.status(404).json({
          message: "session not found",
          success: false,
        });
      } res.status(500).json({error: " Internal Server error "});
       };
   

   module.exports = { creatsession , 
   updatesesison , getallsession , getsessionbyid , destroysession }; 

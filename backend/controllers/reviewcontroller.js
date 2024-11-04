const express = require('express');
const review = require('../models/reviewmodel');

//  create review   

const creatreview =   async(req , res )=> {
  
    try {
        const { patientid,practitionerid,rating,reviews,date } =  req.body;
   
         const newreview = new review(req.body);
         await newreview.save();
         res.status(201).json({
           message: "review was created",
           review:{
            patientid: newreview.patientid , 
            practitionerid : newreview.practitionerid,
            rating : newreview.rating,
            reviews: newreview.reviews,
            date: newreview.date
       
           },
         });
         
       } catch (error) {
         console.error(error);
         res.status(500).json({ error: " review not create " });
       }
   };

// get all review 


const getallreview =   async(req , res )=> {
  
    try {
        const result = await review.find();
        res.json(result);
    }
    catch(error){
        console.error(error);
        res.status(500).json({error: " review not create "});
    }
};


// get review by id 

const getreviewbyid =   async(req,res) => {
    try {
        const review = req.review;
        res.status(200).json({
          message: "review found",
          review,
          success : true,
        });
        
       } catch (error) {
          res.status(404).json({error : "review not created"})
       }
};

// update review

const updatereview =   async(req,res) => {

    try { 
        const review = req.body;
        const { patientid,practitionerid,rating,reviews,date }=req.body;
        patientid && (review.patientid = patientid );
        practitionerid && (review.practitionerid = practitionerid );
        rating && ( review.rating = rating);
        reviews && ( review.reviews = reviews);
        date && ( review.date = date);

        await review.save();
        res.status(200).json({
          message : 'review updated',
          data: review,
          success : true ,
        });
        
      } catch (error) {
        res.status(404).json({error : "review not updated"})
      
      }
   };

   // delete review

   const destroyreview =   async(req,res) => {

    try {
        const id = req.params.id;
        if (!id) {
          return res
            .status(400)
            .json({ message: "review id is required", success: false });
        }
        const result = await review.findByIdAndDelete(id);
        res.status(200).json({
          message: "review was deleted",
          success: true,
        }); 
        
       } catch (error) {
        return res.status(404).json({
          message: "review not found",
          success: false,
        });
      } res.status(500).json({error: " Internal Server error "});
       };

   module.exports = {  creatreview , getallreview , getreviewbyid , updatereview , destroyreview} ; 

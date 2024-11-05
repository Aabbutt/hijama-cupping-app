const express = require('express');
const invoice = require('../models/invoicemodel');


//  create invoice   

const creatinvoice =  async(req , res )=> {
    try {
        const { appointmentid,amount,status,payementmethod,invoicedate } =  req.body;
   
         const newinvoice = new invoice(req.body);
         await newinvoice.save();
         res.status(201).json({
           message: "invoice was created",
           invoice:{
            appointmentid: newinvoice.appointmentid , 
            amount : newinvoice.amount,
            status : newinvoice.status,
            payementmethod: newinvoice.payementmethod,
            invoicedate: newinvoice.invoicedate
       
           },
         });
         
       } catch (error) {
         console.error(error);
         res.status(500).json({ error: " invoice not create " });
       }
   };

// get all invoice 


const getallinvoice =  async(req , res )=> {
  
    try {
        const result = await invoice.find();
        res.json(result);
    }
    catch(error){
        console.error(error);
        res.status(500).json({error: " invoice not create "});
    }
};


// get invoice by id 

const getinvoicebyid =  async(req,res) => {
    try {
        const invoice = req.review;
        res.status(200).json({
          message: "review found",
          review,
          success : true,
        });
        
       } catch (error) {
          res.status(404).json({error : "review not created"})
       }
};

// update invoice

const updateinvoice =  async(req,res) => {

    try { 
        const invoice = req.body;
        const { appointmentid,amount,status,payementmethod,invoicedate }=req.body;
        appointmentid && (invoice.appointmentid = appointmentid );
        amount && (invoice.amount = amount );
        status && ( invoice.status = status);
        payementmethod && ( invoice.payementmethod = payementmethod);
        invoicedate && ( invoice.invoicedate = invoicedate);

        await invoice.save();
        res.status(200).json({
          message : 'invoice updated',
          data: invoice,
          success : true ,
        });
        
      } catch (error) {
        res.status(404).json({error : "invoice not updated"})
      
      }
   };
   
    // delete invoice
   const destroyinvoice =  async(req,res) => {

    try {
        const id = req.params.id;
        if (!id) {
          return res
            .status(400)
            .json({ message: "invoice id is required", success: false });
        }
        const result = await invoice.findByIdAndDelete(id);
        res.status(200).json({
          message: "invoice was deleted",
          success: true,
        }); 
        
       } catch (error) {
        return res.status(404).json({
          message: "invoice not found",
          success: false,
        });
      } res.status(500).json({error: " Internal Server error "});
       };

   module.exports = { creatinvoice , getallinvoice , getinvoicebyid , updateinvoice , destroyinvoice } ; 

const express = require('express');
const inventory = require('../models/inventorymodel');


//  create inventory   

const createinventory =  async(req , res )=> {
  
    
    try {
        const { kitname,discription,quantity,practitionerid } =  req.body;
   
         const newinventory = new inventory(req.body);
         await newinventory.save();
         res.status(201).json({
           message: "inventory was created",
           inventory:{
            kitname: newinventory.kitname , 
            discription : newinventory.discription,
            quantity : newinventory.quantity,
            practitionerid: newinventory.practitionerid
       
           },
         });
         
       } catch (error) {
         console.error(error);
         res.status(500).json({ error: " inventory not create " });
       }
   };

// get all inventory 


const getallinventory =  async(req , res )=> {
  
    try {
        const result = await inventory.find();
        res.json(result);
    }
    catch(error){
        console.error(error);
        res.status(500).json({error: " inventory not create "});
    }
};


// get inventory by id 

const getinventorybyid =   async(req,res) => {
    try {
        const inventory = req.inventory;
        res.status(200).json({
          message: "inventory found",
          inventory,
          success : true,
        })
        .populate("practitionerid");
        res.json(inventory);
       } catch (error) {
          res.status(404).json({error : "inventory not created"})
       }
};

// update inventory

const updateinventory =   async(req,res) => {

    try { 
        const inventory = req.body;
        const { kitname,discription,quantity,practitionerid }=req.body;
        kitname && (inventory.kitname = kitname );
        discription && (inventory.discription = discription );
        quantity && ( inventory.quantity = quantity);
        practitionerid && ( inventory.practitionerid = practitionerid);

        await inventory.save();
        res.status(200).json({
          message : 'inventory updated',
          data: inventory,
          success : true ,
        });
        
      } catch (error) {
        res.status(404).json({error : "inventory not updated"})
      
      }
   };
   //delete inventory

   const destroyinventory =   async(req,res) => {

    try {
        const id = req.params.id;
        if (!id) {
          return res
            .status(400)
            .json({ message: "inventory id is required", success: false });
        }
        const result = await inventory.findByIdAndDelete(id);
        res.status(200).json({
          message: "inventory was deleted",
          success: true,
        }); 
        
       } catch (error) {
        return res.status(404).json({
          message: "inventory not found",
          success: false,
        });
      } res.status(500).json({error: " Internal Server error "});
       };
   

   module.exports = { createinventory , getallinventory , getinventorybyid , updateinventory , destroyinventory} ; 

const express = require("express");
const treatment = require("../models/treatmentmodel");

//  create treatement

const createtreatment = async (req, res) => {
const { id, price , treartmentname } =  req.body;

try {
  const newtreatment = new treatment(req.body);
  await newtreatment.save();
  res.status(201).json({
    message: "treatment was created",
    treatment:{
      id: newtreatment.id , 
      price : newtreatment.price,
      treartmentname : newtreatment.treartmentname

    },
  });
  
} catch (error) {
  console.error(error);
  res.status(500).json({ error: " treatment not create " });
}
};


const getallttreatment = async (req, res) => {
  try {
    const result = await treatment.find();
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: " treatment not create " });
  }
};

// get treatment by id

const gettreatmentbyid = async (req, res) => {
 try {
  const treatement = req.treatement;
  res.status(200).json({
    message: "treatement found",
    treatement,
    success : true,
  });
  
 } catch (error) {
    res.status(404).json({error : "treatment not created"})
 }
};

// update treatment

const updatetreatment = async (req, res) => {
try { 
  const treatment = req.body;
  const { id ,price , treartmentname }=req.body;
  id && (treatment.id = id );
  price && (treatment.price = price );
  treartmentname && ( treatment.treartmentname = treartmentname);
  await treatment.save();
  res.status(200).json({
    message : 'treatment updated',
    data: treatment,
    success : true ,
  });
  
} catch (error) {
  res.status(404).json({error : "treatment not updated"})

}
};

// delete treatement

const destroytreatment = async (req, res) => {
 try {
  const id = req.params.id;
  if (!id) {
    return res
      .status(400)
      .json({ message: "treatment id is required", success: false });
  }
  const result = await treatment.findByIdAndDelete(id);
  res.status(200).json({
    message: "treatment was deleted",
    success: true,
  }); 
  
 } catch (error) {
  return res.status(404).json({
    message: "treatment not found",
    success: false,
  });
}
 };


module.exports = {
  createtreatment,
  updatetreatment,
  getallttreatment,
  gettreatmentbyid,
  destroytreatment,
};

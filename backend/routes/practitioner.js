// routes/practitioner.js
const express = require('express');
const multer = require('multer');
const Practitioner = require('../models/Practitioner');
const router = express.Router();

// Multer setup for document upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Save documents to 'uploads' directory
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// POST route to add a new practitioner
router.post('/', upload.single('uploadDocuments'), async (req, res) => {
    try {
        const practitioner = new Practitioner({
            fullName: req.body.fullName,
            mobileNumber: req.body.mobileNumber,
            emailAddress: req.body.emailAddress,
            dateOfBirth: req.body.dateOfBirth,
            education: req.body.education,
            agreeTerms: req.body.agreeTerms === 'true',
            uploadDocuments: req.file.path // Path to the uploaded document
        });
        const savedPractitioner = await practitioner.save();
        res.status(201).json(savedPractitioner);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// GET route to fetch all practitioners
router.get('/', async (req, res) => {
    try {
        const practitioners = await Practitioner.find();
        res.json(practitioners);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;

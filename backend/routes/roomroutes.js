const express = require('express');
const router = express.Router();
const roomcontroller = require('../controllers/roomcontroller');
// Route to create a new room schedule
router.get('/', async (req, res) => {
    try {
        const practitioners = await Practitioner.find();
        res.json(practitioners);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;


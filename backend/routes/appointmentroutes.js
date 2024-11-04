const express = require ('express');
const router = express.Router();
const appointmentcontroller = require('../controllers/appointmentcontroller');

router.get('/' , appointmentcontroller.getallappointment)  // all appointments 

router.post('/appointment', appointmentcontroller.creatappointment);  // create appointment

router.get('/appointment/:id' , appointmentcontroller.getallappointment); // get appointment by id 

router.put ('/appointment/: id' , appointmentcontroller.updateappointment); // update appointment 

router.delete('/appointment/: id' , appointmentcontroller.destroyappointment); // delete appointment

module.exports = router ;

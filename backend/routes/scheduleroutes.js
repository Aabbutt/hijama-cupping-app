const express = require ('express');
const router = express.Router();
const schedulecontroller = require('../controllers/schedulecontroller');

router.get('/' , schedulecontroller.getallschedule)  // all users 

router.post('/schedule', schedulecontroller.creatschedule);  // create schedule

router.get('/schedule/:id' , schedulecontroller.getschedulebyid); // get schedule by id 

router.put ('/schedule/: id' , schedulecontroller.updateschedule); // update schedule 

router.delete('/schedule/: id' , schedulecontroller.destroyschedule); // delete schedule

module.exports = router ;

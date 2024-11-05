const express = require ('express');
const router = express.Router();
const treatmentcontroller = require('../controllers/treatmentcontroller');

router.get('/' , treatmentcontroller.getallttreatment)  // all treatments 

router.post('/treatment', treatmentcontroller.createtreatment);  // create treatment

router.get('/treatment/:id' , treatmentcontroller.gettreatmentbyid); // get treatment by id 

router.put ('/treatment/: id' , treatmentcontroller.updatetreatment); // update treatment 

router.delete('/treatment/: id' , treatmentcontroller.destroytreatment); // delete treatment

module.exports = router ;

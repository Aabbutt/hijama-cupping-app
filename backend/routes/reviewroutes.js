const express = require ('express');
const router = express.Router();
const reviewcontroller = require('../controllers/reviewcontroller');

router.get('/' , reviewcontroller.getallreview)  // all reviews 

router.post('/review', reviewcontroller.creatreview);  // create review

router.get('/review/:id' , reviewcontroller.getreviewbyid); // get review by id 

router.put ('/review/: id' , reviewcontroller.updatereview); // update review 

router.delete('/review/: id' , reviewcontroller.destroyreview); // delete review

module.exports = router ;

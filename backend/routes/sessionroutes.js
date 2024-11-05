const express = require ('express');
const router = express.Router();
const sessioncontroller = require('../controllers/sessioncontroller');

router.get('/' , sessioncontroller.getallsession)  // all sessions 

router.post('/session', sessioncontroller.creatsession);  // create session

router.get('/session/:id' , sessioncontroller.getsessionbyid); // get session by id 

router.put ('/session/: id' , sessioncontroller.updatesesison); // update session 

router.delete('/session/: id' , sessioncontroller.destroysession); // delete session

module.exports = router ;

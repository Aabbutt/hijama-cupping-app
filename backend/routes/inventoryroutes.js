const express = require ('express');
const router = express.Router();
const inventorycontroller = require('../controllers/inventorycontroller');

router.get('/' , inventorycontroller.getallinventory)  // all users 

router.post('/inventory', inventorycontroller.createinventory);  // create inventory

router.get('/inventory/:id' , inventorycontroller.getinventorybyid); // get inventory by id 

router.put ('/inventory/: id' , inventorycontroller.updateinventory); // update inventory 

router.delete('/inventory/: id' , inventorycontroller.destroyinventory); // delete inventory

module.exports = router ;

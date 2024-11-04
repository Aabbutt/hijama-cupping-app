const express = require ('express');
const router = express.Router();
const invoicecontroller = require('../controllers/invoicecontroller');

router.get('/' , invoicecontroller.getallinvoice)  // all invoices 

router.post('/invoice', invoicecontroller.creatinvoice);  // create invoice

router.get('/invoice/:id' , invoicecontroller.getinvoicebyid); // get invoice by id 

router.put ('/invoice/: id' , invoicecontroller.updateinvoice); // update invoice 

router.delete('/invoice/: id' , invoicecontroller.destroyinvoice); // delete invoice

module.exports = router ;

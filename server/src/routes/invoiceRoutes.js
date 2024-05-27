const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');
const authenticate = require('../middlewares/authMiddleware');

router.post('/createinvoice',authenticate, invoiceController.postInvoice);
router.put('/updateinvoice/:id', invoiceController.updateInvoice);
router.get('/getinvoices',authenticate, invoiceController.getInvoices);
router.get('/:id',authenticate, invoiceController.getInvoicebyId);
module.exports = router;

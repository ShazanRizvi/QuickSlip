const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');
//const authenticate = require('../middlewares/authMiddleware');
const authenticateToken = require('../middlewares/authenticatejwt');  


router.post('/createinvoice',authenticateToken, invoiceController.postInvoice);
router.put('/updateinvoice/:id', authenticateToken, invoiceController.updateInvoice);
router.get('/getinvoices',authenticateToken, invoiceController.getInvoices);
router.get('/:id',authenticateToken, invoiceController.getInvoicebyId);
router.delete('/deleteinvoice/:id',authenticateToken, invoiceController.deleteInvoice);

module.exports = router;

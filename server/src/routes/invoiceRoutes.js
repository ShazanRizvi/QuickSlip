const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');
const authenticate = require('../middlewares/authMiddleware');

router.post('/saveinvoices', invoiceController.postInvoice);
router.put('/:id', invoiceController.updateInvoice);
router.get('/getinvoices',authenticate, invoiceController.getInvoices);
module.exports = router;

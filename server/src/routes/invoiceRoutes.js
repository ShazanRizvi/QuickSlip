const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');

router.post('/', invoiceController.postInvoice);
router.put('/:id', invoiceController.updateInvoice);

module.exports = router;

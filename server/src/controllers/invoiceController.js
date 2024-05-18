const invoiceService = require('../services/invoiceService');

const postInvoice = async (req, res) => {
    try {
        const invoice = await invoiceService.createInvoice(req.body);
        res.status(201).json(invoice);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateInvoice = async (req, res) => {
    try {
        const invoice = await invoiceService.updateInvoice(req.params.id, req.body);
        res.status(200).json(invoice);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getInvoices = async (req, res) => {
    try {
        const invoices = await invoiceService.getInvoices();
        res.status(200).json(invoices);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    postInvoice,
    updateInvoice,
    getInvoices
};


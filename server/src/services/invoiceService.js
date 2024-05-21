const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createInvoice = async (invoiceData, req, res) => {
  console.log("req",req)
  const {
    invoice_number,
    company_name,
    company_address,
    bill_to,
    items,
    invoice_date,
    due_date,
    sub_total,
    tax_rate,
    total,
    notes,
  } = invoiceData;
  try {
    const invoice = await prisma.invoice.create({
      data:{
      invoice_number:invoice_number,
      user_id:req.user.id,
      company_name:company_name,
      company_address:company_address,
      bill_to:bill_to,
      items:items,
      invoice_date:invoice_date,
      due_date:due_date,
      sub_total:sub_total,
      tax_rate:tax_rate,
      total:total,
      notes:notes,
      }
    });
    return invoice;
  } catch (error) {
    throw error;
  }
};

const updateInvoice = async (id, invoiceData) => {
  const {
    invoice_number,
    company_name,
    company_address,
    bill_to,
    items,
    invoice_date,
    due_date,
    sub_total,
    tax_rate,
    total,
    notes,
  } = invoiceData;
  try {
    const invoice = await prisma.invoice.update({
      where: { id },
      data:{
        invoice_number:invoice_number,
        company_name:company_name,
        company_address:company_address,
        bill_to:bill_to,
        items:items,
        invoice_date:invoice_date,
        due_date:due_date,
        sub_total:sub_total,
        tax_rate:tax_rate,
        total:total,
        notes:notes,
        },
    });
    return invoice;
  } catch (error) {
    throw error;
  }
};
const getInvoices = async (req, res) => {
  try {
    const userId = req.user.id;
    const invoices = await prisma.invoice.findMany({
      where: {
        user_id:userId,
      },
    });
    return invoices;
  } catch (error) {
    throw error;
  }

}

module.exports = {
  createInvoice,
  updateInvoice,
  getInvoices
  // Add more methods as needed
};

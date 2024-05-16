const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createInvoice = async (invoiceData) => {
  try {
    const invoice = await prisma.invoice.create({
      data: invoiceData,
    });
    return invoice;
  } catch (error) {
    throw error;
  }
};

const updateInvoice = async (id, invoiceData) => {
  try {
    const invoice = await prisma.invoice.update({
      where: { id },
      data: invoiceData,
    });
    return invoice;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createInvoice,
  updateInvoice,
  // Add more methods as needed
};

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const path = require("path");
const PdfPrinter = require("pdfmake");
const fs = require("fs");
const InvoiceSchema = require("../helpers/invoiceSchema");
const { PassThrough } = require('stream');
const { bucket } = require('../../firebase');
const moment = require('moment');
// Check if font files exist
// Object.entries(fonts.IBMPlexSans).forEach(([style, filePath]) => {
//   const fullPath = path.resolve(__dirname, filePath);
//   try {
//       fs.accessSync(fullPath, fs.constants.F_OK);
//       console.log(`${style}: ${fullPath} exists`);
//   } catch (err) {
//       console.error(`${style}: ${fullPath} does not exist`);
//   }
// });


const createInvoice = async (invoiceData, req, res, user) => {
  //console.log("req",req)
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
      data: {
        invoice_number: invoice_number,
        user_id: req.user.userId,
        company_name: company_name,
        company_address: company_address,
        bill_to: bill_to,
        items: items,
        invoice_date: invoice_date,
        due_date: due_date,
        sub_total: sub_total,
        tax_rate: tax_rate,
        total: total,
        notes: notes,
      },
    });
    return { invoice, message: "Invoice created successfully" };
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
      data: {
        invoice_number: invoice_number,
        company_name: company_name,
        company_address: company_address,
        bill_to: bill_to,
        items: items,
        invoice_date: invoice_date,
        due_date: due_date,
        sub_total: sub_total,
        tax_rate: tax_rate,
        total: total,
        notes: notes,
      },
    });
    return { invoice, message: "Invoice updated successfully" };
  } catch (error) {
    throw error;
  }
};
const getInvoices = async (req, res) => {
  try {
    const userId = req.user.userId;
    const invoices = await prisma.invoice.findMany({
      where: {
        user_id: userId,
      },
    });
    return invoices;
  } catch (error) {
    throw error;
  }
};
const getInvoicebyId = async (id) => {
  try {
    const invoice = await prisma.invoice.findUnique({
      where: { id },
    });
    return invoice;
  } catch (error) {
    throw error;
  }
};
const deleteInvoice = async (id) => {
  try {
    const deletedInvoice = await prisma.invoice.delete({
      where: { id },
    });
    return deletedInvoice;
  } catch (error) {
    throw error;
  }
};
const fonts = {
  Roboto: {
    normal: path.join(__dirname, "../Fonts/Roboto-Regular.ttf"),
    bold: path.join(__dirname, "../Fonts/Roboto-Bold.ttf"),
    italics: path.join(__dirname, "../Fonts/Roboto-Italic.ttf"),
    bolditalics: path.join(__dirname, "../Fonts/Roboto-BoldItalic.ttf"),
  },
  IBMPlexSans: {
    normal: "../Fonts/IBMPlexSans-Regular.ttf",
    bold: "../Fonts/IBMPlexSans-Bold.ttf",
    italics: "../Fonts/IBMPlexSans-Italic.ttf",
    bolditalics: "../Fonts/IBMPlexSans-BoldItalic.ttf",
  },
};

const generateInvoice = async (id) => {
  const printer = new PdfPrinter(fonts);
  //console.log("fonts", fonts);
  
  const invoiceData = await prisma.invoice.findUnique({
    where: { id },
  });
  //console.log("invoiceData", invoiceData);

  const docDefinition = InvoiceSchema(invoiceData);
  const pdfDoc = printer.createPdfKitDocument(docDefinition);
  const passThrough= new PassThrough();
  pdfDoc.pipe(passThrough);
  
  const fileName = `invoices/invoice_${invoiceData.invoice_number}_${Date.now()}.pdf`;

  const file = bucket.file(fileName);

  const stream = file.createWriteStream({
    metadata: {
      contentType: 'application/pdf',
    }
  });
  return new Promise((resolve, reject) => {
    stream.on('error', (err) => {
      reject({ error: "Failed to upload file", details: err });
    });

    stream.on('finish', async () => {
      try {
        const [url] = await file.getSignedUrl({
          action: 'read',
          expires: '03-09-2491'
        });
        const updatedInvoice = await prisma.invoice.update({
          where: {
            id: invoiceData.id,
          },
          data: {
            download_url: url,
          },
        });
        resolve({ data: { message: "File uploaded successfully.", url: url, invoice: updatedInvoice } });
      } catch (error) {
        reject({ error: "Failed to get download link", details: error });
      }
    });
    passThrough.pipe(stream);
    pdfDoc.end();
  });
};

module.exports = {
  createInvoice,
  updateInvoice,
  generateInvoice,
  getInvoices,
  getInvoicebyId,
  deleteInvoice,
  // Add more methods as needed
};

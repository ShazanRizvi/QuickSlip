const InvoiceSchema = (invoiceData) => {

  const items = invoiceData.items.map(item => [
    { text: item.item, alignment: 'left' },
    { text: `₹${item.rate}`, alignment: 'right' },
    { text: item.quantity, alignment: 'center' },
    { text: `₹${item.amount}`, alignment: 'right' },
  ]);
  return {
    pageSize: 'A4',
    pageMargins: [40, 60, 40, 60], // Adjusted for a uniform margin around the page
    content: [
      { text: `${invoiceData.company_name}`, alignment: "center", fontSize: 20, bold: true, margin: [0, 0, 0, 10] },
      { text: `TAX INVOICE ${invoiceData.invoice_number}`, alignment: "center", fontSize: 15, bold: true, margin: [0, 0, 0, 20] },
      {
        columns: [
          { width: '*', text: `${invoiceData.company_address}`, alignment: "left" },
          { width: '*', text: `${invoiceData.bill_to}`, alignment: "right" },
        ],
        columnGap: 10
      },
      { text: ' ', margin: [0, 10, 0, 10] }, // spacer
      {
        style: "tableExample",
        table: {
          headerRows: 1,
          widths: ['*', 100, 50, 100],
          body: [
            [
              { text: 'ITEM', style: 'tableHeader', alignment: 'left' },
              { text: 'RATE', style: 'tableHeader', alignment: 'right' },
              { text: 'QTY', style: 'tableHeader', alignment: 'center' },
              { text: 'AMOUNT', style: 'tableHeader', alignment: 'right' }
            ],
            ...items,
            [{ text: 'SubTotal', colSpan: 3, alignment: 'right' }, {}, {}, { text: `₹${invoiceData.sub_total}`, alignment: 'right' }],
            [{ text: 'Tax', colSpan: 3, alignment: 'right' }, {}, {}, { text: `₹${invoiceData.tax_rate|| '0'}`, alignment: 'right' }],
            [{ text: 'Total', colSpan: 3, alignment: 'right', bold: true }, {}, {}, { text: `₹${invoiceData.total}`, alignment: 'right', bold: true }]
          ],
        },
        layout: {
          defaultBorder: true,
          paddingLeft: function(i, node) { return 10; },
          paddingRight: function(i, node) { return 10; },
          paddingTop: function(i, node) { return 5; },
          paddingBottom: function(i, node) { return 5; },
          fillColor: function(rowIndex, node, columnIndex) { return rowIndex === 0 ? '#f2f2f2' : null; },
        }
      },
      { text: 'Notes', style: 'header', margin: [0, 20, 0, 5] },
      { text: `${invoiceData.notes || 'Invoice Details'}`, alignment: 'left' },
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10], // left, top, right, bottom
      },
      tableHeader: {
        bold: true,
        fontSize: 12,
        color: 'black'
      },
      tableExample: {
        margin: [0, 5, 0, 15],
      },
      defaultStyle: {
        font: "Helvetica", // More standard for invoice presentation
      },
    },
  };
  }
//     content: [
//       { columns: [
//         { text: `${invoiceData.company_name}`, header:"true", alignment: "left", fontSize: 30, bold: true },
//         { text: "TAX INVOICE",header:"true", alignment: "right", fontSize: 30, bold: true  },
//       ], },
//       {
//         columns: [
//           { text: "Your Company Name", bold: true },
//           { text: "Client Company", alignment: "right" },
//         ],
//       },
//       {
//         columns: [
//           { text: "123 Your Street, Your City" },
//           { text: "321 Client Street, Client City", alignment: "right" },
//         ],
//       },
//       {
//         style: "tableExample",
//         table: {
//           widths: ["*", "auto", 100, "*"],
//           body: [
//             ["Description", "Quantity", "Unit Price", "Total"],
//             ["Service 1", "2", "$100", "$200"],
//             ["Service 2", "3", "$150", "$450"],
//             ["Subtotal", "", "", "$650"],
//             ["Tax", "", "", "$50"],
//             ["Total Due", "", "", "$700"],
//           ],
//         },
//         layout: "lightHorizontalLines",
//       },
//       { text: "Terms and Conditions", style: "header" },
//       { text: "Payment is due within 15 days", italics: true },
//     ],
//     styles: {
//       header: {
//         fontSize: 18,
//         bold: true,
//         margin: [0, 0, 0, 10], // left, top, right, bottom
//       },
//       tableExample: {
//         margin: [0, 5, 0, 15],
//       },
//       defaultStyle: {
//         font: "IBMPlexSans", // Sets this font as the default for the whole document
//       },
//     },
//   };
// };
module.exports = InvoiceSchema;

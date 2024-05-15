import * as Yup from 'yup';

const invoiceSchema = Yup.object().shape({
  invoiceNumber: Yup.string()
    .required('Invoice number is required'),
  companyAddress: Yup.string()
    .required('Company address is required'),
  billTo: Yup.string()
    .required('Billing address is required'),
  dateIssued: Yup.date()
    .required('Date issued is required')
    .nullable(),
  dueDate: Yup.date()
    .required('Due date is required')
    .nullable()
    .min(
      Yup.ref('dateIssued'),
      'Due date cannot be earlier than the issue date'
    ),
  items: Yup.array()
    .of(
      Yup.object().shape({
        item: Yup.string().required('Item Name is required'),
        rate: Yup.number()
          .required('Rate is required')
          .positive('Rate must be positive'),
        quantity: Yup.number()
          .required('Quantity is required')
          .positive('Quantity must be greater than zero'),
        amount: Yup.number()
          .required('Amount is required')
          .positive('Amount must be positive'),
      })
    ),
  subtotal: Yup.number().required('Subtotal is required'),
  taxRate: Yup.number()
    .required('Tax rate is required')
    .min(0, 'Tax rate cannot be negative'),
  discount: Yup.number()
    .required('Discount is required')
    .min(0, 'Discount cannot be negative'),
  total: Yup.number().required('Total is required'),
});

export default invoiceSchema;

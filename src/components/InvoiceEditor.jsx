import React from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import FormikInput from "./customComponents/FormikInput";
import FormikDatePicker from "./customComponents/FormikDatePicker";
import FormikTextArea from "./customComponents/FormikTextarea";
import FormikFilePicker from "./customComponents/FileInput";
import { Separator } from "./ui/separator";
import { RxCross2 } from "react-icons/rx";
import { TbEyeDotted } from "react-icons/tb";
import { HiMiniPlus } from "react-icons/hi2";

const InvoiceEditor = ({onUpdate}) => {
  const locale = 'en-US'; 
  const options = {  weekday: "short",
  year: "numeric",
  month: "short",
  day: "numeric", };

  // Create date strings for today and a date 30 days from today
  const today = new Date();
  const thirtyDaysLater = new Date(today.getTime() + (30 * 24 * 60 * 60 * 1000));
  
  
  const calculateLineAmount = (rate, quantity) =>
    parseFloat(rate) * parseInt(quantity, 10);

  const calculateTotal = (items, taxRate, discount) => {
    const subtotal = items.reduce(
      (acc, item) => acc + calculateLineAmount(item.rate, item.quantity),
      0
    );
    const tax = (subtotal * taxRate) / 100;
    const total = subtotal + tax - discount;
    return { subtotal, tax, total };
  };
  
  return (
    <Formik
      initialValues={{
        invoiceNumber: "",
        companyAddress: "",
        billTo: "",
        dateIssued: today.toLocaleDateString(locale, options),
        dueDate: thirtyDaysLater.toLocaleDateString(locale, options),
        items: [{ item: "", rate: 0, quantity: 0, amount: 0 }],
        subtotal: 0,
        taxRate: 5, // 5% tax rate for example
        discount: 0,
        total: 0,
      }}
      onSubmit={(values) => {
         console.log("Submitting form", values);
      }}
      onChange={(values) => {
        onUpdate(values);
      }}
    >
      {({ values, setFieldValue, handleChange }) => (
        <Form className="p-2">
          <div className="w-full flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold dark:text-white">Invoice Editor</h1>
            <Button
              variant="default"
              onClick={() => onUpdate(values)}
              className="mt-4 mb-4 p-2 gap-2 "
            >
              <TbEyeDotted size={20} />
              Preview
            </Button>
          </div>
          {/* div1 */}
          <div className="flex gap-2 justify-between">
            <div className="w-1/2">
              <Label htmlFor="logo">Company Logo</Label>
              <Field
                name="companyLogo"
                className="dark:text-white placeholder:text-white cursor-pointer"
                component={FormikFilePicker}
              />
            </div>
            <div className="w-1/2">
              <Label htmlFor="invoicenumber">Invoice Number</Label>
              <Field
                name="invoiceNumber"
                component={FormikInput}
                className="mb-4 p-2 border"
                placeholder="#001"
              />
            </div>
          </div>
          {/* div 2 */}
          <div className="flex gap-2 justify-between mt-2 mb-2">
            <div className="w-1/2 ">
              <Label htmlFor="companyaddress">Company Address</Label>
              <Field
                name="companyAddress"
                component={FormikTextArea}
                className="mb-4 p-2 border"
                placeholder="142 M.G. Road, Pune, Maharashtra, 411001, India."
              />
            </div>
            <div className="w-1/2">
              <Label htmlFor="billto">Bill To</Label>
              <Field
                name="billTo"
                component={FormikTextArea}
                className="mb-4 p-2 border"
                placeholder="154 M.G. Road, Mumbar, Maharashtra, 410444, India."
              />
            </div>
          </div>
          {/* div 3 */}
          <div className="flex gap-2 justify-between mt-2 mb-2">
            <div className="w-1/2">
              <Label htmlFor="dateissued">Date Issued</Label>
              <Field
                name="dateIssued"
                component={FormikDatePicker}
                className="mb-4 p-2 border"
                placeholder="03/12/2023  Date component"
              />
            </div>
            <div className="w-1/2">
              <Label htmlFor="duedate">Due Date for billing</Label>
              <Field
                name="dueDate"
                component={FormikDatePicker}
                className="mb-4 p-2 border"
              />
            </div>
          </div>
          <Separator />
          {/* table Items */}
          <FieldArray name="items">
            {({ insert, remove, push }) => (
              <div className="mt-20 mb-20 dark:text-white items-start">
                <table>
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Rate</th>
                      <th>Quantity</th>
                      <th>Amount</th>
                      <th>
                        <RxCross2 />{" "}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {values.items.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <Field
                            name={`items[${index}].item`}
                            value={item.item}
                            component={FormikInput}
                          />
                        </td>
                        <td>
                          <Field
                            name={`items[${index}].rate`}
                            value={item.rate}
                            component={FormikInput}
                            type="number"
                            onBlur={() => {
                              const newAmount = calculateLineAmount(
                                item.rate,
                                item.quantity
                              );
                              setFieldValue(
                                `items[${index}].amount`,
                                newAmount
                              );
                              const totals = calculateTotal(
                                values.items,
                                values.taxRate,
                                values.discount
                              );
                              setFieldValue("subtotal", totals.subtotal);
                              setFieldValue("total", totals.total);
                            }}
                          />
                        </td>
                        <td>
                          <Field
                            name={`items[${index}].quantity`}
                            component={FormikInput}
                            type="number"
                            value={item.quantity}
                            onBlur={() => {
                              const newAmount = calculateLineAmount(
                                item.rate,
                                item.quantity
                              );
                              setFieldValue(
                                `items[${index}].amount`,
                                newAmount
                              );
                              const totals = calculateTotal(
                                values.items,
                                values.taxRate,
                                values.discount
                              );
                              setFieldValue("subtotal", totals.subtotal);
                              setFieldValue("total", totals.total);
                            }}
                          />
                        </td>
                        <td>
                          <Field
                            name={`items[${index}].amount`}
                            component={FormikInput}
                            value={item.amount}
                            type="number"
                            readOnly
                          />
                        </td>
                        <td>
                          <button type="button" onClick={() => remove(index)}>
                            <RxCross2 />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-1">
                <Button
                  variant="outline"
                  type="button"
                  className="mt-4 p-2"
                  onClick={() =>
                    push({ item: "", rate: 0, quantity: 0, amount: 0 })
                  }
                >
                  <HiMiniPlus size={20} />
                  Add Item
                </Button>
                </div>
              </div>
            )}
          </FieldArray>
          <Separator />
          {/* div 4 */}
          <div className="flex gap-2 justify-between mt-2 mb-2">
            <div className="w-1/2">
              <Label htmlFor="notes">Notes</Label>
              <Field
                name="notes"
                component={FormikTextArea}
                className="mb-4 p-2 border"
                placeholder="Notes"
              />
            </div>
            <div className="w-1/2">
              <div className="mt-2 mb-2 gap-2 flex items-center justify-between">
                <Label className="text-black" htmlFor="subtotal">
                  Subtotal
                </Label>
                <Field
                  name="subtotal"
                  className="text-md w-3/4 items-end dark:text-white"
                  component={FormikInput}
                  readOnly
                />
              </div>

              <div className="mt-2 mb-2 gap-2 flex items-center justify-between">
                <Label className="text-black" htmlFor="taxRate">
                  TaxRate
                </Label>
                <Field
                  name="taxRate"
                  className="w-3/4 dark:text-white"
                  onChange={handleChange}
                  component={FormikInput}
                />
              </div>
             
              <div className="mt-2 mb-2 gap-2 flex items-center justify-between">
                <Label className="text-blue-700" htmlFor="total">
                  Total
                </Label>
                <Field
                  name="total"
                  className="text-2xl font-bold text-blue-600 w-3/4 items-end"
                  component={FormikInput}
                  readOnly
                />
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default InvoiceEditor;

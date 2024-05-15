import React from "react";
import { Formik, Form, Field, FieldArray, useFormikContext } from "formik";
import invoiceSchema from "../utils/ValidationSchema";
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

const InvoiceEditor = ({ onUpdate }) => {
  const locale = "en-US";
  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  // Create date strings for today and a date 30 days from today
  const today = new Date();
  const thirtyDaysLater = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);

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
      validationSchema={invoiceSchema}
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
        console.log(values);
      }}
      onChange={(values) => {
        onUpdate(values);
      }}
    >
      {({ values, setFieldValue, handleChange, errors, touched }) => (
        <Form className="p-2">
          <div className="w-full flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold dark:text-white">
              Invoice Editor
            </h1>
            <Button
              variant="default"
              //disabled={Object.keys(errors).length > 0}
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
                className={`mb-2 p-2 border ${
                  touched.invoiceNumber && errors.invoiceNumber
                    ? "border-red-500"
                    : ""
                }`}
                placeholder="#001"
              />
              {touched.invoiceNumber && errors.invoiceNumber && (
                <div className="text-red-500 text-sm font-semibold mt-0">
                  {errors.invoiceNumber}
                </div>
              )}
            </div>
          </div>
          {/* div 2 */}
          <div className="flex gap-2 justify-between mt-2 mb-2">
            <div className="w-1/2 ">
              <Label htmlFor="companyaddress">Company Address</Label>
              <Field
                name="companyAddress"
                component={FormikTextArea}
                className={`mb-2 p-2 border ${
                  touched.companyAddress && errors.companyAddress
                    ? "border-red-500"
                    : ""
                }`}
                placeholder="142 M.G. Road, Pune, Maharashtra, 411001, India."
              />
              {touched.companyAddress && errors.companyAddress && (
                <div className="text-red-500 text-sm font-semibold mt-0">
                  {errors.companyAddress}
                </div>
              )}
            </div>
            <div className="w-1/2">
              <Label htmlFor="billto">Bill To</Label>
              <Field
                name="billTo"
                component={FormikTextArea}
                className={`mb-2 p-2 border ${
                  touched.billTo && errors.billTo ? "border-red-500" : ""
                }`}
                placeholder="154 M.G. Road, Mumbar, Maharashtra, 410444, India."
              />
              {touched.billTo && errors.billTo && (
                <div className="text-red-500 text-sm font-semibold mt-0">
                  {errors.billTo}
                </div>
              )}
            </div>
          </div>
          {/* div 3 */}
          <div className="flex gap-2 justify-between mt-2 mb-2">
            <div className="w-1/2">
              <Label htmlFor="dateissued">Date Issued</Label>
              <Field
                name="dateIssued"
                component={FormikDatePicker}
                className={`mb-2 p-2 border ${
                  touched.dateIssued && errors.dateIssued
                    ? "border-red-500"
                    : ""
                }`}
                placeholder="03/12/2023  Date component"
              />
              {touched.dateIssued && errors.dateIssued && (
                <div className="text-red-500 text-sm font-semibold mt-0">
                  {errors.dateIssued}
                </div>
              )}
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
                    {console.log(values.items)}
                    {values.items?.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <Field
                            name={`items[${index}].item`}
                            value={item?.item}
                            component={FormikInput}
                            className={`mb-0 p-2 border ${
                              touched.items?.[index]?.item &&
                              errors.items?.[index]?.item
                                ? "border-red-500"
                                : ""
                            }`}
                          />
                          {touched.items?.[index]?.item &&
                            errors.items?.[index]?.item && (
                              <div className="text-red-500 text-xs font-normal mt-0">
                                {errors?.items?.[index]?.item}
                              </div>
                            )}
                        </td>
                        <td>
                          <Field
                            name={`items[${index}].rate`}
                            value={item.rate}
                            className={`mb-0 p-2 border ${
                              touched.items?.[index]?.rate &&
                              errors.items?.[index]?.rate
                                ? "border-red-500"
                                : ""
                            }`}
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
                          {touched.items?.[index]?.rate &&
                            errors.items?.[index]?.rate && (
                              <div className="text-red-500 text-xs font-normal mt-0">
                                {errors?.items?.[index]?.rate}
                              </div>
                            )}
                        </td>
                        <td>
                          <Field
                            name={`items[${index}].quantity`}
                            component={FormikInput}
                            type="number"
                            value={item.quantity}
                            className={`mb-0 p-2 border ${
                              touched.items?.[index]?.quantity &&
                              errors.items?.[index]?.quantity
                                ? "border-red-500"
                                : ""
                            }`}
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
                          {touched.items?.[index]?.quantity &&
                            errors.items?.[index]?.quantity && (
                              <div className="text-red-500 text-xs font-normal mt-0">
                                {errors?.items?.[index]?.quantity}
                              </div>
                            )}
                        </td>
                        <td>
                          <Field
                            className={`mb-0 p-2 border ${
                              touched.items?.[index]?.quantity &&
                              errors.items?.[index]?.quantity
                                ? "border-red-500"
                                : ""
                            }`}
                            name={`items[${index}].amount`}
                            component={FormikInput}
                            value={item.amount}
                            type="number"
                            readOnly
                          />
                          {touched.items?.[index]?.quantity &&
                            errors.items?.[index]?.quantity && (
                              <div className="text-red-500 text-xs font-normal mt-0">
                                {errors?.items?.[index]?.quantity}
                              </div>
                            )}
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

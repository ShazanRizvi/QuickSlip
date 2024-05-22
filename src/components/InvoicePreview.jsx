import React, {useContext} from "react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import logo from "../assets/react.svg";
import callAPI from "../http/axios";
import SessionContext from "../context/session";

const InvoicePreview = ({ previewData }) => {
  const formatToISO8601 = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString();
  };
  const postData={
    invoice_number: previewData.invoiceNumber,
    company_name: previewData.companyName,
    company_address: previewData.companyAddress,
    bill_to: previewData.billTo,
    items: previewData.items,
    invoice_date: formatToISO8601(previewData.dateIssued),
    due_date: formatToISO8601(previewData.dueDate),
    sub_total: previewData.subtotal,
    tax_rate: previewData.taxRate,
    total: previewData.total,
    notes: previewData.notes,
  }
  const session = useContext(SessionContext);
  const handleSubmit = async() => {
    const headers = {
      Authorization: `Bearer ${session?.access_token}`,
      "Content-Type": "application/json",
    };
    console.log("This is preview data for submit", postData);
    await callAPI("POST", "/createinvoice", postData, headers)
  };

  return (
    <div className="container p-7 mt-6 rounded-md overflow-auto dark:bg-[#1f2936]">
      {/* <h1 className="text-2xl font-bold mb-5 dark:text-white">
        Invoice Preview
      </h1> */}
      {/* div 1 */}
      <div className="flex justify-between mt-10">
        <div>
          <h1 className="text-xl font-bold dark:text-white">
            {previewData.companyName}
          </h1>
          <div className="text-lg font-light dark:text-white ">
            <span>INVOICE</span> <span>{previewData?.invoiceNumber}</span>
          </div>
        </div>
        <div className="w-1/6 h-1/2 flex justify-end">
          <img src={logo} alt="Company Logo" className="object-cover" />
        </div>
      </div>
      {/* div 2 Address */}
      <div className="flex justify-between mt-10">
        <div>
          <h1 className="text-normal w-1/2 font-light dark:text-white">
            {previewData?.companyAddress}
          </h1>
        </div>
        <div>
          <h1 className="text-normal w-1/2 font-light dark:text-white">
            {previewData?.billTo}
          </h1>
        </div>
      </div>
      {/* Table div */}
      <div className="max-w-4xl mx-auto shadow-md overflow-hidden mt-10">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm dark:text-white">
                Item
              </th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm dark:text-white">
                Rate
              </th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm dark:text-white">
                Qty
              </th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm dark:text-white">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {previewData?.items?.map((item, index) => (
              <tr
                key={index}
                className="dark:hover:bg-blue-900 hover:bg-blue-100 "
              >
                <td className="text-left w-1/2 py-3 px-4 dark:text-white">
                  {item.item}
                </td>
                <td className="text-left py-3 px-4 dark:text-white">
                  ₹{item.rate}
                </td>
                <td className="text-left py-3 px-4 dark:text-white">
                  {item.quantity}
                </td>
                <td className="text-left py-3 px-4 dark:text-white">
                  ₹{item.amount}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td
                colSpan="3"
                className="text-right py-3 px-4 font-semibold dark:text-white"
              >
                SubTotal
              </td>
              <td className="text-left py-3 px-4 dark:text-white">
                ₹{previewData?.subtotal}
              </td>
            </tr>
            <tr>
              <td
                colSpan="3"
                className="text-right py-3 px-4 font-semibold dark:text-white"
              >
                Tax
              </td>
              <td className="text-left py-3 px-4 dark:text-white">
                ₹{previewData?.taxRate}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      {/* Notes div */}
      <div className="mt-20">
        <p className="dark:text-white font-semibold text-sm">Notes</p>
        <h1 className="dark:text-white font-light text-sm mt-2">
          {previewData?.notes}
        </h1>
      </div>
      {/* Total and date div */}
      <div className="bg-blue-500 mt-2 p-10 flex justify-between rounded-md">
        <div>
          <h1 className="text-white font-semibold text-sm">Invoice Details</h1>
          <div className="mt-2">
            <p className="text-white font-light text-sm">
              {previewData?.dateIssued}
            </p>
            <p className="text-white font-light text-sm">
              {previewData?.dueDate}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-white font-semibold text-sm">Total</p>
          <h1 className="text-white font-bold text-4xl mt-2">
            <span>₹</span>
            {previewData?.total}
          </h1>
        </div>
      </div>
      <Separator />
      {/* CTA's */}
      <div className="flex justify-end mt-5 gap-4">
        <Button onClick={()=>handleSubmit()} className="p-3" variant="outline">
          Save Invoice
        </Button>
        {/* <Button className=' p-3' variant='default'>Save and Send</Button> */}
      </div>
    </div>
  );
};

export default InvoicePreview;

import React from "react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import logo from "../assets/react.svg";


const InvoicePreview = ({ previewData }) => {
  console.log("This is preview data from Invoice preview", previewData);
  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  return (
    <div className="container p-2">
      <h1 className="text-2xl font-bold mb-5 dark:text-white">
        Invoice Preview
      </h1>
      {/* div 1 */}
      <div className="flex justify-between mt-10">
        <div>
          <h1 className="text-xl font-bold dark:text-white">INVOICE</h1>
          <p className="text-lg font-light dark:text-white ">
            {previewData?.invoiceNumber}
          </p>
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
          <Button className='p-3' variant='outline'>Save</Button>
            <Button className=' p-3' variant='default'>Save and Send</Button>
            
            </div>
    </div>
  );
};

export default InvoicePreview;

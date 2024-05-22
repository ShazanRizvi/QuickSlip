import React, { useEffect, useContext, useState } from "react";
import InvoiceCarddashboard from "./InvoiceCarddashboard";
import SideBardashboard from "./SideBardashboard";
import callAPI from "../http/axios";
import SessionContext from "../context/session";
import { set } from "date-fns";

const Dashboard = () => {
  const [invoices, setInvoices] = useState([]);
  const session = useContext(SessionContext);
  const headers = {
    Authorization: `Bearer ${session?.access_token}`,
    "Content-Type": "application/json",
  };
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const fetchedInvoices = await callAPI("GET", "/getInvoices", null, headers);
        setInvoices(fetchedInvoices);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };

    fetchInvoices();
  }, []);

  return (
    <div className="pt-4 flex h-screen dark:text-white w-screen gap-3 overflow-hidden">
      <SideBardashboard />

      <div className="p-5 justify-items-center justify-center w-[1200px]">
        <div>
          <h1 className="text-4xl font-bold"> Your Invoices</h1>
        </div>
        {/* This is card grid */}
        <div className="pt-10 grid grid-cols-3 gap-5 place-content-center">
          {invoices?.map((invoice) => {
           
            return (
              <div>
                <InvoiceCarddashboard invoice={invoice} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

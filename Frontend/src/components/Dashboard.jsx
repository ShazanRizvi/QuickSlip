import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import InvoiceCarddashboard from "./InvoiceCarddashboard";
import SideBardashboard from "./SideBardashboard";
import callAPI from "../http/axios";
import SessionContext from "../context/session";
import LoadingSkeleton from "./LoadingSkeleton";

const Dashboard = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const session = useContext(SessionContext);
  const navigate = useNavigate();
  console.log("session", session);
  const headers = {
    Authorization: `Bearer ${session?.access_token}`,
    "Content-Type": "application/json",
  };
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const fetchedInvoices = await callAPI(
          "GET",
          "/getInvoices",
          null,
          headers
        );
        setInvoices(Array.isArray(fetchedInvoices) ? fetchedInvoices : []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };

    fetchInvoices();
  }, []);
  
//   const getInvoiceById=async(id)=>{
//     try {
//       navigate(`/InvoiceGenerator/editinvoice/${id}`)
//   }catch(error){
//     console.error('Error fetching invoice:',error);
//   }
// }

  return (
    <div className="pt-4 flex h-screen dark:text-white w-screen gap-3 overflow-hidden">
      <SideBardashboard />

      <div className="p-5 justify-items-center justify-center w-[1200px]">
        <div>
          <h1 className="text-4xl font-bold"> Your Invoices</h1>
        </div>
        {/* This is card grid */}
        <div className="pt-10 grid grid-cols-3 gap-5 place-content-center">
          {loading ? (
            <LoadingSkeleton />
          ) : (
            invoices?.map((invoice) => {
              return (
                <div>
                  <InvoiceCarddashboard invoice={invoice} />
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import InvoiceCarddashboard from "./InvoiceCarddashboard";
import SideBardashboard from "./SideBardashboard";
import callAPI from "../http/axios";
import SessionContext from "../context/session";
import LoadingSkeleton from "./LoadingSkeleton";
import { toast } from "react-hot-toast";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import DashboardHomepage from "./DashboardHomepage";
import { Input } from "./ui/input";
import Loader from "./Loader";

const Dashboard = () => {
  const [currentpage, setCurrentPage] = useState(1);
  const [invoicesPerPage, setInvoicesPerPage] = useState(6); // Number of invoices per page
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const accessToken = localStorage.getItem("accessToken");
  //console.log("accessToken", accessToken);
  const navigate = useNavigate();
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const fetchedInvoices = await callAPI(
          "GET",
          "/api/getInvoices",
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
  const handlePageClick = (page) => {
    setCurrentPage(page);
  };
  // Calculate current page invoices
  const indexOfLastInvoice = currentpage * invoicesPerPage;
  const indexOfFirstInvoice = indexOfLastInvoice - invoicesPerPage;
  const currentInvoices = invoices.slice(
    indexOfFirstInvoice,
    indexOfLastInvoice
  );
  const totalPages = Math.ceil(invoices.length / invoicesPerPage);

  return (
    <div>
      {loading ? (
        <div className="pt-4">
          <Loader />
        </div>
      ):invoices.length === 0 ? (
        <div className="pt-4">
          <DashboardHomepage />
        </div>
      ) : (
        <div className="pt-4 flex h-screen dark:text-white overflow-hidden">
          <SideBardashboard />
          <div className="p-5 flex justify-center w-screen">
            <div className="w-3/4">
              <div className="flex justify-between">
                <h1 className="text-4xl font-bold">Your Invoices</h1>
               
                <Input type='text' className='w-full' placeholder='Search invoices'/>
              </div>
              {/* This is card grid */}
              
                <div className="pt-10 grid grid-cols-3 gap-5 place-content-center justify-center w-full">
                  {loading ? (
                    <LoadingSkeleton />
                  ) : (
                    currentInvoices?.map((invoice) => {
                      return <InvoiceCarddashboard invoice={invoice} />;
                    })
                  )}
                </div>
              

              <div className=" p-0 m-0 z-10 fixed bottom-0 w-[1100px]">
                {totalPages > 1 && (
                  <Pagination>
                    <PaginationContent>
                      {currentpage > 1 && (
                        <PaginationItem>
                          <PaginationPrevious
                            className="cursor-pointer"
                            onClick={() => handlePageClick(currentpage - 1)}
                          />
                        </PaginationItem>
                      )}
                      {[...Array(totalPages).keys()].map((page) => (
                        <PaginationItem
                          key={page + 1}
                          active={page + 1 === currentpage}
                        >
                          <PaginationLink
                            className="cursor-pointer"
                            onClick={() => handlePageClick(page + 1)}
                          >
                            {page + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}

                      {currentpage < totalPages && (
                        <PaginationItem>
                          <PaginationNext
                            className="cursor-pointer"
                            onClick={() => handlePageClick(currentpage + 1)}
                          />
                        </PaginationItem>
                      )}
                    </PaginationContent>
                  </Pagination>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    // <div className="pt-4">
    //   <DashboardHomepage/>
    // </div>

    // <div className="pt-4 flex h-screen dark:text-white overflow-hidden">
    //   <SideBardashboard />
    //   <div className="p-5  justify-between  w-[1200px]">
    //     <div>
    //       <div>
    //         <h1 className="text-4xl font-bold"> Your Invoices</h1>
    //       </div>
    //       {/* This is card grid */}
    //       <div className="pt-10 grid grid-cols-3 gap-5 place-content-center justify-center">
    //         {loading ? (
    //           <LoadingSkeleton />
    //         ) : (
    //           currentInvoices?.map((invoice) => {
    //             return (
    //               <div>
    //                 <InvoiceCarddashboard invoice={invoice} />
    //               </div>
    //             );
    //           })
    //         )}
    //       </div>
    //       <div className=" p-4 m-0 z-10 fixed bottom-0 w-[1200px]">
    //         {totalPages > 1 && (
    //           <Pagination>
    //             <PaginationContent>
    //               {currentpage > 1 && (
    //                 <PaginationItem>
    //                   <PaginationPrevious
    //                     className="cursor-pointer"
    //                     onClick={() => handlePageClick(currentpage - 1)}
    //                   />
    //                 </PaginationItem>
    //               )}
    //               {[...Array(totalPages).keys()].map((page) => (
    //                 <PaginationItem
    //                   key={page + 1}
    //                   active={page + 1 === currentpage}
    //                 >
    //                   <PaginationLink
    //                     className="cursor-pointer"
    //                     onClick={() => handlePageClick(page + 1)}
    //                   >
    //                     {page + 1}
    //                   </PaginationLink>
    //                 </PaginationItem>
    //               ))}

    //               {currentpage < totalPages && (
    //                 <PaginationItem>
    //                   <PaginationNext
    //                     className="cursor-pointer"
    //                     onClick={() => handlePageClick(currentpage + 1)}
    //                   />
    //                 </PaginationItem>
    //               )}
    //             </PaginationContent>
    //           </Pagination>
    //         )}
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Dashboard;

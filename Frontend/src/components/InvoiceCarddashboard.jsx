import React, {useState,useEffect} from "react";
import { Button } from "./ui/button";
import { BiLogoBlogger } from "react-icons/bi";
import { FaRegEdit } from "react-icons/fa";
import { IoPlayOutline } from "react-icons/io5";
import { AiOutlineCloudDownload } from "react-icons/ai";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import callAPI from "../http/axios";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { useNavigate } from "react-router-dom";
import { Spinner } from "./Spinner";
 
import toast from "react-hot-toast";

const InvoiceCarddashboard = ({ invoice, onDelete }) => {
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");
  const accessToken = localStorage.getItem("accessToken");
  //console.log("accessToken", accessToken);

  useEffect(() => {
    if (downloadUrl) {
      window.open(downloadUrl);
      setDownloadUrl(null); // Reset to null to avoid repeated triggers
    }
  }, [downloadUrl]);
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };
  //console.log("invoice from card",invoice)
  const navigate = useNavigate();
  const navigateToInvoiceEditor = async (id) => {
    try {
      navigate(`/InvoiceGenerator/editinvoice/${id}`);
    } catch (error) {
      toast.error("Error fetching invoice:", error);
    }
  };

  const handleDeleteInvoice = async (invoice) => {
    try {
      //console.log("invoice id for delete:", invoice.id);
      await callAPI(
        "DELETE",
        `/api/deleteinvoice/${invoice.id}`,
        null,
        headers
      );
      toast.success("Invoice deleted");
      window.location.reload();
    } catch (error) {
      toast.error("Error deleting invoice:", error);
    }
  };

  const downloadInvoice = async (invoice) => {
    setLoading(true);
    try {
      console.log("invoice id for download:", invoice.id);
      const response = await callAPI(
        "GET",
        `/api/generateinvoice/${invoice.id}`,
        null,
        headers
      );
      setDownloadUrl(response?.data?.url);
      console.log("url of invoice: ", downloadUrl);
      toast.success("Invoice Generated Successfully");
      
    } catch (error) {
      toast.error("Error deleting invoice:", error);
    }finally{
      setLoading(false);
      
    }
  };

  return (
    <div className="p-5 border border-slate-100 dark:bg-[#1f2936] dark:border-none rounded-lg">
      <div className="flex justify-between">
        <div className="dark:bg-blue-900/50 bg-blue-200/50 p-3 rounded-lg">
        <BiLogoBlogger size={30} color="#2563eb" />
        </div>
        
        <TooltipProvider>
          <Tooltip>
            <div className="flex items-start">
              {/* <div className=" flex p-2 rounded-full font-semibold text-sm text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-blue-950 border border-blue-600 px-4 items-center">
                <TooltipTrigger>Business Invoice</TooltipTrigger>
              </div> */}
              <div>
         
          </div>
              <div>
                <Popover>
                  <PopoverTrigger>
                    {" "}
                    <BsThreeDotsVertical size={16} className="ml-2" />
                  </PopoverTrigger>
                  <PopoverContent className="shadow dark:shadow-sm dark:shadow-gray-700 rounded-lg">
                    <Button
                      variant="delete"
                      onClick={() => handleDeleteInvoice(invoice)}
                    >
                      Delete
                    </Button>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <TooltipContent>
              <p>This is a business invoice</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="flex justify-between pt-10 items-end">
          <div>
          <div>
            <h1 className="text-base font-semibold">
              {invoice?.invoice_number}
            </h1>
          </div>
          <div className="gap-1">
            <p className="text-sm font-normal text-slate-400">
              {invoice?.company_name}
            </p>
          </div>
          </div>
          <div>
          <TooltipProvider>
            <Tooltip>
              <div className="flex items-center  p-1 rounded-full font-semibold text-xs text-green-700 dark:text-green-400  border bg-green-200 dark:bg-green-900 border-green-600 px-2">
                <TooltipTrigger><span>₹</span><span>{invoice?.total}</span></TooltipTrigger>
              </div>
            </Tooltip>
          </TooltipProvider>
          </div>
      </div>

      <div className="flex justify-between gap-4 pt-5">
        <Button
          className="w-1/2 gap-1 items-center"
          onClick={() => navigateToInvoiceEditor(invoice.id)}
          size="sm"
        >
          <FaRegEdit />
          Edit
        </Button>
        <Button
          variant="outline"
          className="w-1/2 border-none gap-1 items-center"
          onClick={() => downloadInvoice(invoice)}
          size="sm"
        >
          
          {loading ? <Spinner/> : <div className="flex gap-1 items-center"><span><AiOutlineCloudDownload /></span><span>Download</span></div>}
        </Button>
      </div>
    </div>
  );
};

export default InvoiceCarddashboard;

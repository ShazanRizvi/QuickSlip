import React from "react";
import { Button } from "./ui/button";
import { BiLogoBlogger } from "react-icons/bi";
import { FaRegEdit } from "react-icons/fa";
import { IoPlayOutline } from "react-icons/io5";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
const InvoiceCarddashboard = () => {
  return (
    <div className="p-6 border border-slate-100 dark:bg-[#1f2936] dark:border-none rounded-lg">
      <div className="flex justify-between">
        <BiLogoBlogger size={40} color="#2563eb" />
        <TooltipProvider>
          <Tooltip>
          <div className=' flex rounded-full text-sm bg-blue-100 dark:bg-blue-950 border border-blue-600 px-4 items-center'>
          <TooltipTrigger>Business Invoice</TooltipTrigger>
          </div>
           
            <TooltipContent>
              <p>Add to library</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="pt-10">
        <h1 className="text-base font-semibold">Invoice #RT3080</h1>
      </div>
      <div className="gap-1">
        <p className="text-base font-normal text-slate-400">
          Due on: May 12,2024
        </p>
      </div>
      <div className="flex justify-between gap-4 pt-5">
        <Button className="w-1/2 gap-1 items-center">
          <FaRegEdit />
          Edit
        </Button>
        <Button
          variant="outline"
          className="w-1/2 border-none gap-1 items-center"
        >
          <IoPlayOutline />
          View
        </Button>
      </div>
    </div>
  );
};

export default InvoiceCarddashboard;

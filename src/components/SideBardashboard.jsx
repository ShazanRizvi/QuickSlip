import React from "react";
import { Button } from "./ui/button";
import { FiPlus } from "react-icons/fi";

const SideBardashboard = () => {
  return (
    <div className="h-screen p-5  bg-white shadow-lg border border-slate-300 dark:border-none dark:bg-[#1f2936]">
    <div className="gap-4">
    <div className="mb-5"> 
    <Button className="p-5 gap-1">
        <FiPlus size={20} /> Create Business Invoice
      </Button>
    </div>
    <div>
    <Button variant='outline' className="p-5 gap-1 w-full">
        <FiPlus size={20} /> Create Instant Invoice
      </Button>
    </div>
    </div>
    
    </div>
  );
};

export default SideBardashboard;

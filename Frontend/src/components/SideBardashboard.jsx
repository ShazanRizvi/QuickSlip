import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { FiPlus } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { CgProfile } from "react-icons/cg";

const SideBardashboard = () => {
  const [user, setUser] = useState({});
  const token = localStorage.getItem("accessToken");
  useEffect(() => {
    if (token) {
      const user = jwtDecode(token);
      console.log("Logged in user: ", user);
      setUser(user);
    }
  }, [token]);

  return (
    
    <div className="h-screen p-5  bg-white shadow-lg border border-slate-300 dark:border-none dark:bg-[#1f2936]">
      <div className="gap-4">
        <div className="mb-5">
          <NavLink to="/InvoiceGenerator/createbusinessinvoice">
            <Button className="p-5 gap-1">
              <FiPlus size={20} /> Create Business Invoice
            </Button>
          </NavLink>
        </div>
        {/* <div>
    <Button variant='outline' className="p-5 gap-1 w-full">
        <FiPlus size={20} /> Create Instant Invoice
      </Button>
    </div> */}
      </div>

      {/* Profile card */}

      <div className="dark:bg-blue-900/60 bg-blue-300/50 border dark:border-blue-700 rounded-lg p-3 cursor-pointer fixed bottom-4 w-auto">
        <div className="flex gap-2 items-center">
          <div>
            <CgProfile size={30} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              Welcome
            </h1>
            <p className="text-sm font-normal text-gray-500 dark:text-gray-300">
              {user?.email}
            </p>
          </div>
        </div>
      </div>


    </div>
  );
};

export default SideBardashboard;

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { FiPlus } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import AccountCard from "./AccountCard";

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
    <div className="h-screen p-5   bg-white shadow-lg border border-slate-300 dark:border-none dark:bg-[#1f2936]">
      <div className="gap-4">
        <div className="mb-5">
          <NavLink to="/InvoiceGenerator/createbusinessinvoice">
            <Button className="p-5 gap-1">
              <FiPlus size={20} /> Create Business Invoice
            </Button>
          </NavLink>
          <AccountCard email={user?.email} />
        </div>  
      </div>

      {/* Profile card */}
      

      
    </div>
  );
};

export default SideBardashboard;

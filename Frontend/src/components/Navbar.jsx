import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Button } from "./ui/button";
import SessionContext from "../context/session";
import { RxAvatar } from "react-icons/rx";
import { PiInvoice } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("accessToken");
    //window.location.reload();
    navigate("/InvoiceGenerator/publichomepage");
  }

  return (
    <div className="w-screen items-center fixed">
      <Menubar>
        <MenubarMenu>
          <div className="flex w-full justify-between">
            <div>
              <NavLink to="/InvoiceGenerator/dashboard">
                <MenubarTrigger className="font-bold gap-1 items-center text-xl">
                  <PiInvoice size={24} />
                  QuickSlip
                </MenubarTrigger>
              </NavLink>
            </div>

            <div className="flex items-center">
              <NavLink to="/InvoiceGenerator/createbusinessinvoice">
                <MenubarTrigger>Create Invoice</MenubarTrigger>
              </NavLink>
              <NavLink to="/InvoiceGenerator/dashboard">
                <MenubarTrigger>Contact us</MenubarTrigger>
              </NavLink>
              <NavLink to="/InvoiceGenerator/dashboard">
                <MenubarTrigger>About Us</MenubarTrigger>
              </NavLink>
              {accessToken ? (
                <NavLink to="/InvoiceGenerator/login">
                  <MenubarTrigger onClick={logout}>Logout</MenubarTrigger>
                </NavLink>
              ) : (
                <>
                  <NavLink to="/InvoiceGenerator/login">
                    <MenubarTrigger>Login</MenubarTrigger>
                  </NavLink>
                  <NavLink to="/InvoiceGenerator/signup">
                    <MenubarTrigger>Signup</MenubarTrigger>
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </MenubarMenu>
      </Menubar>
    </div>
  );
};

export default Navbar;

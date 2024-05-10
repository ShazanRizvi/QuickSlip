import React, { useContext } from "react";
import { Link, BrowserRouter, NavLink } from "react-router-dom";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import SessionContext from "../context/session";
import { RxAvatar } from "react-icons/rx";
import { PiInvoice } from "react-icons/pi";

const Navbar = () => {
  const session = useContext(SessionContext);
  console.log(session);
  return (
    <div className=" w-1/2 items-center fixed">
      <Menubar>
        <MenubarMenu>
        <div className="flex w-full justify-between">
        <div>
        <NavLink to="/InvoiceGenerator/">
            <MenubarTrigger className="font-bold gap-1 items-center text-xl"><PiInvoice size={24} />
          QuickSlip</MenubarTrigger>
          </NavLink>
          </div>
          
          <div className="flex items-center">

          <NavLink to="/InvoiceGenerator/">
            <MenubarTrigger>Home</MenubarTrigger>
          </NavLink>
          <NavLink to="/InvoiceGenerator/">
            <MenubarTrigger>Contact us</MenubarTrigger>
          </NavLink>
          <NavLink to="/InvoiceGenerator/">
            <MenubarTrigger>About Us</MenubarTrigger>
          </NavLink>
          {!session ? (
            <NavLink to="/InvoiceGenerator/login">
              <MenubarTrigger>Login</MenubarTrigger>
            </NavLink>
          ) : (
            <NavLink to="/InvoiceGenerator/account">
              <MenubarTrigger><RxAvatar size={24}/></MenubarTrigger>
            </NavLink>
          )}
          </div>
          </div>
        </MenubarMenu>
      </Menubar>
    </div>
  );
};

export default Navbar;

import { Outlet } from "react-router-dom";
import React,{useContext} from "react";
import Navbar from "../components/Navbar";
import { Toaster } from "react-hot-toast";
import SessionContext from "../context/session";
import Auth from "../components/Auth";
import PublicHomepage from "./PublicHomepage";



const Root = () => {
  const session = useContext(SessionContext);
  return (
   
    <div className="dark:bg-[#2b394a] w-screen overflow-hidden">
    <div><Toaster/></div>
      <div className="flex justify-centre w-auto">
        <Navbar />
      </div>
      <div className="h-screen pt-10 w-screen">
      <Outlet />
        
      </div>
    </div>
    
  );
};

export default Root;

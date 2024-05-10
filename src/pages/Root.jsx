import { Outlet } from "react-router-dom";
import appRouter from "../routes";
import React,{useState, useEffect} from "react";
import Navbar from "../components/Navbar";
import { supabase } from "../supabaseClient";     

const Root = () => {
     
   
  return (
    <>
    <div className="flex w-auto justify-center">
      <Navbar/>
      </div>
      <div className="mt-20">
      <Outlet/>
      </div>
    </>
  );
};

export default Root;

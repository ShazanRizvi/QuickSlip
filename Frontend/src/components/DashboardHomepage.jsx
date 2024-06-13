import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "./ui/button";
import { FiPlus } from "react-icons/fi";
import dashboard from "../assets/Dashboard.svg";
import FeatureCard from "./FeatureCard";
import HassleFree from '../assets/Hasslefree.svg'
import Cloudbased from '../assets/Cloudbased.svg'
import PdfInvoice from '../assets/PdfInvoice.svg'
import EcoFriendly from '../assets/Ecofriendly.svg'
import { Separator } from "@/components/ui/separator"

const DashboardHomepage = () => {
  return (
    <div>
      <div className="p-10  flex w-screen items-center justify-center gap-4">
        <div className="w-1/2">
          <h1 className="dark:text-white text-4xl font-bold pb-2">
            Welcome to QuickSlip Invoice Dashboard
          </h1>
          <p className="dark:text-gray-400 text-base font-normal">
            Here, you'll find a centralized space where all your invoices are
            stored and easily accessible. Whether you need to review past
            invoices or retrieve their details, this dashboard is your go-to
            resource.
          </p>
          <div className="mb-5 pt-10">
            <NavLink to="/InvoiceGenerator/createbusinessinvoice">
              <Button className="p-5 gap-1">
                <FiPlus size={20} /> Create Business Invoice
              </Button>
            </NavLink>
          </div>
        </div>
        <div className="w-1/4">
          <img className="object-contain" src={dashboard} alt="mockup" />
        </div>
        
      </div>
      <div className="w-full h-5 flex justify-center">
      <Separator className='w-[1000px]'/>
      </div>
      
      <div className="p-10 w-screen flex items-center justify-center gap-4">
        <div className="flex w-3/4 justify-between ">
          <div className="w-40 p-2 hover:scale-110 hover:-translate-y-1 transition ease-in-out delay-400 duration-300 rounded-lg">
            <FeatureCard ImageSrc={HassleFree} MainText="Ease of Access" SecondaryText="User friendly interface" />
          </div>
          <div className="w-40 p-2 hover:scale-110 hover:-translate-y-1 transition ease-in-out delay-400 duration-300  rounded-lg ">
            <FeatureCard ImageSrc={Cloudbased} MainText="Cloud Based" SecondaryText="Access invoices anywhere"/>
          </div>
          <div className="w-40 p-2 hover:scale-110 hover:-translate-y-1 transition ease-in-out delay-400 duration-300 rounded-lg ">
            <FeatureCard ImageSrc={PdfInvoice} MainText="Instant PDFs" SecondaryText="Generate invoice PDF instantly"/>
          </div>
          <div className="w-40 p-2 hover:scale-110 hover:-translate-y-1 transition ease-in-out delay-400 duration-300 rounded-lg ">
            <FeatureCard ImageSrc={EcoFriendly} MainText="Eco-Friendly" SecondaryText="Less Paper, Less waste"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHomepage;

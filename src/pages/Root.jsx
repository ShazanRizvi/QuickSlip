import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Toaster } from "react-hot-toast";


const Root = () => {
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

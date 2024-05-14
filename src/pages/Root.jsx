import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";


const Root = () => {
  return (
    <div className="dark:bg-indigo-950">
      <div className="flex w-auto justify-center ">
        <Navbar />
      </div>
      <div className="h-screen pt-20">
        <Outlet />
      </div>
    </div>
  );
};

export default Root;

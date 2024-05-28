import React, { useContext } from "react";
import SessionContext from "../context/session";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const session = useContext(SessionContext);
  const location = useLocation();
  if (!session) {
    return (
      <Navigate
        to="/InvoiceGenerator/publichomepage"
        state={{ from: location }}
        replace
      />
    );
  }else{
    
    return children;
  }
  
};

export default ProtectedRoute;

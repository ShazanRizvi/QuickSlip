import { createBrowserRouter } from "react-router-dom";
import Homepage from "../components/Homepage";
import Auth from "../components/Auth";
import Account from "../components/Account";
import ProtectedRoute from './ProtectedRoutes';
import SessionStore from "../context/SessionStore";
import Dashboard from "../components/Dashboard";
import Root from "../pages/Root";
import React from "react";

const appRouter = createBrowserRouter([
     {
       path: '/InvoiceGenerator',
       element: <SessionStore><Root/></SessionStore>,
       children: [
         {
           path: '/InvoiceGenerator/createbusinessinvoice',
           element: <Homepage />,
         },
         {
          path: '/InvoiceGenerator/login',
          element: <Auth />,
        },
        {
          path: '/InvoiceGenerator/dashboard',
          element: <ProtectedRoute><Dashboard/></ProtectedRoute>,
        },
        {
          path: '/InvoiceGenerator/account',
          element: <ProtectedRoute><Account/></ProtectedRoute>,
        },
         
         // Add other routes as needed
       ],
     },
   ]);

export default appRouter;
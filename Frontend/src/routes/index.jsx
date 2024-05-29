import { createBrowserRouter, Navigate } from "react-router-dom";
import Homepage from "../components/Homepage";
import Auth from "../components/Auth";
import Account from "../components/Account";
import ProtectedRoute from './ProtectedRoutes';
import SessionStore from "../context/SessionStore";
import Dashboard from "../components/Dashboard";
import Root from "../pages/Root";
import React from "react";
import ProtectedInvoiceEditor from "../components/ProtectedInvoiceEditor";
import PublicHomepage from "../pages/PublicHomepage";
import Login from "../components/Login";

const appRouter = createBrowserRouter([
     {
       path: '/',
       element: <SessionStore><Root/></SessionStore>,
       children: [
        {
          index: true, // This indicates it matches the exact path '/'
          element: <Navigate to="/InvoiceGenerator/publichomepage" replace />
        },
         {
           path: '/InvoiceGenerator/createbusinessinvoice',
           element: <Homepage />,
         },
         {
          path: '/InvoiceGenerator/signup',
          element: <Auth />,
        },
        {
          path: '/InvoiceGenerator/login',
          element: <Login />,
        },
        {
          path: '/InvoiceGenerator/publichomepage',
          element: <PublicHomepage />,
        },
        {
          path: '/InvoiceGenerator/dashboard',
          element: <ProtectedRoute><Dashboard/></ProtectedRoute>,
        },
        {
          path: '/InvoiceGenerator/account',
          element: <ProtectedRoute><Account/></ProtectedRoute>,
        },
        {
          path: '/InvoiceGenerator/editinvoice/:id',
          element: <ProtectedRoute><ProtectedInvoiceEditor/></ProtectedRoute>,
        },
         
         // Add other routes as needed
       ],
     },
   ]);

export default appRouter;
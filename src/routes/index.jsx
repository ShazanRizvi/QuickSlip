import { createBrowserRouter } from "react-router-dom";
import Homepage from "../components/Homepage";
import Auth from "../components/Auth";
import Account from "../components/Account";
import Root from "../pages/Root";
import React from "react";

const appRouter = createBrowserRouter([
     {
       path: '/InvoiceGenerator',
       element: <Root/>,
       children: [
         {
           path: '/InvoiceGenerator',
           element: <Homepage />,
         },
         {
          path: '/InvoiceGenerator/login',
          element: <Auth />,
        },
        {
          path: '/InvoiceGenerator/account',
          element: <Account/>,
        },
         
         // Add other routes as needed
       ],
     },
   ]);

export default appRouter;
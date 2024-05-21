import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import SessionStore from "./context/SessionStore.jsx";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SessionStore>
      <App />
    </SessionStore>
  </React.StrictMode>
);

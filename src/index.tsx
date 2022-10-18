import React from "react";
import ReactDOM from "react-dom/client";
import UnfriendlyDates from "./UnfriendlyDates";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <UnfriendlyDates />
  </React.StrictMode>
);

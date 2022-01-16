import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import ModelContextProvider from "./context/modelContext";
import UserContextProvider from "./context/authContext";
import App from "./App";
ReactDOM.render(
  <React.StrictMode>
    <UserContextProvider>
      <ModelContextProvider>
        <App />
      </ModelContextProvider>
    </UserContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

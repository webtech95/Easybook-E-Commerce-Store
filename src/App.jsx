import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Router from "./router"; // or Approute

function App() {
  return (
    <>
      < ToastContainer position="bottom-left" autoClose={1500}
        style={{ zIndex: 9999 }} />
      <Router />
    </>
  );
}

export default App;
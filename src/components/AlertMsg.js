import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const AlertMsg = () => {
  return (
    <ToastContainer
      position="top-right"
      style={{ zIndex: 9999 }}
      hideProgressBar={true}
      newestOnTop={false}
      pauseOnHover
      autoClose={4000}
    />
  );
};

export default AlertMsg;

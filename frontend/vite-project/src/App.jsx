import React from "react";
import url from "./url";
import ProductTypes from "./components/ProductTypes";
import BulkUpload from "./components/BulkUpload";
import HomePage from "./pages/HomePage";
import axios from "axios";
const App = () => {
  axios.defaults.baseURL = 'http://localhost:8080';
  return (
    <div>
      <HomePage />
      {/* <BulkUpload /> */}
    </div>
  );
};
export default App;

import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import ProductTypes from "./ProductTypes";
import { Autocomplete } from "@mui/material";
import url from "../url";

const BulkUpload = () => {
  const [productCount, setProductCount] = useState(0);
  const [selectedProductType, setSelectedProductType] = useState();
  const numbers = Array.from(Array(10).keys()).map(String);
  const [skuList, setSkuList] = useState([]);
  const [csvFile, setCsvFile] = useState();
  const uploadCsv = async (file) => {
    setCsvFile(file);
    const formData = new FormData();
    console.log(file[0]);
    formData.append("file", file[0]);
    // fetch(`${url}/api/v1/upload`, {
    //   method: "POST",
    //   body: formData,
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((err) => console.log(err));
  };
  const submitProducts = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", csvFile[0]);
    formData.append("skus", JSON.stringify(Object.values(skuList)));
    formData.append("productCount", productCount);
    formData.append("productType", selectedProductType);
    const response = await fetch(`${url}/api/v1/bulk-upload`, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    console.log(data);
  };
  console.log(skuList);
  const setSkus = (e) => {
    setSkuList({ ...skuList, [e.target.name]: e.target.value });
  };
  return (
    <>
      <ProductTypes
        selectedProductType={selectedProductType}
        setSelectedProductType={setSelectedProductType}
      />
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "50ch" },
        }}
        noValidate
        autoComplete="off"
        onSubmit={(e) => submitProducts(e)}
      >
        <Autocomplete
          disablePortal
          id="NoOfProducts"
          onChange={(event, newValue) => {
            setProductCount(newValue);
          }}
          options={numbers}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="No. of products" />
          )}
        />
        {Array.from({ length: productCount }).map((_, i) => (
          <TextField
            key={i}
            label="SKU"
            name={`SKU${i}`}
            onChange={setSkus}
            variant="standard"
          />
        ))}
        <input
          type={"file"}
          accept=".csv,.xlsx"
          onChange={(e) => uploadCsv(e.target.files)}
        />
        <button type="submit">Submit</button>
      </Box>
    </>
  );
};

export default BulkUpload;

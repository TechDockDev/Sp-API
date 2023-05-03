import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import url from "../url";

export default function BasicTextFields({ productFields, productType }) {
  const [productDetails, setproductDetails] = React.useState({});
  const listProduct = async (e) => {
    e.preventDefault();
    const response = await fetch(`${url}/api/v1/upload`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productDetails, productType }),
    });
    const data = await response.json();
    console.log(data);
  };
  const handleChange = (e) => {
    setproductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };
  // console.log(productDetails);
  return (
    <Box>
      <form onSubmit={listProduct}>
        {Object.entries(productFields).map(([key, value]) => (
          <>
            <Typography
              variant="h5"
              gutterBottom
              color={"black"}
              marginLeft={"10px"}
            >
              {key}
            </Typography>
            {value.propertyNames.map((propertyName) => (
              <TextField
                id="outlined-basic"
                size="small"
                name={propertyName}
                onChange={handleChange}
                sx={{ margin: "10px" }}
                label={propertyName}
                variant="outlined"
              />
            ))}
          </>
        ))}
        <button>Submit</button>
      </form>
    </Box>
  );
}

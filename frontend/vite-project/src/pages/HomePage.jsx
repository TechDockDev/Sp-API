import React, { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Button } from "@mui/material";
import axios from "axios";
import { CSVLink, CSVDownload } from "react-csv";
import mime from "mime";

const HomePage = () => {
  const [loading, setLoading] = useState(false);
  const [feedId, setFeedId] = useState();
  const [url, setUrl] = useState();
  const [status, setStatus] = useState();
  const [csvData, setCsvData] = useState([]);
  const uploadCsv = async (file) => {
    const formdata = new FormData();
    formdata.append("file", file[0]);
    console.log(file);
    const { data } = await axios.post("/api/v1/bulk/upload-product", formdata);
    setFeedId(data.feedId);
    console.log(data);
    setLoading(false);
  };

  // feed info
  const feedInfo = async () => {
    const { data } = await axios.get(`/api/v1/bulk/get-feed?feedId=${feedId}`);
    console.log(data.url);
    if (data.url) {
      setUrl(data.url);
    } else {
      setStatus(data.status);
    }
  };

  async function generateCsvReport() {
    const response = await axios.get("/api/v1/bulk/get-feed-report");
    // console.log(data);
    // setCsvData(data.report);
    let headers = response.headers;
    console.log(response.data);
    // const blob = new Blob([response.data], { type: headers["content-type"] });
    // let url = window.URL.createObjectURL(blob);
    // let a = document.createElement("a");
    // a.href = url;
    // a.download = "report.xls";
    // // a.download = "report." + mime.getExtension(headers["content-type"]);
    // a.click();
  }

  return (
    <>
      {" "}
      <h2>Welcome to Dropiteer</h2>
      <p>For listings products in bulk Upload an excel file below</p>
      <Box sx={{ m: 1, position: "relative", width: "fit-content" }}>
        <label
          htmlFor="file-upload"
          className="custom-file-upload"
          style={styles.fileInputLabel}
        >
          Click here to upload your file
        </label>
        {loading && (
          <CircularProgress
            size={24}
            sx={{
              color: "yellow",
              position: "absolute",
              top: "50%",
              left: "50%",
              marginTop: "-12px",
              marginLeft: "-12px",
            }}
          />
        )}
      </Box>
      <input
        id="file-upload"
        style={styles.fileInput}
        type={"file"}
        // accept=".csv,.xlsx"
        onChange={(e) => {
          uploadCsv(e.target.files);
          setLoading(true);
        }}
      />
      <p style={{ color: "red" }}>
        *Make sure you have read the amazon policies regarding listing products
        and the file contains valid information about your listings otherwise
        for any rejections or action by the amazon dropiteer is not responsible
        for it.*
      </p>
      <a href="./template.xlsx" download="template" target="_blank">
        <button>Download Template</button>
      </a>
      {feedId && <Box>Your feed ID is {feedId}</Box>}
      <Box sx={{ m: 1 }}>
        <input
          type="text"
          placeholder="Enter Feed ID here"
          onChange={(e) => setFeedId(e.target.value)}
        />
        <button style={{ marginLeft: "10px" }} onClick={feedInfo}>
          Get feed Info
        </button>
      </Box>
      {url && (
        <Box>
          <a href={url}>Click here</a> to view your listings report
        </Box>
      )}
      {status && !url && <Box>Your status for listings is {status}</Box>}
      <Button download="data" onClick={generateCsvReport}>
        Click here to download the report
      </Button>
      {csvData && (
        <CSVLink data={csvData} separator="/t">
          Download me
        </CSVLink>
      )}
    </>
  );
};

const styles = {
  fileInput: {
    display: "none",
  },
  fileInputLabel: {
    border: "1px solid #ccc",
    display: "inline-block",
    padding: "6px 12px",
    cursor: "pointer",
  },
};

export default HomePage;

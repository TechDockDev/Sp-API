import React, { useEffect, useState } from "react";
import url from "../url";
import { CSVLink, CSVDownload } from "react-csv";

const CsvGenerate = () => {
  const [csvData, setCsvData] = useState();
  useEffect(() => {
    const generateCsv = async () => {
      try {
        const response = await fetch(`${url}/api/v1/generate-csv`, {
          method: "GET",
        });
        const data = await response.blob();
        console.log(data);
        let reader = new FileReader();

        reader.readAsText(data);

        reader.onload = function (e) {
          console.log(reader.result);
          setCsvData(reader.result);
        };

        reader.onerror = function () {
          console.log(reader.error);
        };

        // setProductTypes(data.productTypes);
      } catch (error) {
        console.log(error);
      }
    };
    generateCsv();
  }, []);
  return (
    <>
      <button onClick={() => <CSVDownload data={csvData} target="_blank" />}>
        {/* {csvData && } */}
        Download Demo CSV
      </button>
      {csvData && <CSVLink data={csvData}>Download me</CSVLink>}
    </>
  );
};

export default CsvGenerate;

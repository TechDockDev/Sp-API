const axios = require("axios");
const sellingPartner = require("../utils");
const fs = require("fs");
const { parse } = require("csv");
const { stringify } = require("csv/sync");
const mime = require("mime");
const xl = require("excel4node");
const { log } = require("util");

exports.feedUpload = async (req, res) => {
  try {
    // let response = await sellingPartner.callAPI({
    //   operation: "createFeedDocument",
    //   endpoint: "feeds",
    //   body: {
    //     contentType: "application/json",
    //   },
    //   options: {
    //     version: "2021-06-30",
    //   },
    // });
    // let response = await sellingPartner.callAPI({
    //   operation: "getFeed",
    //   endpoint: "feeds",
    //   path: {
    //     feedId: "53902019457",
    //   },
    //   options: {
    //     version: "2021-06-30",
    //   },
    // });
    // let response = await sellingPartner.callAPI({
    //   operation: "getFeedDocument",
    //   endpoint: "feeds",
    //   path: {
    //     feedDocumentId:
    //       "amzn1.tortuga.4.na.26673525-c1c9-4fe3-a788-f1f8a38acf4c.T3S61ZDFTSK5I6",
    //   },
    //   options: {
    //     version: "2021-06-30",
    //   },
    // });
    // let response = await sellingPartner.callAPI({
    //   operation: "createFeed",
    //   endpoint: "feeds",
    //   body: {
    //     feedType: "JSON_LISTINGS_FEED",
    //     marketplaceIds: ["ATVPDKIKX0DER"],
    //     inputFeedDocumentId:
    //       "amzn1.tortuga.4.na.0229286b-bdba-4573-9c55-e539ccd57157.T3HTXJACNTCVQB",
    //   },
    //   options: {
    //     version: "2021-06-30",
    //   },
    // });
    console.log(response);
    res.json(response);
  } catch (e) {
    res.json(e);
    console.log(e);
  }
};

exports.createFeedDocument = async (req, res, next) => {
  try {
    let data = await sellingPartner.callAPI({
      operation: "createFeedDocument",
      endpoint: "feeds",
      body: {
        contentType: "application/x-www-form-urlencoded",
      },
      options: {
        version: "2021-06-30",
      },
    });
    console.log(data.url);
    const response = await axios.put(data.url, req.file.buffer);
    console.log(response.status);
    let feed;
    if (response.status === 200) {
      feed = await sellingPartner.callAPI({
        operation: "createFeed",
        endpoint: "feeds",
        body: {
          feedType: "POST_FLAT_FILE_LISTINGS_DATA",
          marketplaceIds: ["ATVPDKIKX0DER"],
          inputFeedDocumentId: data.feedDocumentId,
        },
        options: {
          version: "2021-06-30",
        },
      });
      console.log(feed);
    }
    res.json({ feedId: feed.feedId });
  } catch (error) {
    res.json({ message: error });
  }
};

exports.createFeed = async (req, res) => {
  let response = await sellingPartner.callAPI({
    operation: "createFeed",
    endpoint: "feeds",
    body: {
      feedType: "POST_FLAT_FILE_LISTINGS_DATA",
      marketplaceIds: ["ATVPDKIKX0DER"],
      inputFeedDocumentId: req.feedDocumentId,
    },
    options: {
      version: "2021-06-30",
    },
  });
  res.json({
    response,
  });
};

exports.getFeed = async (req, res) => {
  try {
    const { feedId } = req.query;
    if (!feedId) {
      return res.json({
        status: "error",
        message: "feed ID was not provided",
      });
    }
    let response = await sellingPartner.callAPI({
      operation: "getFeed",
      endpoint: "feeds",
      path: {
        feedId: feedId,
      },
      options: {
        version: "2021-06-30",
      },
    });
    if (response.processingStatus === "DONE") {
      const feedInfo = await sellingPartner.callAPI({
        operation: "getFeedDocument",
        endpoint: "feeds",
        path: {
          feedDocumentId: response.resultFeedDocumentId,
        },
        options: {
          version: "2021-06-30",
        },
      });
      res.json({
        url: feedInfo.url,
      });
    } else {
      res.json({
        status: response.processingStatus,
      });
    }
  } catch (error) {
    res.json({
      status: "Error",
      message: "some error occurred",
      error,
    });
  }
};

exports.getFeedDocument = async (req, res) => {
  try {
    let response = await sellingPartner.callAPI({
      operation: "getFeedDocument",
      endpoint: "feeds",
      path: {
        feedDocumentId:
          "amzn1.tortuga.4.na.26673525-c1c9-4fe3-a788-f1f8a38acf4c.T3S61ZDFTSK5I6",
      },
      options: {
        version: "2021-06-30",
      },
    });
    res.json({
      response,
    });
  } catch (error) {
    res.json({
      status: "Error",
      message: "some error occurred",
    });
  }
};

exports.getFeedReport = async (req, res) => {
  try {
    const response = await axios.get(
      "https://tortuga-prod-na.s3-external-1.amazonaws.com/%2FNinetyDays/amzn1.tortuga.4.na.1ceaecb2-ed56-4fb8-b3c6-4a77ecdbd183.T3HAIFNB6K7RQD?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230503T084508Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=AKIA5U6MO6RAA4HUWJRZ%2F20230503%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=ca318825bbb56c5b78b43f15df6b2ef0fbd27558b0e8261f4554325e957373e3"
    );
    console.log(response.data);
    // let headers = response.headers;
    // console.log(`feedreport. ${mime.getExtension(headers["content-type"])}`);
    // fs.writeFileSync(
    //   `feedreport.${mime.getExtension(headers["content-type"])}`,
    //   response.data
    // );
    // res.download(`feedreport.${mime.getExtension(headers["content-type"])}`);
    const records = [];
    // Initialize the parser
    const parser = parse({
      delimiter: "/t",
      relax_quotes: true,
      // relax_column_count: true,
    });
    parser.on("data", (data) => {
      // console.log(data);
    });
    // Use the readable stream api to consume records
    parser.on("readable", function () {
      let record;
      while ((record = parser.read()) !== null) {
        records.push(record);
      }
    });
    // Catch any error
    parser.on("error", function (err) {
      console.log(err);
    });
    // Test that the parsed records matched the expected records
    parser.on("end", function () {
      var wb = new xl.Workbook();
      var ws = wb.addWorksheet("Template");
      records.forEach((element, col) => {
        const data = element[0].split("\t");
        const style = wb.createStyle({
          fill: {
            type: "pattern",
            patternType: "solid",
            bgColor: "#FFFF00",
            fgColor: "#FFFF00",
          },
        });
        const headingStyle = wb.createStyle({
          font: {
            color: "white",
            size: 12,
          },
          fill: {
            type: "pattern",
            patternType: "solid",
            bgColor: "brown",
            fgColor: "brown",
          },
        });
        ws.column(1).setWidth(25);
        ws.column(2).setWidth(25);
        data.forEach((value, row) => {
          if (/\d/.test(value)) {
            ws.cell(col + 1, row + 1).string(value);
          } else if (value === "Warning") {
            ws.cell(col + 1, row + 1)
              .string(value)
              .style(style);
          } else if (value === "Error") {
            ws.cell(col + 1, row + 1)
              .string(value)
              .style(
                wb.createStyle({
                  fill: {
                    type: "pattern",
                    patternType: "solid",
                    bgColor: "red",
                    fgColor: "red",
                  },
                })
              );
          } else if (col + 1 === 5) {
            ws.cell(col + 1, row + 1)
              .string(value)
              .style(headingStyle);
          } else {
            ws.cell(col + 1, row + 1).string(value);
          }
        });
      });
      wb.write("Excel.xlsx");
      res.json({ status: "success", message: "Download excel", records });
    });
    // Write data to the stream
    parser.write(response.data);
    // Close the readable stream
    parser.end();
  } catch (error) {
    // console.log(error);
    res.json({ status: "error", error });
  }
};

exports.createExcel = async (req, res) => {
  try {
    var wb = new xl.Workbook();
    var ws = wb.addWorksheet("Sheet 1");
    // Create a reusable style
    const style = wb.createStyle({
      font: {
        color: "#FF0800",
        size: 12,
      },
      fill: {
        type: "pattern",
        patternType: "solid",
        bgColor: "#FFFF00",
        fgColor: "#FFFF00",
      },
    });
    // Set value of cell A1 to 100 as a number type styled with paramaters of style
    ws.cell(1, 1).number(100).style(style);
    wb.write("test.xlsx");
    res.json({
      status: "success",
      message: "file created successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error });
  }
};

exports.getCatalogueItem = async (req, res) => {
  try {
    const item = await sellingPartner.callAPI({
      operation: "getCatalogItem",
      endpoint: "catalogItems",
      path: {
        asin: 66,
      },
      query: {
        marketplaceIds: ["ATVPDKIKX0DER"],
        includedData: [
          "identifiers",
          "images",
          "productTypes",
          "salesRanks",
          "summaries",
          "variations",
        ],
      },
      options: {
        version: "2022-04-01",
      },
    });
    res.json({ status: "success", message: "Item Fetched Successfully", item });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

const { default: axios } = require("axios");
// const { createGunzip } = require("zlib");
const http = require("http");
const https = require("https");
const zlib = require("node:zlib");
const fs = require("fs");
const csv = require("csv-parser");
const sellingPartner = require("../utils");
const CryptoJS = require("crypto-js");
const { generate, stringify, parse, transform } = require("csv");
const { unzip, createGunzip } = require("zlib");
const { log } = require("console");
// const { default: axios } = require("axios");
exports.uploadProductCsv = async (req, res) => {
  try {
    const results = [];
    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", async () => {
        console.log(results);

        let response = await sellingPartner.callAPI({
          operation: "putListingsItem",
          endpoint: "listingsItems",
          path: {
            sellerId: "ATRLI9VPLDO6U",
            sku: "new wrench",
          },
          query: {
            marketplaceIds: ["ATVPDKIKX0DER"],
          },
          body: {
            productType: "WRENCH",
            attributes: {
              condition_type: [
                {
                  value: results[0]["|__value"],
                  marketplace_id: "ATVPDKIKX0DER",
                },
              ],
              brand: [
                {
                  value: "Nike",
                  marketplace_id: "ATVPDKIKX0DER",
                },
              ],
              bullet_point: [
                {
                  value: results[13]["|__value"],
                  marketplace_id: "ATVPDKIKX0DER",
                },
              ],
              country_of_origin: [
                {
                  value: "UK",
                  marketplace_id: "ATVPDKIKX0DER",
                },
              ],
              item_name: [
                {
                  value: results[12]["|__value"],
                  marketplace_id: "ATVPDKIKX0DER",
                  // language_tag:"s"
                },
              ],
              item_type_keyword: [
                {
                  value: results[4]["|__value"],
                  marketplace_id: "ATVPDKIKX0DER",
                },
              ],
              product_description: [
                {
                  value: results[6]["|__value"],
                  marketplace_id: "ATVPDKIKX0DER",
                },
              ],
              supplier_declared_dg_hz_regulation: [
                {
                  value: results[10]["|__value"],
                  marketplace_id: "ATVPDKIKX0DER",
                },
              ],
              batteries_required: [
                {
                  value: "No",
                  marketplace_id: "ATVPDKIKX0DER",
                },
              ],
              item_package_weight: [
                {
                  value: "23.3",
                  unit: "grams",
                  marketplace_id: "ATVPDKIKX0DER",
                },
              ],
              item_package_dimensions: [
                {
                  value: "Not Applicable",
                  marketplace_id: "ATVPDKIKX0DER",
                  height: {
                    unit: "centimeters",
                    value: "2.4",
                  },
                  length: {
                    unit: "centimeters",
                    value: "2.4",
                  },
                  width: {
                    unit: "centimeters",
                    value: "2.4",
                  },
                },
              ],
              unit_count: [
                {
                  value: "72.0",
                  marketplace_id: "ATVPDKIKX0DER",
                },
              ],
              item_type_name: [
                {
                  value: results[8]["|__value"],
                  marketplace_id: "ATVPDKIKX0DER",
                  language_tag: "en_US",
                },
              ],
              merchant_suggested_asin: [
                {
                  value: results[7]["|__value"],
                  marketplace_id: "ATVPDKIKX0DER",
                },
              ],
              cpsia_cautionary_statement: [
                {
                  value: "no_warning_applicable",
                  marketplace_id: "ATVPDKIKX0DER",
                },
              ],
              number_of_boxes: [
                {
                  value: "1",
                  marketplace_id: "ATVPDKIKX0DER",
                },
              ],
              included_components: [
                {
                  value: "none",
                  marketplace_id: "ATVPDKIKX0DER",
                },
              ],
              model_name: [
                {
                  value: "23-24",
                  marketplace_id: "ATVPDKIKX0DER",
                },
              ],
              power_source_type: [
                {
                  value: "hand_powered",
                  marketplace_id: "ATVPDKIKX0DER",
                },
              ],
              externally_assigned_product_identifier: [
                {
                  value: results[5]["|__value"],
                  marketplace_id: "ATVPDKIKX0DER",
                },
              ],
              manufacturer: [
                {
                  value: "LION",
                  marketplace_id: "ATVPDKIKX0DER",
                },
              ],
              model_number: [
                {
                  value: "EDR-948",
                  marketplace_id: "ATVPDKIKX0DER",
                },
              ],
            },
          },
        });
        res.json(response);
      });
  } catch (e) {
    console.log(e);
  }
};

exports.uploadProduct = async (req, res) => {
  try {
    const { productDetails, productType } = req.body;
    console.log(productType);
    const listingMap = new Map();
    Object.entries(productDetails).forEach(([key, value]) => {
      listingMap.set(key, [{ value, marketplace_id: "ATVPDKIKX0DER" }]);
    });
    const listingDetails = Object.fromEntries(listingMap);
    console.log(listingDetails);
    let response = await sellingPartner.callAPI({
      operation: "putListingsItem",
      endpoint: "listingsItems",
      path: {
        sellerId: "ATRLI9VPLDO6U",
        sku: "new wrench",
      },
      query: {
        marketplaceIds: ["ATVPDKIKX0DER"],
      },
      body: {
        productType,
        attributes: listingDetails,
      },
    });
    res.json({ status: "success", response });
    // let response = await sellingPartner.callAPI({
    //   operation: "putListingsItem",
    //   endpoint: "listingsItems",
    //   path: {
    //     sellerId: "ATRLI9VPLDO6U",
    //     sku: "new wrench",
    //   },
    //   query: {
    //     marketplaceIds: ["ATVPDKIKX0DER"],
    //   },
    //   body: {
    //     productType: "WRENCH",
    //     attributes: {
    //       condition_type: [
    //         {
    //           value: "",
    //           marketplace_id: "ATVPDKIKX0DER",
    //         },
    //       ],
    //       brand: [
    //         {
    //           value: "Nike",
    //           marketplace_id: "ATVPDKIKX0DER",
    //         },
    //       ],
    //       bullet_point: [
    //         {
    //           value: "",
    //           marketplace_id: "ATVPDKIKX0DER",
    //         },
    //       ],
    //       country_of_origin: [
    //         {
    //           value: "UK",
    //           marketplace_id: "ATVPDKIKX0DER",
    //         },
    //       ],
    //       item_name: [
    //         {
    //           value: "",
    //           marketplace_id: "ATVPDKIKX0DER",
    //           // language_tag:"s"
    //         },
    //       ],
    //       item_type_keyword: [
    //         {
    //           value: "",
    //           marketplace_id: "ATVPDKIKX0DER",
    //         },
    //       ],
    //       product_description: [
    //         {
    //           value: "",
    //           marketplace_id: "ATVPDKIKX0DER",
    //         },
    //       ],
    //       supplier_declared_dg_hz_regulation: [
    //         {
    //           value: "",
    //           marketplace_id: "ATVPDKIKX0DER",
    //         },
    //       ],
    //       batteries_required: [
    //         {
    //           value: "No",
    //           marketplace_id: "ATVPDKIKX0DER",
    //         },
    //       ],
    //       item_package_weight: [
    //         {
    //           value: "23.3",
    //           unit: "grams",
    //           marketplace_id: "ATVPDKIKX0DER",
    //         },
    //       ],
    //       item_package_dimensions: [
    //         {
    //           value: "Not Applicable",
    //           marketplace_id: "ATVPDKIKX0DER",
    //           height: {
    //             unit: "centimeters",
    //             value: "2.4",
    //           },
    //           length: {
    //             unit: "centimeters",
    //             value: "2.4",
    //           },
    //           width: {
    //             unit: "centimeters",
    //             value: "2.4",
    //           },
    //         },
    //       ],
    //       unit_count: [
    //         {
    //           value: "72.0",
    //           marketplace_id: "ATVPDKIKX0DER",
    //         },
    //       ],
    //       item_type_name: [
    //         {
    //           value: "",
    //           marketplace_id: "ATVPDKIKX0DER",
    //           language_tag: "en_US",
    //         },
    //       ],
    //       merchant_suggested_asin: [
    //         {
    //           value: "",
    //           marketplace_id: "ATVPDKIKX0DER",
    //         },
    //       ],
    //       cpsia_cautionary_statement: [
    //         {
    //           value: "no_warning_applicable",
    //           marketplace_id: "ATVPDKIKX0DER",
    //         },
    //       ],
    //       number_of_boxes: [
    //         {
    //           value: "1",
    //           marketplace_id: "ATVPDKIKX0DER",
    //         },
    //       ],
    //       included_components: [
    //         {
    //           value: "none",
    //           marketplace_id: "ATVPDKIKX0DER",
    //         },
    //       ],
    //       model_name: [
    //         {
    //           value: "23-24",
    //           marketplace_id: "ATVPDKIKX0DER",
    //         },
    //       ],
    //       power_source_type: [
    //         {
    //           value: "hand_powered",
    //           marketplace_id: "ATVPDKIKX0DER",
    //         },
    //       ],
    //       externally_assigned_product_identifier: [
    //         {
    //           value: "",
    //           marketplace_id: "ATVPDKIKX0DER",
    //         },
    //       ],
    //       manufacturer: [
    //         {
    //           value: "LION",
    //           marketplace_id: "ATVPDKIKX0DER",
    //         },
    //       ],
    //       model_number: [
    //         {
    //           value: "EDR-948",
    //           marketplace_id: "ATVPDKIKX0DER",
    //         },
    //       ],
    //     },
    //   },
    // });
    // res.json(response);
  } catch (e) {
    console.log(e);
  }
};

exports.feedUpload = async (req, res) => {
  try {
    // let response = await sellingPartner.callAPI({
    //   operation: "createFeedDocument",
    //   endpoint: "feeds",
    //   body: {
    //     contentType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    //   },
    //   options: {
    //     version: "2021-06-30",
    //   },
    // });
    let response = await sellingPartner.callAPI({
      operation: "getFeed",
      endpoint: "feeds",
      path: {
        feedId: "54487019466",
      },
      options: {
        version: "2021-06-30",
      },
    });
    // let response = await sellingPartner.callAPI({
    //   operation: "cancelFeed",
    //   endpoint: "feeds",
    //   path: {
    //     feedId: "54483019466",
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
    //       "amzn1.tortuga.4.na.a762573e-241c-4659-b59b-563da5a45650.T3ABUNHLXSHRNK",
    //   },
    //   options: {
    //     version: "2021-06-30",
    //   },
    // });
    // let response = await sellingPartner.callAPI({
    //   operation: "createFeed",
    //   endpoint: "feeds",
    //   body: {
    //     feedType: "POST_FLAT_FILE_LISTINGS_DATA",
    //     marketplaceIds: ["ATVPDKIKX0DER"],
    //     inputFeedDocumentId:
    //       "amzn1.tortuga.4.na.4cbbecdb-2443-4fc8-a9e3-0a0626d49598.T3M9XHK8U4UYNT",
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

const encryptData = async (req, res) => {
  const ciphertext = CryptoJS.AES.encrypt(
    "my message",
    "secret key 123"
  ).toString();
};

exports.getProductTypes = async (req, res) => {
  try {
    let response = await sellingPartner.callAPI({
      operation: "searchDefinitionsProductTypes",
      endpoint: "productTypeDefinitions",
      query: {
        marketplaceIds: ["ATVPDKIKX0DER"],
      },
    });
    res.json(response);
  } catch (error) {
    res.json(error);
  }
};

exports.getProductTypeDefinition = async (req, res) => {
  try {
    let response = await sellingPartner.callAPI({
      operation: "getDefinitionsProductType",
      endpoint: "productTypeDefinitions",
      query: {
        marketplaceIds: ["ATVPDKIKX0DER"],
      },
      path: {
        productType: req.query.productType,
      },
    });
    res.json(response);
  } catch (error) {
    res.json(error);
  }
};

exports.getMessagesAction = async (req, res) => {
  try {
    let response = await sellingPartner.callAPI({
      operation: "getMessagingActionsForOrder",
      endpoint: "messaging",
      query: {
        marketplaceIds: ["ATVPDKIKX0DER"],
      },
      path: {
        amazonOrderId: "WRENCH",
      },
    });
    res.json(response);
  } catch (error) {
    res.json(error);
  }
};

exports.generateCsv = async (req, res) => {
  let response = await sellingPartner.callAPI({
    operation: "getDefinitionsProductType",
    endpoint: "productTypeDefinitions",
    query: {
      marketplaceIds: ["ATVPDKIKX0DER"],
    },
    path: {
      productType: "WRENCH",
    },
  });
  // console.log(response.propertyGroups);
  // let input;
  // let rawRecords;
  // Object.entries(response.propertyGroups).forEach(([key, value]) => {
  //   rawRecords = value.propertyNames;
  // });
  // input = generate({ length: rawRecords.length, columns: ["ascii"] });
  // console.log(rawRecords);
  // const records = rawRecords;
  // const refinedRecords = transform(input, function (data) {
  // data.map(() => {
  // return rawRecords;
  // });
  // });
  // rawRecords = parse(input);
  // , function (data) {
  // return data.map(function (value) {
  //   return value.toUpperCase();
  // });
  // };
  // let records = [];
  // generate({
  //   seed: 1,
  //   objectMode: true,
  //   columns: 2,
  //   length: 2,
  // })
  // Use the readable stream api to consume generated records
  // .on("readable", function () {
  //   let record;
  //   while ((record = this.read()) !== null) {
  //     records.push(record);
  //   }
  // })
  // Catch any error
  // .on("error", function (err) {
  //   console.error(err);
  // });
  // console.log(output);
  let rawRecords;
  Object.entries(response.propertyGroups).forEach(([key, value]) => {
    rawRecords = value.propertyNames;
  });
  const output = stringify([rawRecords]);
  fs.writeFile("data.csv", rawRecords.join(","), "utf-8", (err) => {
    if (err) console.log(err);
    else console.log("Data saved");
  });
  res.sendFile("data.csv", { root: "." });
};

exports.bulkUpload = async (req, res) => {
  let { productCount, skus, productType } = req.body;
  console.log(req.file);
  skus = JSON.parse(skus);
  const results = [];
  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", async () => {
      Array({ length: productCount }).forEach(async (_, i) => {
        const listingMap = new Map();
        Object.entries(results[0]).forEach(([key, value]) => {
          listingMap.set(key.toString(), [
            { value, unit: "Inch Ounces", marketplace_id: "ATVPDKIKX0DER" },
          ]);
        });
        const listingDetails = Object.fromEntries(listingMap);
        console.log(listingDetails);
        let response = await sellingPartner.callAPI({
          operation: "putListingsItem",
          endpoint: "listingsItems",
          path: {
            sellerId: "ATRLI9VPLDO6U",
            sku: skus[i],
          },
          query: {
            marketplaceIds: ["ATVPDKIKX0DER"],
          },
          body: {
            productType,
            attributes: listingDetails,
          },
        });
        res.json(response);
        // console.log(response);
      });
    });
  // res.json(req.body);
  // process.();

  // res.json({ status: "success", response });

  // console.log(req.body);
  // res.json({ status: "success" });
};

exports.getFeedReport = async (req, res) => {
  // const decryptedRequest = CryptoJS.AES.decrypt(
  //   "https://tortuga-prod-na.s3-external-1.amazonaws.com/%2FNinetyDays/amzn1.tortuga.4.na.06d843fa-a86d-4ac3-ac98-d57fa5f1b09e.T1RQASND48X2UN?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230408T104509Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=AKIA5U6MO6RAA4HUWJRZ%2F20230408%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=aa3935a010bbf04f6f6337e00eaaf4496fbfd51b8ab85949f7db016cfa0ed08d",
  //   "NoktjrDmH/fR5afK3PKoJBTdgmGpdkwke/znSh0ZA4w="
  // );
  // const response = axios.get(
  //   "https://tortuga-prod-na.s3-external-1.amazonaws.com/%2FNinetyDays/amzn1.tortuga.4.na.06d843fa-a86d-4ac3-ac98-d57fa5f1b09e.T1RQASND48X2UN?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230408T122315Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=AKIA5U6MO6RAA4HUWJRZ%2F20230408%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=b3249893cffee07d8974c501bc14c06e77f7936f5cc8de353c67dc3f1b6e378a"
  // );
  // const decryptedRequest = CryptoJS.AES.decrypt(
  //   response,
  //   "NoktjrDmH/fR5afK3PKoJBTdgmGpdkwke/znSh0ZA4w="
  // );
  // console.log(decryptedRequest);

  // // const decryptedMessage = decryptedRequest.toString(CryptoJS.enc.Utf8);
  // // console.log("Decrypted Request: " + decryptedMessage);
  // res.json(decryptedRequest);
  // This example is for use with the Selling Partner API for Reports, Version: 2021-06-30
  // and the Selling Partner API for Feeds, Version: 2021-06-30

  // function download(url, compressionAlgorithm) {
  //   const httpProtocol = url.startsWith("https") ? https : http;
  //   const options = {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Accept-Encoding": "gzip, deflate",
  //     },
  //   };

  //   return new Promise((resolve, reject) => {
  //     // httpProtocol.request
  //     const request = httpProtocol.request(url, options, (response) => {
  //       console.log(response);
  //       if (response.statusCode !== 200) {
  //         reject(
  //           new Error(
  //             `Call to download content was unsuccessful with response code: ${response.statusCode} and message: ${response.statusMessage}`
  //           )
  //         );
  //         return;
  //       }
  //       let stream = response;
  //       if (response.headers["content-encoding"] === "zlib") {
  //         stream = response.pipe(zlib.createGunzip());
  //       }
  //       let rawData = "";
  //       stream.on("data", (chunk) => {
  //         rawData += chunk;
  //         console.log(chunk);
  //       });

  //       stream.on("end", () => {
  //         resolve(rawData);
  //         console.log("rawData", rawData);
  //       });
  //     });
  //     request.on("error", (error) => {
  //       reject(error);
  //     });

  //     request.end();
  //   });
  // }

  // const url =
  //   "https://tortuga-prod-na.s3-external-1.amazonaws.com/%2FNinetyDays/amzn1.tortuga.4.na.06d843fa-a86d-4ac3-ac98-d57fa5f1b09e.T1RQASND48X2UN?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230408T132752Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=AKIA5U6MO6RAA4HUWJRZ%2F20230408%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=ab540dfee83849e33b2a3f65b79e2cb041af24160a248dcb8fc5dc9cf8417b4f";
  // const compressionAlgorithm =
  //   "<compressionAlgorithm from the getFeedDocument/getReportDocument response>";

  // download(url, compressionAlgorithm)
  //   .then((response) => {
  //     console.log(response);
  //     res.json(response);
  //   })
  //   .catch((error) => {
  //     // Handle error here.
  //     res.json(error);
  //   });

  /**
   * Example that downloads a document.
   */

  // class DownloadExample {
  async function download(url, compressionAlgorithm) {
    const response = await axios({
      method: "get",
      url: url,
      responseType: "stream",
    });
    // console.log(response);
    if (!response.status === 200) {
      console.log(
        `Call to download content was unsuccessful with response code: ${response.status} and message: ${response.statusText}`
      );
      return;
    }
    let inputStream = response.data;
    if (compressionAlgorithm === "GZIP") {
      console.log("yha aaya");
      inputStream = response.data.pipe(createGunzip());
      console.log("yha nhi aaya");
    }
    // console.log(response.data);
    inputStream.on("error", (err) => {
      console.log(err);
    });
    const contentType = response.headers["content-type"];
    const mediaType = contentType.split(";")[0];
    const charset = contentType.split("charset=")[1];
    // if (!charset) {
    //   throw new Error(`Could not parse character set from '${contentType}'`);
    // }
    // console.log(response.data);
    // unzip(response.data, (err, buffer) => {
    //   if (err) {
    //     console.error("An error occurred:", err);
    //     // process.exitCode = 1;
    //   }
    //   console.log(buffer.toString());
    // });
    // response.data
    //   .pipe(fs.createWriteStream("bootstrap.zip"))
    //   .on("close", function () {
    //     console.log("File written!");
    //   });

    console.log(response.data);
    const reader = inputStream.pipe(new TextDecoderStream("utf-8")).getReader();
    let result = "";
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      result += value;
      //   // fs.createReadStream(result).pipe(unzip.Extract({ path: '/tmp/7zip' }));
    }
    // console.log(result);
  }
  // }

  // axios.get("", function name(response) {
  //   console.log(response);
  //   response.data
  //     .pipe(fs.createWriteStream("bootstrap.zip"))
  //     .on("close", function () {
  //       console.log("File written!");
  //     });
  // });

  // const obj = new DownloadExample();
  const url =
    "https://tortuga-prod-na.s3-external-1.amazonaws.com/%2FNinetyDays/amzn1.tortuga.4.na.5d0b4c08-3fd6-4304-b651-a1e5e465b474.T1YVJFQBBFNCXI?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230410T125023Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=AKIA5U6MO6RAA4HUWJRZ%2F20230410%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=83cd4213bd00856a7b64da80bd26674156abeb776d95330d917e8da1bc873511";
  const compressionAlgorithm = "GZIP";
  // const response = await axios({
  //   method: "get",
  //   url: url,
  //   responseType: "stream",
  //   // contentType: "application/json",
  //   // decompress: "gzip",
  // });
  // // console.log(response);
  // const d = CryptoJS.AES.decrypt(
  //   response.data,
  //   "NoktjrDmH/fR5afK3PKoJBTdgmGpdkwke/znSh0ZA4w="
  // );
  // console.log(d);
  // response.data
  //   .pipe(fs.createWriteStream("bootstrap.xml"))
  //   .on("close", function () {
  //     console.log("File written!");
  //   });
  // const { data } = await axios.get(url, {
  //   responseType: "arraybuffer",
  //   decompress: true,
  // });
  // console.log(data);
  // data.pipe(fs.createWriteStream("bootstrap.zip")).on("close", function () {
  //   console.log("File written!");
  // });
  // write the contents of the buffer, from position 0 to the end, to the file descriptor returned in opening our file
  // fs.write(6, data, 0, data.length, null, function (err) {
  //   if (err) throw "error writing file: " + err;
  //   fs.close(fd, function () {
  //     console.log("wrote the file successfully");
  //   });
  // });

  // const fetchGzipJSON = async (url) => {
  let inflatedJSON = {};
  try {
    const { data } = await axios.get(url, {
      responseType: "arraybuffer",
      decompress: true,
    });
    const pako = require("pako");
    inflatedJSON = JSON.parse(pako.inflate(data, { to: "string" }));
  } catch (error) {
    console.error("could not fetch gzip json", error);
  }
  console.log(inflatedJSON);
  // };

  // obj.
  // download(url, compressionAlgorithm)
  //   .then((data) => {
  //     res.json(data);
  //     // console.log(data);
  //   })
  //   .catch((error) => {
  //     // Handle exception here.
  //     console.log(error);
  //   });
};

exports.download = async (req, res) => {
  try {
    const file = `data.csv`;
    res.download(file); // Set disposition and send it.
  } catch (error) {
    console.log(error);
  }
};

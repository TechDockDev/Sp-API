// (async () => {
//   try {
//     let res = await sellingPartner.callAPI({
//       operation: "getMarketplaceParticipations",
//       endpoint: "sellers",
//     });
//   } catch (e) {
//     console.log(e);
//   }
// })();

// (async () => {
//   try {
//     let res = await sellingPartner.callAPI({
//       operation: "getFeeds",
//       endpoint: "feeds",
//       query: {
//         feedTypes: "JSON_LISTINGS_FEED",
//       },
//     });
//     console.log(res);
//   } catch (e) {
//     console.log(e);
//   }
// })();

// (async () => {
//   try {
//     let res = await sellingPartner.callAPI({
//       operation: "getCatalogItem",
//       endpoint: "catalogItems",
//       path: {
//         asin: "B071WWY2B6",
//       },
//       query: {
//         marketplaceIds: [
//           "ATVPDKIKX0DER",
//           "A1AM78C64UM0Y8",
//           "A2EUQ1WTGCTBG2",
//           "A2Q3Y263D00KWC",
//         ],
//       },
//       options: {
//         version: "2020-12-01",
//       },
//     });
//     console.log(res);
//   } catch (error) {
//     console.log(error);
//   }
// })();

// (async () => {
//   try {
//     // let res;
//     let res = await sellingPartner.callAPI({
//       operation: "listFinancialEventGroups",
//       endpoint: "finances",
//       query: {
//         FinancialEventGroupStartedBefore: moment().startOf("day").toISOString(),
//         FinancialEventGroupStartedAfter: moment()
//           .startOf("day")
//           .subtract(2, "months")
//           .toISOString(),
//       },
//     });
//     console.log(res);
//   } catch (error) {
//     console.log(error);
//   }
// })();

// (async () => {
//   try {
//     let res = await sellingPartner.callAPI({
//       operation: "getDefinitionsProductType",
//       endpoint: "productTypeDefinitions",
//       path: {
//         productType: "LUGGAGE",
//       },
//       query: {
//         marketplaceIds: ["ATVPDKIKX0DER"],
//       },
//     });
//     console.log(res);
//   } catch (e) {
//     console.log(e);
//   }
// })();


//   let res = await sellingPartner.callAPI({
  //     operation: "putListingsItem",
  //     endpoint: "listingsItems",
  //     path: {
  //       sellerId: "ATRLI9VPLDO6U",
  //       sku: "new luggage",
  //     },
  //     query: {
  //       marketplaceIds: ["ATVPDKIKX0DER"],
  //     },
  //     body: {
  //       productType: "LUGGAGE",
  //       attributes: {
  //         condition_type: [
  //           {
  //             value: "new_new",
  //             marketplace_id: "ATVPDKIKX0DER",
  //           },
  //         ],
  //         material: [
  //           {
  //             value: "new_new",
  //             marketplace_id: "ATVPDKIKX0DER",
  //           },
  //         ],
  //         department: [
  //           {
  //             value: "new_new",
  //             marketplace_id: "ATVPDKIKX0DER",
  //           },
  //         ],
  //         color: [
  //           {
  //             value: "new_new",
  //             marketplace_id: "ATVPDKIKX0DER",
  //           },
  //         ],
  //         item_type_keyword: [
  //           {
  //             value: "new_new",
  //             marketplace_id: "ATVPDKIKX0DER",
  //           },
  //         ],
  //         externally_assigned_product_identifier: [
  //           {
  //             type: "UPC",
  //             value: "714532191586",
  //             marketplace_id: "ATVPDKIKX0DER",
  //           },
  //         ],
  //         product_description: [
  //           {
  //             value: "new_new",
  //             marketplace_id: "ATVPDKIKX0DER",
  //           },
  //         ],
  //         merchant_suggested_asin: [
  //           {
  //             value: "1234567890",
  //             marketplace_id: "ATVPDKIKX0DER",
  //           },
  //         ],
  //         item_type_name: [
  //           {
  //             value: "new_new",
  //             marketplace_id: "ATVPDKIKX0DER",
  //           },
  //         ],
  //         supplier_declared_material_regulation: [
  //           {
  //             value: "bamboo",
  //             marketplace_id: "ATVPDKIKX0DER",
  //           },
  //         ],
  //         supplier_declared_dg_hz_regulation: [
  //           {
  //             value: "waste",
  //             marketplace_id: "ATVPDKIKX0DER",
  //           },
  //         ],
  //         country_of_origin: [
  //           {
  //             value: "IN",
  //             marketplace_id: "ATVPDKIKX0DER",
  //           },
  //         ],
  //         item_name: [
  //           {
  //             value: "new_new",
  //             marketplace_id: "ATVPDKIKX0DER",
  //           },
  //         ],
  //         bullet_point: [
  //           {
  //             value: "new_new",
  //             marketplace_id: "ATVPDKIKX0DER",
  //           },
  //         ],
  //         item_package_weight: [
  //           {
  //             value: "14.89",
  //             unit: "pounds",
  //             marketplace_id: "ATVPDKIKX0DER",
  //           },
  //         ],
  //         externally_assigned_product_identifier: [
  //           {
  //             value: "new_new",
  //             marketplace_id: "ATVPDKIKX0DER",
  //           },
  //         ],
  //         batteries_required: [
  //           {
  //             value: "no",
  //             marketplace_id: "ATVPDKIKX0DER",
  //           },
  //         ],
  //         item_package_dimensions: [
  //           {
  //             // value: "10",
  //             length: {
  //               unit: "inches",
  //               value: "10",
  //             },
  //             width: {
  //               unit: "inches",
  //               value: "10",
  //             },
  //             height: {
  //               unit: "inches",
  //               value: "10",
  //             },
  //             marketplace_id: "ATVPDKIKX0DER",
  //           },
  //         ],
  //         brand: [
  //           {
  //             value: "new_new",
  //             marketplace_id: "ATVPDKIKX0DER",
  //           },
  //         ],
  //         model_number: [
  //           {
  //             value: "new_new",
  //             marketplace_id: "ATVPDKIKX0DER",
  //           },
  //         ],
  //         style: [
  //           {
  //             value: "new_new",
  //             marketplace_id: "ATVPDKIKX0DER",
  //           },
  //         ],
  //         model_name: [
  //           {
  //             value: "new_new",
  //             marketplace_id: "ATVPDKIKX0DER",
  //           },
  //         ],
  //         fabric_type: [
  //           {
  //             value: "new_new",
  //             marketplace_id: "ATVPDKIKX0DER",
  //           },
  //         ],
  //       },
  //     },
  //   });
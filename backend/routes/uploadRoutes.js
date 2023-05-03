const {
  uploadProduct,
  feedUpload,
  getProductTypes,
  getProductTypeDefinition,
  getMessagesAction,
  generateCsv,
  bulkUpload,
  getFeedReport,
  download,
} = require("../controllers/productUpload");
const router = require("express").Router();
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });
router.route("/upload").post(upload.single("file"), uploadProduct);
router.route("/feed-upload").get(feedUpload);
router.route("/feed-report").get(getFeedReport);
router.route("/product-types").get(getProductTypes);
router.route("/product-definition").get(getProductTypeDefinition);
router.route("/get-message-actions").get(getMessagesAction);
router.route("/generate-csv").get(generateCsv);
router.route("/bulk-upload").post(upload.single("file"), bulkUpload);
router.route("/download").get(download);

module.exports = router;

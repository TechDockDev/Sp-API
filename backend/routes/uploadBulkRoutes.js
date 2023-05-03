const {
  feedUpload,
  createFeedDocument,
  createFeed,
  getFeed,
  getFeedDocument,
  uploadListingData,
  getFeedReport,
  createExcel,
  getCatalogueItem,
} = require("../controllers/bulkUpload");
const multer = require("multer");
const storage = multer.memoryStorage();

const upload = multer({ storage });

const router = require("express").Router();

router.route("/feed-upload").get(feedUpload);
router.route("/upload-product").post(upload.single("file"), createFeedDocument);
router.route("/upload-product").get(createFeed);
router.route("/get-feed").get(getFeed);
router.route("/get-feed-document").get(getFeedDocument);
router.route("/get-feed-report").get(getFeedReport);
router.route("/create-excel").get(createExcel);
router.route("/get-item").get(getCatalogueItem);

module.exports = router;

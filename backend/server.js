require("dotenv").config();
const express = require("express");
const app = express();
const logger = require("morgan");
const { initNetworkLogging } = require("network-activity-viewer");
const port = 8080;
const cors = require("cors");
// routes
const uploadRoute = require("./routes/uploadRoutes");
const uploadBulkRoute = require("./routes/uploadBulkRoutes");

// network requests
initNetworkLogging();

// middleware
app.use(cors());
app.use(express.static("dist"));
app.use(logger("dev"));
app.use(express.json());
app.use("/api/v1", uploadRoute);
app.use("/api/v1/bulk", uploadBulkRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

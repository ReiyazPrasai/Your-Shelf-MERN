const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("dotenv").config();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cookieParser());

const CONNECTION_URI = process.env.CONNECTION_URI;
const port = process.env.PORT || 8000;

// Import routes here
const authRoute = require("./src/routes/authRoute");
const brandRoute = require("./src/routes/brandRoute");
const storeRoute = require("./src/routes/storeRoute");
const categoryRoute = require("./src/routes/categoryRoute");
const attributeRoute = require("./src/routes/attributeRoute");
const groupRoute = require("./src/routes/groupRoute");
const roleRoute = require("./src/routes/roleRoute");
const companyRoute = require("./src/routes/companyRoute");

// Routes middleware here
app.use("/api/user", authRoute);
app.use("/api/brand", brandRoute);
app.use("/api/store", storeRoute);
app.use("/api/category", categoryRoute);
app.use("/api/attribute", attributeRoute);
app.use("/api/group", groupRoute);
app.use("/api/role", roleRoute);
app.use("/api/company", companyRoute);

// Connect to DB
mongoose
  .connect(CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(port, () => {
      console.log(`Listening to port ${port}...`);
    });
  })
  .catch((err) => {
    console.error(err.message);
  });

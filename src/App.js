// Packages here
const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const fs = require("fs");

const productRoutes = require("./routes/shops");
const userRoutes = require("./routes/user");
const attendanceRoutes = require("./routes/attendance");

const routesConstants = require("./constants/Routes");

// Add dev dependencies here
app.use(morgan("dev"));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

// Setting libraries for QR Code generation
app.set("view engine", "ejs");
app.use(express.static("./QRCodes"));

// Edit CORS configuration in below method
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    res.status(200).json({});
  }
  next();
});

//Add new controllers/routes in below chunk
app.use(routesConstants.shops, productRoutes);
app.use(routesConstants.users, userRoutes);
app.use(routesConstants.attendance, attendanceRoutes);

const MONGO_ATLAS_PASSWORD = process.env.MONGO_ATLAS_PASSWORD;
const MONGO_ATLAS_USERNAME = process.env.MONGO_ATLAS_USERNAME;

// Mongoose configuration for database
mongoose.connect(
  "mongodb+srv://" +
    MONGO_ATLAS_USERNAME +
    ":" +
    MONGO_ATLAS_PASSWORD +
    "@poseidon-r5hbw.mongodb.net/test?retryWrites=true&w=majority"
);

mongoose.Promise = global.Promise;

app.use((req, res, next) => {
  const error = new Error("Unable to fetch the record (not found)");
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message
  });
});

module.exports = app;

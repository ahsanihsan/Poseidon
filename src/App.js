// Packages here
const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyparser = require("body-parser");

const productRoutes = require("./routes/shops");
const userRoutes = require("./routes/user");
const attendanceRoutes = require("./routes/attendance");

// Add dev dependencies here
app.use(morgan("dev"));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

//Add new controllers/routes in below chunk
app.use("/shops", productRoutes);
app.use("/users", userRoutes);
app.use("/attendance", attendanceRoutes);

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
